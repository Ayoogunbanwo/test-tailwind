import enum
from datetime import datetime
from Backend.app import db

class RegistrationCategory(enum.Enum):
    Customer = "Customer"
    Driver = "Driver"
    Mover = "Mover"


class Customers(db.Model):
    __tablename__ = 'Users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    image_url = db.Column(db.String(255), nullable=True)
    registration_cat = db.Column(
        db.Enum(RegistrationCategory), 
        nullable=False, 
        default=RegistrationCategory.Customer
    )
    encrypted_token = db.Column(db.String(255), nullable=True)
    refresh_token = db.Column(db.String(255), nullable=True)
    access_token = db.Column(db.String(255), nullable=True)
    verification_token = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)


    def check_password(self, plain_password):
        return check_password_hash(self.password, plain_password)
    


    def to_json(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "image_url": self.image_url,
            "registration_cat": self.registration_cat.value,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
