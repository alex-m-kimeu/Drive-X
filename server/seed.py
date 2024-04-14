from app import app
from models import db, Car, Brand

def clear_data():
    # Delete all Cars
    db.session.query(Car).delete()

    # Delete all Brands
    db.session.query(Brand).delete()

    # Commit the changes to the database
    db.session.commit()

with app.app_context():
    clear_data()