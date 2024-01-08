import json

from app import app
from models import db, User, Listing, Favorite, Image
from werkzeug.security import generate_password_hash


listing_list = [
    {
        "street_address": "123 Example St",
        "city": "Example City",
        "state": "EX",
        "zip_code": 12345,
        "price": 250000,
        "lot_size": 5000,
        "square_footage": 1500,
        
    },
    {
        "street_address": "456 Main St",
        "city": "Sunnyvale",
        "state": "CA",
        "zip_code": 94086,
        "price": 350000,
        "lot_size": 6000,
        "square_footage": 1800,
       
    },
    {
        "street_address": "789 Oak Rd",
        "city": "Maple Town",
        "state": "OR",
        "zip_code": 97035,
        "price": 420000,
        "lot_size": 5500,
        "square_footage": 2000,
        
    },
    {
        "street_address": "101 Pine Ln",
        "city": "Lakeview",
        "state": "MI",
        "zip_code": 48850,
        "price": 275000,
        "lot_size": 4800,
        "square_footage": 1600,
        
    },
]

# Seed data for Users
user_list = [
    {
        "user_name": "user1",
        "password": "password123"
    },
    {
        "user_name": "user2",
        "password": "password456"
    }
    # Add more users as needed
]

image_list = [
    {
        "image_url": "https://example.com/image1.jpg",
        "listing_id": 1  # Assuming this corresponds to a listing's ID
    },
    {
        "image_url": "https://example.com/image2.jpg",
        "listing_id": 2  # Adjust according to actual listing ID
    }
    # Add more images as needed
]

favorite_list = [
    {
        "user_id": 1,
        "listing_id": 1
    }
    # Add more favorites as needed
]


with app.app_context():

    Listing.query.delete()
    User.query.delete()
    Image.query.delete()
    Favorite.query.delete()

    # listings = [Listing(**listing) for listing in listing_list] 
    listings = [Listing(**listing) for listing in listing_list]
    users = [User(user_name=user['user_name'], _password_hash=generate_password_hash(user['password'])) for user in user_list]
    images = [Image(**image) for image in image_list]
    favorites = [Favorite(**favorite) for favorite in favorite_list]

    db.session.add_all(listings)
    db.session.add_all(users)
    db.session.add_all(images)
    db.session.add_all(favorites)

    db.session.commit()

