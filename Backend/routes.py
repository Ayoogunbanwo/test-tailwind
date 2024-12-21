from flask import request, jsonify
from app import app, db
from models import Users
from werkzeug.security import generate_password_hash, check_password_hash
import random
from datetime import datetime
import re
import string
import sendgrid
from sendgrid.helpers.mail import Mail, Email, To, Content



#Retrieving Users
@app.route("/api/contacts", methods=["GET"])

def get_contacts():
    try:
        # Fetch all contacts
        users = Users.query.all()
        # Serialize contacts
        json_users = [users.to_json() for users in users]
        # Return JSON response
        return jsonify({"users": json_users}), 200
    except Exception as e:
        # Handle exceptions
        return jsonify({"error": "An error occurred while fetching contacts.", "details": str(e)}), 500



#Verifying Email ----- recieves email, generate code and send code as email(/Signup.html)

# Your SendGrid API key
SENDGRID_API_KEY = 'YOUR_SENDGRID_API_KEY'

def generate_token():
    """Generate a 6-digit token."""
    return ''.join(random.choices(string.digits, k=6))

def send_email_with_token(recipient_email, token):
    """Send the token to the email using SendGrid."""
    sg = sendgrid.SendGridAPIClient(api_key=SENDGRID_API_KEY)
    
    from_email = Email("your_email@example.com")  # Sender's email address
    to_email = To(recipient_email)  # Recipient's email address
    subject = "Your 6-digit Verification Token"
    content = Content("text/plain", f"Your verification token is: {token}")
    
    mail = Mail(from_email, to_email, subject, content)
    
    try:
        response = sg.send(mail)
        print(f"Email sent to {recipient_email} with status code {response.status_code}")
    except Exception as e:
        print(f"Failed to send email: {e}")

@app.route('/api/verify-email', methods=['POST'])
def verify_email():
    email = request.json.get('email')

    if not email:
        return jsonify({"error": "Email is required"}), 400

    # Call AbstractAPI for email validation (or your preferred email validation service)
    url = f"https://emailvalidation.abstractapi.com/v1/?api_key={API_KEY}&email={email}"
    response = requests.get(url)

    if response.status_code == 200:
        validation_data = response.json()

        # Check if the email is valid
        if not validation_data.get('is_valid'):
            return jsonify({"error": "Invalid email address"}), 400

        # Email is valid, generate a token
        token = generate_token()

        # Send the token to the user's email using SendGrid
        send_email_with_token(email, token)

        return jsonify({"message": "Verification email sent successfully with a token"}), 200
    else:
        return jsonify({"error": "Unable to validate email."}), 500




#Verify the Token (/verifyemail.html)






#Create account (/createaccount.html)

@app.route('/api/createaccount', methods=['POST'])
def create_account():
    data = request.json
    
    # Validate required fields
    required_fields = ['first_name', 'last_name', 'password', 'registration_cat']
    missing_fields = [field for field in required_fields if not data.get(field)]
    if missing_fields:
        return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400

    first_name = data['first_name']
    last_name = data['last_name']
    password = data['password']
    registration_cat = data['registration_cat']
    
    # Password strength validation
    password_pattern = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$"
    if not re.match(password_pattern, password):
        return jsonify({
            "error": (
                "Password must be at least 12 characters long, include at least one "
                "uppercase letter, one lowercase letter, one digit, and one special character."
            )
        }), 400
    
    # Hash the password
    hashed_password = generate_password_hash(password)
    
    # Create a new customer record
    new_user = Users(
        first_name=first_name,
        last_name=last_name,
        password=hashed_password,
        registration_cat=registration_cat,
        created_at = datetime.now(),
        image_url = f"https://avatar.iran.liara.run/public/boy?username={first_name}"
    )
    
    # Save the new user to the database
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "Registration successful"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "An error occurred while creating the account"}), 500



