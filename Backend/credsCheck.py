# import requests
#
# API_KEY = "YOUR_FIREBASE_WEB_API_KEY"  # Get this from Firebase Console
#
# # --- AUTH FUNCTIONS ---
#
# def sign_up(email, username, password):
#     """Signup with email, username, and password"""
#     url = f"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={API_KEY}"
#     payload = {
#         "email": email,
#         "password": password,
#         "returnSecureToken": True
#     }
#     res = requests.post(url, json=payload).json()
#
#     if "error" in res:
#         return res
#
#     # Save username mapping (requires Firestore/Realtime DB)
#     save_username_mapping(username, res["email"])
#
#     return {
#         "uid": res["localId"],
#         "idToken": res["idToken"],
#         "refreshToken": res["refreshToken"],
#         "email": res["email"],
#         "username": username
#     }
#
#
# def sign_in_with_email(email, password):
#     """Login with email & password"""
#     url = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={API_KEY}"
#     payload = {
#         "email": email,
#         "password": password,
#         "returnSecureToken": True
#     }
#     return requests.post(url, json=payload).json()
#
#
# def sign_in_with_username(username, password):
#     """Login with username & password (map username -> email)"""
#     email = get_email_from_username(username)
#     if not email:
#         return {"error": "Username not found"}
#     return sign_in_with_email(email, password)
#
#
# def sign_in_with_phone(phone_number, password):
#     """
#     Firebase phone authentication normally uses OTP (SMS verification).
#     If you want phone+password like a username system,
#     you'll need to store phone→email mapping (custom).
#     """
#     email = get_email_from_phone(phone_number)
#     if not email:
#         return {"error": "Phone not found"}
#     return sign_in_with_email(email, password)
#
#
# # --- PLACEHOLDER STORAGE FUNCTIONS ---
# # You need to implement these using Firestore, Realtime Database, or any DB.
#
# username_map = {}
# phone_map = {}
#
# def save_username_mapping(username, email):
#     username_map[username] = email
#
# def get_email_from_username(username):
#     return username_map.get(username)
#
# def get_email_from_phone(phone):
#     return phone_map.get(phone)
#
#
# # --- DEMO USAGE ---
#
# # Signup user
# new_user = sign_up("test@example.com", "testuser", "secret123")
# print("Signed up:", new_user)
#
# # Login with username
# login_user = sign_in_with_username("testuser", "secret123")
# print("Logged in with username:", login_user)
#
# # (Optional) Login with phone
# phone_map["+15551234567"] = "test@example.com"  # manually map phone to email
# login_phone = sign_in_with_phone("+15551234567", "secret123")
# print("Logged in with phone:", login_phone)
