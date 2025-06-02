# For SQL Server with username/password
import os
import uuid

import pandas as pd
import sqlalchemy


def write_to_sql(data,
                 database: str,
                 #level: str,
                 table):

    engine = sqlalchemy.create_engine(
    f"mssql+pyodbc://DESKTOP-U6EVNUF/{database}?driver=ODBC+Driver+17+for+SQL+Server&trusted_connection=yes"
)
    
    # log = {
    #     "id": [uuid.uuid4()],
    #     "level": [level],
    #     "scriptName": [os.path.basename(__file__)]
    # }

    # if isinstance(data, list[dict]):
    df = pd.DataFrame(data)

    if isinstance(data, pd.DataFrame):
        df = data

    #df = pd.DataFrame.from_dict(log)

    with engine.begin() as conn:
        result = df.to_sql(table, con=conn, if_exists='append', index=False)
        print(f"to_sql returned: {result}")

def read_sql(query,
                 database: str,
                 ):
    engine = sqlalchemy.create_engine(
    f"mssql+pyodbc://DESKTOP-U6EVNUF/{database}?driver=ODBC+Driver+17+for+SQL+Server&trusted_connection=yes"
    )

    df = pd.read_sql(query, con=engine)

    return df