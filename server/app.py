# from flask import Flask, request, make_response, jsonify, session
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
# from flask_restful import Api, Resource
# from models import db, User, Listing, Favorite, Image
# from config import db, app, api
# import os
# import cloudinary
# import cloudinary.uploader

from config import app, db, api  # Import configured app and extensions
from models import User, Listing, Favorite, Image  # Import your models
from flask import request, make_response, jsonify, session
import cloudinary
import cloudinary.uploader

URL_PREFIX = '/api'


# db.init_app(app)

#serlizalization
user_rules = ("-favorites", "-listings")
listing_rules = ("-favorites", "-users")
favorites_rules = ("-user", "-listing.favorites")
image_rules = ('-listing.image',)

@app.route(URL_PREFIX + '/')
def home():
    return 'Fix-N-Flip'

## session — sign up user
@app.post(URL_PREFIX + '/users')
def create_user():
    try:
        data = request.json
        new_user = User(
            name=data.get("username"), 
            user_name=data.get("username"), 
            )
        new_user.password_hash = data['password']
        db.session.add(new_user)
        db.session.commit()
        session["user_id"] = new_user.id
        return make_response(new_user.to_dict(rules = user_rules), 201)
    except Exception as e:
        return { 'error': f"{e}" }, 400
    
## session — log in user
@app.post(URL_PREFIX + '/login')
def login():
    data = request.json
    user_name = data.get('username')
    password = data.get('password')
    user = User.query.filter(User.user_name == user_name).first()
    if user:
        if user.authenticate(password):
            session["user_id"] = user.id
            return make_response(user.to_dict(rules=user_rules), 201)
    else:
        return { "message": "Invalid username/password!" }, 401
    
## user session — maintain currently logged in user's session on reload/navigation
@app.get(URL_PREFIX + '/check_session')
def check_session():
    user_id = session.get("user_id")
    user = User.query.filter(User.id == user_id).first()
    if user:
        return make_response(user.to_dict(rules=user_rules), 200)
    else:
        return { "message": "No user is currently logged in!" }, 401
    
## user session - logout user    
@app.delete(URL_PREFIX + '/logout')
def logout():
    session.pop('user_id')
    return {}, 204

## HELPER FUNCTIONS ## 
## get id of current user, if applicable
def current_user():
    current_user = session["user_id"]
    if current_user:
        return User.query.filter(User.id == current_user).first()
    
@app.get(URL_PREFIX + '/users')
def get_users():
    users = [u.to_dict(rules=user_rules) for u in User.query.all()]
    return make_response(users, 201)

@app.get(URL_PREFIX + '/users/<int:id>')
def get_user_by_id(id):
    user = db.session.get(User,id)
    if not user:
        return {"error":f"couldn't find user with id {id}"}, 404
    return make_response(user.to_dict(rules = user_rules), 201)



    



@app.get(URL_PREFIX + '/listings')
def get_listings():
    listings = [l.to_dict(rules = listing_rules) for l in Listing.query.all()]
    return make_response(listings,201)

@app.get(URL_PREFIX + '/listings/<int:id>')
def get_listing_by_id(id):
    listing = db.session.get(Listing,id)
    if not listing:
        return {"error":f"couldn't find listing with id {id}"}, 404
    return make_response(listing.to_dict(rules = listing_rules), 201)

@app.patch(URL_PREFIX + '/listings/<int:id>')
def patch_listing(id):
    listing = db.session.get(Listing,id)
    if not listing:
        return {"error":f"couldn't find listing with id {id}"}, 404
    data = request.json
    try:
        for key in data:
            setattr(listing, key, data[key])
        db.session.add(listing)
        db.session.commit()
        return make_response(listing.to_dict(rules = listing_rules), 201)
    except Exception as e:
        return {"error": f"Could not update listing with id {id}; {str(e)}"}, 404
    
@app.post(URL_PREFIX + '/listings')
def post_listing():
    data = request.json
    try:
        
        new_listing = Listing()
  
        for key in data:
            if hasattr(new_listing, key):
                setattr(new_listing, key, data[key])

        
        db.session.add(new_listing)
        db.session.commit()

        return make_response(new_listing.to_dict(rules=listing_rules), 201)
    except Exception as e:
       
        return {"error": f"Could not create listing; {str(e)}"}, 400




@app.post('/favorites')
def create_favorite():
    data = request.json
    try:
        new_favorite = Favorite(
            user_id=data.get('user_id'),
            listing_id=data.get('listing_id')
        )
        db.session.add(new_favorite)
        db.session.commit()
        return new_favorite.to_dict(), 201
    except Exception as e:
        return{"error": f"{e}"}

if __name__ == '__main__':
    app.run(port=5555, debug=True)

@app.get(URL_PREFIX + '/userProfile/favorites')
def get_user_favorites():
    favorites = [f.to_dict(rules = favorites_rules) for f in current_user().favorites]
    return make_response(favorites, 201)

@app.delete(URL_PREFIX + '/favorites/<int:id>')
def delete_favorite(id):
    try:
        
        favorite = Favorite.query.get(id)

        if not favorite:
            return {"error": "Favorite not found"}, 404

        db.session.delete(favorite)
        db.session.commit()

        return {"message": "Favorite deleted successfully"}, 200
    except Exception as e:
        # Handle exceptions
        return {"error": f"Could not delete favorite; {str(e)}"}, 400



@app.post(URL_PREFIX + '/images')
def post_image():
    if 'file' not in request.files:
        return {"error": "No file part"}, 400

    file = request.files['file']

    if file.filename == '':
        return {"error": "No selected file"}, 400

    # Retrieve 'listing_id' from form data
    listing_id = request.form.get('listing_id')

    try:
        # Upload the image to Cloudinary
        upload_result = cloudinary.uploader.upload(file)

        # Create a new Image instance
        new_image = Image(
            image_url=upload_result['url'],
            listing_id=listing_id
        )

        # Validate and handle the associated listing
        if not Listing.query.get(new_image.listing_id):
            return {"error": "Listing not found for the given listing_id"}, 404

        
        db.session.add(new_image)
        db.session.commit()

        # Return the newly created image
        return make_response(new_image.to_dict(rules=image_rules), 201)
    except Exception as e:
        
        return {"error": f"Could not upload image; {str(e)}"}, 400

