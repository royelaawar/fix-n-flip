import json

from app import app
from models import db, User, Listing, Favorite, Image
from werkzeug.security import generate_password_hash


listing_list = [
    {
        "street_address": "1 Merlin Dr",
        "city": "Manalapan",
        "state": "NJ",
        "zip_code": 17726,
        "price": 550000,
        "lot_size": 5000,
        "square_footage": 1800,
        
    },
    {
        "street_address": "5 Conover Lane",
        "city": "Manalapan",
        "state": "NJ",
        "zip_code": 17726,
        "price": 490000,
        "lot_size": 6000,
        "square_footage": 1578,
       
    },
    {
        "street_address": "21 Hillside Road",
        "city": "Manalapan",
        "state": "NJ",
        "zip_code": 17726,
        "price": 450000,
        "lot_size": 5500,
        "square_footage": 1380,
        
    },
    {
        "street_address": "352 Main St",
        "city": "Manalapan",
        "state": "NJ",
        "zip_code": 17726,
        "price": 350000,
        "lot_size": 4800,
        "square_footage": 1600,
        
    },
    {
        "street_address": "12 Barrister Lane",
        "city": "Manalapan",
        "state": "NJ",
        "zip_code": 17726,
        "price": 250000,
        "lot_size": 5000,
        "square_footage": 1900,
        
    },
    {
        "street_address": "2 Annapolis Drive",
        "city": "Manalapan",
        "state": "NJ",
        "zip_code": 17726,
        "price": 290000,
        "lot_size": 6000,
        "square_footage": 1800,
       
    },
    {
        "street_address": "109 Gordons Corner Rd",
        "city": "Manalapan",
        "state": "NJ",
        "zip_code": 17726,
        "price": 950000,
        "lot_size": 7000,
        "square_footage": 3000,
        
    },
    {
        "street_address": "380 St Andrews Place",
        "city": "Manalapan",
        "state": "NJ",
        "zip_code": 17726,
        "price": 275000,
        "lot_size": 4800,
        "square_footage": 1600,
        
    },
    {
        "street_address": "300 Gold Court",
        "city": "Manalapan",
        "state": "NJ",
        "zip_code": 17726,
        "price": 800000,
        "lot_size": 5000,
        "square_footage": 2800,
        
    },
    {
        "street_address": "8 Mcintosh Lane",
        "city": "Manalapan",
        "state": "NJ",
        "zip_code": 17726,
        "price": 350000,
        "lot_size": 6000,
        "square_footage": 1800,
       
    },
    {
        "street_address": "52 Lone Star Lane",
        "city": "Manalapan",
        "state": "NJ",
        "zip_code": 17726,
        "price": 420000,
        "lot_size": 5500,
        "square_footage": 2000,
        
    },
    {
        "street_address": "7 Valley Road",
        "city": "Manalapan",
        "state": "NJ",
        "zip_code": 17726,
        "price": 750000,
        "lot_size": 4800,
        "square_footage": 1600,
        
    },
     {
        "street_address": "201 Jerry Court",
        "city": "Manalapan",
        "state": "NJ",
        "zip_code": 17726,
        "price": 900000,
        "lot_size": 5000,
        "square_footage": 3500,
        
    },
    {
        "street_address": "16 Regency Way",
        "city": "Manalapan",
        "state": "NJ",
        "zip_code": 17726,
        "price": 850000,
        "lot_size": 6000,
        "square_footage": 1800,
       
    },
    {
        "street_address": "115 Wintergreen Drive",
        "city": "Manalapan",
        "state": "NJ",
        "zip_code": 17726,
        "price": 340000,
        "lot_size": 5500,
        "square_footage": 1900,
        
    },
    {
        "street_address": "1 Woodford Lane",
        "city": "Manalapan",
        "state": "NJ",
        "zip_code": 17726,
        "price": 300000,
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
        "image_url": "https://royimagestorage.s3.amazonaws.com/Home+1/image+1.webp", 
        "listing_id": 1  # Assuming this corresponds to a listing's ID
    },
    {
        "image_url": "https://royimagestorage.s3.amazonaws.com/img_01.png",
        "listing_id": 1  # Adjust according to actual listing ID
    },
    {
        "image_url": "https://royimagestorage.s3.amazonaws.com/img_01.png", 
        "listing_id": 2  # Assuming this corresponds to a listing's ID
    },
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

