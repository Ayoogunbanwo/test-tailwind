from flask import request, jsonify, session, redirect, url_for, render_template, flash
from app import app, db
from models import Users
import random
from datetime import datetime, timedelta
import re
import string
import logging
from werkzeug.security import generate_password_hash, check_password_hash
from validate_email_address import validate_email
import requests

def check_password(self, password):
        return check_password_hash(self.password_hash, password)

def set_password(self, password):
        self.password_hash = generate_password_hash(password)
   

# Configure logging
logging.basicConfig(level=logging.INFO)



#-----index endpoint
@app.route("/")
def home():
    try:
        # Set session to permanent
        session.permanent = True

        if "email" in session:
            logging.info(f"User with email {session['email']} redirected to dashboard.")
            return redirect(url_for('dashboard'))
        
        logging.info("User accessed the homepage (not logged in).")
        return render_template("index.html")
    except Exception as e:
        logging.error(f"An error occurred in the home route: {e}")
        return "An error occurred. Please try again later.", 500

#----POST /auth/login-----

@app.route('/login', methods=['POST'])
def login():
    try:
        # Parse JSON request body
        data = request.json

        # Validate required fields
        required_fields = ['email', 'password']
        missing_fields = [field for field in required_fields if not data.get(field)]
        if missing_fields:
            return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400

        # Extract email and password
        email = data['email']
        password = data['password']

        # Query the User model
        user = Users.query.filter_by(email=email).first()

        if user and user.check_password(password):
            session['email'] = email
            return redirect(url_for('dashboard'))
        else:
            return render_template("index.html", error="Invalid credentials")

    except Exception as e:
        app.logger.error(f"Error occurred: {str(e)}")
        return jsonify({"error": "An error occurred"}), 500



#-------POST /auth/signup-----

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json

    email = data['email']

    # Validate email presence
    if not email:
        return jsonify({"error": "Email is required"}), 400

    # Validate email format
    if not validate_email(email):
        return jsonify({"error": "Invalid email format"}), 400

    # Check if email already exists
    user = Users.query.filter_by(email=email).first()
    if user:
        return render_template ("index.html", error ="User already exist please login or Reset password")


    # Generate a random verification code
    verification_code = random.SystemRandom().randint(100000, 999999)

    # Store verification code and expiration in session
    session['verification_code'] = verification_code
    session['code_expires_at'] = (datetime.utcnow() + timedelta(minutes=15)).isoformat()

    # Send the verification code via email
    send_verification_email(email, verification_code)

    # Save verification code and email in session or database (example assumes database)
    # You can create a table for storing temporary verification codes
    # Example:
    # new_verification = VerificationCode(email=email, code=verification_code)
    # db.session.add(new_verification)
    # db.session.commit()



    session['email'] = email
    response = jsonify({"message": "Verification code sent. Please check your email."}) 
    response.status_code = 200 
    return response, redirect(url_for('your_redirect_route'))



#--------Verify token-------

@app.route('/verifyemail', methods=['POST'])
def verify_email():
    data = request.json

    # Extract the submitted verification code
    submitted_code = data.get('verification_code')
    if not submitted_code:
        return jsonify({"error": "Verification code is required"}), 400

    # Retrieve the stored code and expiration time
    stored_code = session.get('verification_code')
    code_expires_at = session.get('code_expires_at')

    # Validate if the code is correct and not expired
    if not stored_code or not code_expires_at:
        return jsonify({"error": "No verification code found or expired. Please request a new one."}), 400

    # Check if the code has expired
    if datetime.utcnow() > datetime.fromisoformat(code_expires_at):
        session.pop('verification_code', None)
        session.pop('code_expires_at', None)
        return jsonify({"error": "Verification code has expired. Please request a new one."}), 400

    # Check if the code matches
    if str(stored_code) != submitted_code:
        return jsonify({"error": "Invalid verification code."}), 400

    # If valid, clear the session and proceed to registration
    session.pop('verification_code', None)
    session.pop('code_expires_at', None)

    return redirect(url_for('register'))


#-----create account----

@app.route('/createaccount', methods=['POST'])
def create_account():
    data = request.json
    
    # Validate required fields
    required_fields = ['first_name', 'last_name', 'password', 'registration_cat', 'address']
    missing_fields = [field for field in required_fields if not data.get(field)]
    if missing_fields:
        return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400

    first_name = data['first_name']
    last_name = data['last_name']
    password = data['password']
    registration_cat = data['registration_cat']
    address_query = data['address']  

    email = session.get('email')
    if not email:
        return jsonify({"error": "Session expired or email not found. Please sign up again."}), 400

    # Validate Password with Detailed Feedback
    def validate_password(password):
        if len(password) < 12:
            return "Password must be at least 12 characters long."
        if not re.search(r'[A-Z]', password):
            return "Password must include at least one uppercase letter."
        if not re.search(r'[a-z]', password):
            return "Password must include at least one lowercase letter."
        if not re.search(r'\d', password):
            return "Password must include at least one digit."
        if not re.search(r'[@$!%*?&]', password):
            return "Password must include at least one special character."
        return None

    password_error = validate_password(password)
    if password_error:
        return jsonify({"error": password_error}), 400

    # Function to validate address using Google API
    def validate_address(address_query):
        try:
            response = requests.get(
                GOOGLE_API_URL,
                params={'address': address_query, 'key': GOOGLE_API_KEY},
                timeout=10
            )
            response.raise_for_status()
            google_data = response.json()
            if google_data['status'] == 'OK':
                return google_data['results'][0]['formatted_address']
        except requests.RequestException as e:
            app.logger.error(f"Google API error: {e}")
        return None

    # Address Validation
    address_data = validate_address(address_query)
    if not address_data:
        return jsonify({"error": "Invalid address. Please provide a valid address."}), 400

    # Hash the password
    hashed_password = generate_password_hash(password)

    # Create a new customer record
    new_user = Users(
        first_name=first_name,
        last_name=last_name,
        password=hashed_password,
        registration_cat=registration_cat,
        created_at=datetime.now(),
        updated_at=None,
        email=email,
        address=address_data,
        image_url=f"https://avatar.iran.liara.run/public/boy?username={first_name}"
    )

    # Save the new user to the database
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"success": "Account created successfully!", "redirect_url": url_for('dashboard')}), 200
    except Exception as e:
        app.logger.error(f"Database error: {e}")
        db.session.rollback()
        return jsonify({"error": "An error occurred during registration. Please try again later."}), 500


# ------Customer Profile--------

@app.route("/profile", methods=["GET"])
def get_profile():
    email = session.get('email')
    if not email:
        return jsonify({"error": "Session expired or email not found. Please sign up again."}), 400
    
    try:
        # Fetch the user from the database
        user = Users.query.filter_by(email=email).first()

        # Check if the user exists
        if not user:
            return jsonify({"error": "User not found."}), 404

        # Return the profile template
        return render_template("profile.html", user=user)
    except Exception as e:
        # Handle any other exceptions that might occur
        return jsonify({"error": "An error occurred while loading profile.", "details": str(e)}), 500







# Dashboard endpoint for redirecting after successful login
@app.route('/dashboard')
def dashboard():
    if 'email' not in session:
        return redirect(url_for('index'))  
    return render_template("dashboard.html")





