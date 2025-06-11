'''
File that will serve website via API
'''
import os

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import uvicorn
import pandas as pd
import sqlalchemy

from utils.sql import read_sql

app = FastAPI()
templates = Jinja2Templates(directory=".")

# Mount your portfolio directory as static files
app.mount("/static", StaticFiles(directory="ryan_abbott_portfolio"), name="static")

# Serve main portfolio page
@app.get("/")
async def home(request: Request):

    return templates.TemplateResponse("ryan_abbott_portfolio/index.html", {"request": request})

@app.get("/sports/mlb")
async def mlb(request: Request):
    query = '''
    WITH LatestStandings AS (
        SELECT MAX([time]) as latest_time
        FROM [mlb].[dbo].[daily_standings]
    )
    SELECT TOP (1000) [name]
        ,[div_rank]
        ,[w]
        ,[l]
        ,[gb]
        ,[wc_rank]
        ,[wc_gb]
        ,[wc_elim_num]
        ,[elim_num]
        ,[team_id]
        ,[league_rank]
        ,[sport_rank]
        ,[division]
        ,[time]
    FROM [mlb].[dbo].[daily_standings] ds
    CROSS JOIN LatestStandings ls
    WHERE ds.[time] = ls.latest_time
    ORDER BY CAST(sport_rank AS INT) ASC
    '''

    df = read_sql(query, database='mlb')

    query_hitting = '''
    WITH LatestHitting AS (
     SELECT MAX([time]) as latest_time
     FROM [mlb].[dbo].[daily_hitting]
    )
    SELECT TOP (20) *
    FROM [mlb].[dbo].[daily_hitting] ds
    CROSS JOIN LatestHitting ls
    WHERE ds.[time] = ls.latest_time
    ORDER BY hits DESC
    '''

    df_hitting = read_sql(query_hitting, database='mlb')

    # query_pitching = '''
    #     WITH LatestHitting AS (
    #     SELECT MAX([time]) as latest_time
    #     FROM [mlb].[dbo].[daily_pitching]
    # )
    # SELECT TOP (20) *
    # FROM [mlb].[dbo].[daily_pitching] ds
    # CROSS JOIN LatestHitting ls
    # WHERE ds.[time] = ls.latest_time
    # ORDER BY era Asc
    # '''

    # df_pitching = read_sql(query_pitching, database='mlb')

    # query_fielding = '''
    #         WITH LatestFielding AS (
    #     SELECT MAX([time]) as latest_time
    #     FROM [mlb].[dbo].[daily_fielding]
    # )
    # SELECT TOP (20) *
    # FROM [mlb].[dbo].[daily_fielding] ds
    # CROSS JOIN LatestFielding ls
    # WHERE ds.[time] = ls.latest_time
    # ORDER BY era Asc
    # '''

    # df_fielding = read_sql(query_fielding, database='mlb')

    print(df)
    return templates.TemplateResponse("ryan_abbott_portfolio/mlb.html", {"request": request, "team_data": df.to_dict('records'), "hitting_data": df_hitting.to_dict('records')})#, "pitching_data": df_pitching.to_dict('records'), "fielding_data": df_fielding.to_dict('records')})


@app.get("/sports/nba")
async def nba(request: Request):
    query = '''
    SELECT TOP (1000) [LeagueID]
      ,[SeasonID]
      ,[TeamID]
      ,[TeamCity]
      ,[TeamName]
      ,[Conference]
      ,[ConferenceRecord]
      ,[PlayoffRank]
      ,[ClinchIndicator]
      ,[Division]
      ,[DivisionRecord]
      ,[DivisionRank]
      ,[WINS]
      ,[LOSSES]
      ,[WinPCT]
      ,[LeagueRank]
      ,[Record]
      ,[HOME]
      ,[ROAD]
      ,[L10]
      ,[Last10Home]
      ,[Last10Road]
      ,[OT]
      ,[ThreePTSOrLess]
      ,[TenPTSOrMore]
      ,[LongHomeStreak]
      ,[strLongHomeStreak]
      ,[LongRoadStreak]
      ,[strLongRoadStreak]
      ,[LongWinStreak]
      ,[LongLossStreak]
      ,[CurrentHomeStreak]
      ,[strCurrentHomeStreak]
      ,[CurrentRoadStreak]
      ,[strCurrentRoadStreak]
      ,[CurrentStreak]
      ,[strCurrentStreak]
      ,[ConferenceGamesBack]
      ,[DivisionGamesBack]
      ,[ClinchedConferenceTitle]
      ,[ClinchedDivisionTitle]
      ,[ClinchedPlayoffBirth]
      ,[EliminatedConference]
      ,[EliminatedDivision]
      ,[AheadAtHalf]
      ,[BehindAtHalf]
      ,[TiedAtHalf]
      ,[AheadAtThird]
      ,[BehindAtThird]
      ,[TiedAtThird]
      ,[Score100PTS]
      ,[OppScore100PTS]
      ,[OppOver500]
      ,[LeadInFGPCT]
      ,[LeadInReb]
      ,[FewerTurnovers]
      ,[PointsPG]
      ,[OppPointsPG]
      ,[DiffPointsPG]
      ,[vsEast]
      ,[vsAtlantic]
      ,[vsCentral]
      ,[vsSoutheast]
      ,[vsWest]
      ,[vsNorthwest]
      ,[vsPacific]
      ,[vsSouthwest]
      ,[Jan]
      ,[Feb]
      ,[Mar]
      ,[Apr]
      ,[May]
      ,[Jun]
      ,[Jul]
      ,[Aug]
      ,[Sep]
      ,[Oct]
      ,[Nov]
      ,[Dec]
      ,[PreAS]
      ,[PostAS]
      ,[season_end_year]
      ,[season]
    FROM [nba].[dbo].[team_stats]

    ORDER BY winPCT DESC
    '''

    df = read_sql(query, database='nba')

    print(df)
    return templates.TemplateResponse("ryan_abbott_portfolio/nba.html", {"request": request, "team_data": df.to_dict('records')})



    return

if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=80)


