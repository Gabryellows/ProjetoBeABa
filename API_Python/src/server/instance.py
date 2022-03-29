from flask import Flask
from flask_restplus import Api

class Server():
  def __init__(self, ):
    self.app = Flask(__name__)
    self.api = Api(self.app,
      version='1.0',
      title='Auto Purchase',
      description="Add products to shopping cart by reading a spreadsheet provided by the customer.",
      doc='/docs'
    )

  def run(self, ):
    self.app.run(
      port=3030,
      host='localhost',
      debug=True
    )

server = server()
