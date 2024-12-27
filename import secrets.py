import secrets
import requests


from flask import Flask, request, jsonify
from itsdangerous import URLSafeTimedSerializer
from smtplib import SMTP
from email.mime.text import MIMEText


# Generate a secure random secret key
SECRET_KEY = secrets.token_hex(16)  # Generates a 32-character hex key
print(SECRET_KEY)


#Generate Token
import string
import random
def generate_token():
    """Generate a 6-digit token."""
    return ''.join(random.choices(string.digits, k=6))

Token = generate_token()
print(Token)

from werkzeug.security import generate_password_hash, check_password_hash
from flask import Flask, request, jsonify
hashed_password = generate_password_hash("YourSecurePassword123!")
print("Hashed Password:", hashed_password)

from werkzeug.security import generate_password_hash, check_password_hash
from flask import Flask, request, jsonify
is_valid = check_password_hash(hashed_password, "YourSecurePassword123!")
print("Password is valid:", is_valid)

from flask import Flask, request, session, jsonify
import random
verification_code = random.SystemRandom().randint(100000, 999999)
print(verification_code)