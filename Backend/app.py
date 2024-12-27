from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from dotenv import load_dotenv
from datetime import timedelta


GOOGLE_API_URL = os.getenv('GOOGLE_API_URL')
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')

app = Flask(__name__)
CORS(app)
load_dotenv()



app.secret_key = os.getenv("SECRET_KEY", "default_fallback_key")
app.config['SQLALCHEMY_DATABASE_URI'] = (
    "mssql+pyodbc://@AYOTUNDE\\AYOMDX/Movemate?driver=ODBC+Driver+17+for+SQL+Server&trusted_connection=yes"
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.permanent_session_lifetime = timedelta(minutes=30)


db = SQLAlchemy(app)

import routes

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
