import enum
from datetime import datetime
from Backend.app import db
from werkzeug.security import generate_password_hash, check_password_hash

class RegistrationCategory(enum.Enum):
    Customer = "Customer"
    Driver = "Driver"
    Mover = "Mover"


class Customers(db.Model):
    __tablename__ = 'Users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    registration_cat = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    address = db.Column(db.String(255), nullable=True)  
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=True)
    image_url = db.Column(db.String(255), nullable=True)
    


    def to_json(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "password" : self.password,
            "email": self.email,
            "image_url": self.image_url,
            "registration_cat": self.registration_cat.value,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "address": self.address  
        }

