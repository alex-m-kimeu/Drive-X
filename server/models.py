from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates, relationship
from sqlalchemy.ext.associationproxy import association_proxy
import re

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    __serializer__ = {'only': ('id', 'first_name', 'last_name', 'email')}
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), unique=True, nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    rentals = relationship('Rental', back_populates='user')
    
    @validates('first_name')
    def validate_first_name(self, key, first_name):
        assert len(first_name) > 1
        assert first_name.isalpha(), "First name should only contain alphabetic characters"
        return first_name

    @validates('last_name')
    def validate_last_name(self, key, last_name):
        assert len(last_name) > 1
        assert last_name.isalpha(), "Last name should only contain alphabetic characters"
        return last_name

    @validates('email')
    def validate_email(self, key, email):
        assert '@' in email
        assert re.match(r"[^@]+@[^@]+\.[^@]+", email), "Invalid email format"
        return email

    @validates('password')
    def validate_password(self, key, password):
        assert len(password) > 5
        assert re.search(r"[A-Z]", password), "Password should contain at least one uppercase letter"
        assert re.search(r"[a-z]", password), "Password should contain at least one lowercase letter"
        assert re.search(r"[0-9]", password), "Password should contain at least one digit"
        assert re.search(r"[!@#$%^&*(),.?\":{}|<>]", password), "Password should contain at least one special character"
        return password
    
    def __repr__(self):
        return f'<User {self.id}, {self.first_name}, {self.last_name}, {self.email}, {self.password}>'

class Brand(db.Model, SerializerMixin):
    __tablename__ = 'brands'
    __serializer__ = {'only': ('id', 'name')}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    logo = db.Column(db.String, nullable=True)
    cars = relationship('Car', back_populates='brand')
    
    def __repr__(self):
        return f'<Brand {self.id}, {self.name}>'

class Car(db.Model, SerializerMixin):
    __tablename__ = 'cars'
    __serializer__ = {'only': ('id', 'model', 'brand_id')}

    id = db.Column(db.Integer, primary_key=True)
    model = db.Column(db.String(50), nullable=False)
    image = db.Column(db.String, nullable=True)
    brand_id = db.Column(db.Integer, db.ForeignKey('brands.id'), nullable=False)
    brand = relationship('Brand', back_populates='cars')
    rentals = relationship('Rental', back_populates='car')
    
    def __repr__(self):
        return f'<Car {self.id}, {self.model}, {self.brand_id}>'

class Rental(db.Model, SerializerMixin):
    __tablename__ = 'rentals'
    __serializer__ = {'only': ('id', 'user_id', 'car_id', 'start_date', 'end_date')}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    car_id = db.Column(db.Integer, db.ForeignKey('cars.id'), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    user = relationship('User', back_populates='rentals')
    car = relationship('Car', back_populates='rentals')
    reviews = relationship('Review', back_populates='rental')

    def __repr__(self):
        return f'<Rental {self.id}, {self.user_id}, {self.car_id}, {self.start_date}, {self.end_date}>'

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'
    __serializer__ = {'only': ('id', 'comment', 'rental_id')}

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(500), nullable=True)
    rental_id = db.Column(db.Integer, db.ForeignKey('rentals.id'), nullable=False)
    rental = relationship('Rental', back_populates='reviews')
    

    def __repr__(self):
        return f'<Review {self.id}, {self.comment}, {self.rental_id}>'

# Association Proxies
User.rented_cars = association_proxy('rentals', 'car')
Car.renting_users = association_proxy('rentals', 'user')