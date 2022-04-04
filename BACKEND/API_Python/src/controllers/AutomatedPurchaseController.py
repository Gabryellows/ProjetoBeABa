from flask import Flask, Response
from flask_restx import Api, Resource
import psycopg2
import pandas as pd

from src.server.instance import server

app, api = server.app, server.api

@api.route('/autopurchase/<int:id_shop_cart>/<string:file_name>')
class AutomatedPurchaseController(Resource):

  def post(self, id_shop_cart, file_name):
    path = "C:\\Users\\leals\\Desktop\\$ProjetoBEABA\\BACKEND\\API_Python\\public\\" + file_name

    df = pd.read_csv(path,
                sep=';',
                decimal=',',
                encoding='latin-1'
                )

    cmd = '''INSERT INTO schema.shop_cart_products (shop_cart_id, product_id, quantity) VALUES (%s, %s, %s)'''

    with psycopg2.connect(
        host="qqtech-1.crqc50gxdjpu.sa-east-1.rds.amazonaws.com",
        dbname="gleal",
        port=5432,
        user="gleal",
        password="kjri3kj98hj2*",
      ) as conn:

      with conn.cursor() as cursor:
        for idx, line in df.iterrows():
          values = id_shop_cart, int(line['ref_produto']), int(line['quantidade'])
          print(values)
          cursor.execute(cmd, values)

    return Response(
      response = "OK",
      status = 200,
    )

