from flask import Flask
from flask_restplus import Api, Resource
import psycopg2
import pandas as pd

from src.server.instance import server

app, api = server.app, server.api


@api.route('/autopurchase/<int:idShopCart>/<string:fileName>')
class AutoPurchaseController(Resource):


  def get(self, idShopCart, fileName):


    path = "C:\\Users\\leals\\Desktop\\API_Python\\public" + fileName + ".csv"

    df1 = pd.read_csv(path,
                index_col=[0],
                sep=';',
                decimal=',',
                encoding='latin-1'
                )


    print('teste ->',idShopCart, path)



    with psycopg2.connect(
        host="qqtech-1.crqc50gxdjpu.sa-east-1.rds.amazonaws.com",
        dbname="gleal",
        port=5432,
        user="gleal",
        password="kjri3kj98hj2*",
      ) as conn:

        with conn.cursor() as cursor:
          cursor.execute(cmd, values)

        df = pd.read_sql(query, id, conn)
        print(df)
