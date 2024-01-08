from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

import re

#local imports
from config import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = 'users_table'

    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String)
    _password_hash = db.Column("password_hash", db.String(128))  # have questions on this 
    budget = db.Column(db.Float, nullable=True)

    # add relationship
    favorites = db.relationship('Favorite', back_populates='user', cascade='all, delete-orphan')
    listings = association_proxy('favorites', 'listing') # do these need to be lower case

    # add serialization rules
    serialize_rules = ('-favorites.user','-_password_hash')

    #authentication
    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hash is inacessible!")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))


    def __repr__(self):
        return f'<User {self.id}>'


class Listing(db.Model, SerializerMixin):
    __tablename__ = 'listings_table'

    id = db.Column(db.Integer, primary_key=True)
    street_address = db.Column(db.String, nullable=False) #this could be both a string and an integer, how do I incorporate both
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    zip_code = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    lot_size = db.Column(db.Float, nullable=False)
    square_footage = db.Column(db.Integer, nullable=False)

    # add relationship
    favorites = db.relationship('Favorite', back_populates='listing', cascade='all, delete-orphan')
    users = association_proxy('favorites', 'user')
    images = db.relationship('Image', back_populates='listing', cascade='all, delete-orphan')

    # add serialization rules
    serialize_rules = ('-favorites.user', '-images.listing',)
        
    def __repr__(self):
        return f'<Listing {self.id}/{self.street_address}/{self.city}/{self.state}/{self.zip_code}/{self.price}/{self.lot_size}/{self.square_footage}>'


class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorite_table'

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'), nullable=False)
    listing_id = db.Column(db.Integer, db.ForeignKey('listings_table.id'), nullable=False)

    # add relationships
    user = db.relationship('User', back_populates='favorites')
    listing = db.relationship('Listing', back_populates='favorites')

    # add serialization rules
    serialize_rules = ('-user.favorites', '-listing.favorites')

    def __repr__(self):
        return f'<Favorite {self.id}>'

class Image(db.Model, SerializerMixin):
    __tablename__ = 'image_table'

    id = db.Column(db.Integer, primary_key=True)

    image_url = db.Column(db.String, nullable=False)

    listing_id = db.Column(db.Integer, db.ForeignKey('listings_table.id'), nullable=False)

    # add relationships
    
    listing = db.relationship('Listing', back_populates='images')

    # add serialization rules
    serialize_rules = ('-listing.image',)

    def __repr__(self):
        return f'<Favorite {self.id}/{self.image_url}>'