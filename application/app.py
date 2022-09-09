import json
from flask import Flask, jsonify, render_template
from requests import session
import sqlalchemy
from sqlalchemy import inspect
from sqlalchemy import create_engine
import pandas as pd
import psycopg2
import sys

def getview(view_name):
    con = psycopg2.connect("host='localhost' dbname='australian_energy_db' user='postgres' password='password'")  
    cur = con.cursor()
    cur.execute(f'select * from  {view_name}')
    view = cur.fetchall()
    headings = [x[0] for x in cur.description]
    d3_view=[]
    for array in view:
        row = dict(zip(headings, array))
        d3_view.append(row)
    cur.close()

    return d3_view


app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/view_api")
def db_test():
    view_name = "state_production_data"
    d3_view = getview(view_name)
    return jsonify(d3_view)
    
if __name__ == "__main__":
    app.run(debug=True)
