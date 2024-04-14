from flask import Flask, request, make_response, render_template
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
from flask_bcrypt import Bcrypt
from datetime import timedelta
from dotenv import load_dotenv
import os
from flask_cors import CORS

from models import db, User, Brand, Car, Rental, Review

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/dist',
    template_folder='../client/dist'
)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

load_dotenv()

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

migrate = Migrate(app, db)
db.init_app(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")

api = Api(app)
CORS(app, origins=['http://localhost:3000'])

class UserSignUp(Resource):
    def post(self):
        first_name = request.json.get('first_name', None)
        last_name = request.json.get('last_name', None)
        email = request.json.get('email', None)
        password = bcrypt.generate_password_hash(request.json.get('password', None)).decode('utf-8')

        new_user = User(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password,
        )

        db.session.add(new_user)
        db.session.commit()

        response_dict = new_user.to_dict()
        return make_response(response_dict, 201)

api.add_resource(UserSignUp, '/signup')

class UserSignIn(Resource):
    def post(self):
        email = request.json.get('email', None)
        password = request.json.get('password', None)
        remember_me = request.json.get('remember_me', False)

        user = User.query.filter_by(email=email).first()

        if not user or not bcrypt.check_password_hash(user.password, password):
            return {"error": "Bad username or password"}, 401

        expires = timedelta(days=7) if remember_me else timedelta(hours=1)
        access_token = create_access_token(identity=email, expires_delta=expires)
        return {"access_token": access_token}, 200

api.add_resource(UserSignIn, '/signin')

class Users(Resource):
    @jwt_required()
    def get(self):
        response_dict_list = [user.to_dict() for user in User.query.all()]
        return make_response(response_dict_list, 200)

api.add_resource(Users, '/users')

class UserByID(Resource):
    @jwt_required()
    def get(self, id):
        response_dict = User.query.filter_by(id=id).first().to_dict()
        return make_response(response_dict, 200)
    
api.add_resource(UserByID, '/users/<int:id>')  

class Brands(Resource):
    # @jwt_required()
    def get(self):
        response_dict_list = [brand.to_dict() for brand in Brand.query.all()]
        return make_response(response_dict_list, 200)
    
    # @jwt_required()
    def post(self):
        new_brand = Brand(
            name=request.json['name'],
            logo=request.json['logo'],
        )
        
        db.session.add(new_brand)
        db.session.commit()
        
        response_dict = new_brand.to_dict()
        return make_response(response_dict, 201)

api.add_resource(Brands, '/brands')

class BrandByID(Resource):
    # @jwt_required()
    def get(self, id):
        response_dict = Brand.query.filter_by(id=id).first().to_dict()
        return make_response(response_dict, 200)
    
    # @jwt_required()
    def patch(self, id):
        record = Brand.query.filter_by(id=id).first()
        for attr in request.form:
            setattr(record, attr, request.form[attr])

        db.session.add(record)
        db.session.commit()

        response_dict = record.to_dict()

        response = make_response(
            response_dict,
            200
        )

        return response

    # @jwt_required()
    def delete(self, id):
        record = Brand.query.filter_by(id=id).first()

        db.session.delete(record)
        db.session.commit()

        response_dict = {"message": "record successfully deleted"}

        response = make_response(
            response_dict,
            200
        )

        return response
    
api.add_resource(BrandByID, '/brands/<int:id>')

class Cars(Resource):
    # @jwt_required()
    def get(self):
        response_dict_list = [car.to_dict() for car in Car.query.all()]
        return make_response(response_dict_list, 200)
    
    # @jwt_required()
    def post(self):
        new_car = Car(
            model=request.json['model'],
            image=request.json['image'],
            brand_id=request.json['brand_id']
        )
        
        db.session.add(new_car)
        db.session.commit()
        
        response_dict = new_car.to_dict()
        return make_response(response_dict, 201)

api.add_resource(Cars, '/cars')

class CarByID(Resource):
    @jwt_required()
    def get(self, id):
        response_dict = Car.query.filter_by(id=id).first().to_dict()
        return make_response(response_dict, 200)
    
    @jwt_required()
    def patch(self, id):
        record = Car.query.filter_by(id=id).first()
        for attr in request.form:
            setattr(record, attr, request.form[attr])

        db.session.add(record)
        db.session.commit()

        response_dict = record.to_dict()

        response = make_response(
            response_dict,
            200
        )

        return response

    @jwt_required()
    def delete(self, id):
        record = Car.query.filter_by(id=id).first()

        db.session.delete(record)
        db.session.commit()

        response_dict = {"message": "record successfully deleted"}

        response = make_response(
            response_dict,
            200
        )

        return response
    
api.add_resource(CarByID, '/cars/<int:id>')

class Rentals(Resource):
    @jwt_required()
    def get(self):
        response_dict_list = [rental.to_dict() for rental in Rental.query.all()]
        return make_response(response_dict_list, 200)

api.add_resource(Rentals, '/rentals')

class RentalByID(Resource):
    @jwt_required()
    def get(self, id):
        response_dict = Rental.query.filter_by(id=id).first().to_dict()
        return make_response(response_dict, 200)
    
api.add_resource(RentalByID, '/rentals/<int:id>')

class Reviews(Resource):
    @jwt_required()
    def get(self):
        response_dict_list = [review.to_dict() for review in Review.query.all()]
        return make_response(response_dict_list, 200)
    
    @jwt_required()
    def post(self):
        new_review = Review(
            comment=request.json['comment']
        )
        
        db.session.add(new_review)
        db.session.commit()
        
        response_dict = new_review.to_dict()
        return make_response(response_dict, 201)

api.add_resource(Reviews, '/reviews')

class ReviewByID(Resource):
    @jwt_required()
    def get(self, id):
        response_dict = Review.query.filter_by(id=id).first().to_dict()
        response = make_response(response_dict, 200)
        return response

    @jwt_required()
    def patch(self, id):
        record = Review.query.filter_by(id=id).first()
        for attr in request.form:
            setattr(record, attr, request.form[attr])

        db.session.add(record)
        db.session.commit()

        response_dict = record.to_dict()

        response = make_response(
            response_dict,
            200
        )

        return response

    @jwt_required()
    def delete(self, id):
        record = Review.query.filter_by(id=id).first()

        db.session.delete(record)
        db.session.commit()

        response_dict = {"message": "record successfully deleted"}

        response = make_response(
            response_dict,
            200
        )

        return response

api.add_resource(ReviewByID, '/reviews/<int:id>')