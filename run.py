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

    print(df)
    return templates.TemplateResponse("ryan_abbott_portfolio/mlb.html", {"request": request, "team_data": df.to_dict('records')})

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
#     # Load CSV data
#     player_df = pd.read_csv("../data/current_player_predictions.csv").head(25)
#     team_df = pd.read_csv("../data/current_team_predictions.csv")

#     # Renaming and Filtering columns
#     player_df = player_df.rename(columns={"rank_logistic": "rank"})
#     team_df = team_df.rename(columns={"output_linear": "projected_win_pct"})
#     print(team_df.columns)
#     print(player_df.columns)
#     team_df['projected_wins'] = team_df['projected_win_pct'] * 82

#     player_display_cols = ["PLAYER_NAME", "rank", "PTS/G", "REB/G", "AST/G", "TOV/G", "STL/G", "BLK/G", "GP_PCT", "W_PCT", "last_updated"]
#     team_display_cols = ["Team", "projected_win_pct", "projected_wins", "playoff_chance", "mean_percentile", "best_player", "last_updated"]



#     # Convert DataFrame to a list of dictionaries
#     player_data_filtered = player_df[player_display_cols].to_dict(orient="records")
#     team_data_filtered = team_df[team_display_cols].to_dict(orient="records")

#     # Render the data in the HTML template
#     return templates.TemplateResponse("table.html", {"request": request, "player_data": player_data_filtered, "team_data": team_data_filtered})

