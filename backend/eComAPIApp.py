from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson.objectid import ObjectId
import bcrypt
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Replace <username> and <password> with your actual credentials
app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)

@app.route('/')  # Define the root route
def home():
    return "Welcome to the eCommerce API!"

@app.route('/api/products', methods=['GET'])
def get_products():
    """Fetch all products from the database."""
    products = mongo.db.products.find()
    output = []
    for product in products:
        output.append({
            'id': str(product['_id']),  # Convert ObjectId to string
            'name': product['name'],
            'description': product['description'],
            'price': product['price']
        })
    return jsonify(output)

@app.route('/api/products/<id>', methods=['GET'])
def get_product(id):
    """Fetch a single product by ID from the database."""
    product = mongo.db.products.find_one({'_id': ObjectId(id)})
    if product:
        output = {
            'id': str(product['_id']),
            'name': product['name'],
            'description': product['description'],
            'price': product['price']
        }
        return jsonify(output)
    else:
        return jsonify({'error': 'Product not found'}), 404

@app.route('/api/products', methods=['POST'])
def add_product():
    """Add a new product to the database."""
    data = request.get_json()
    new_product = {
        'name': data['name'],
        'description': data['description'],
        'price': data['price']
    }
    mongo.db.products.insert_one(new_product)
    return jsonify({'message': 'Product added successfully!'}), 201

@app.route('/api/products/<id>', methods=['PUT'])
def update_product(id):
    """Update a product by ID in the database."""
    data = request.get_json()
    mongo.db.products.update_one(
        {'_id': ObjectId(id)},
        {'$set': {
            'name': data['name'],
            'description': data['description'],
            'price': data['price']
        }}
    )
    return jsonify({'message': 'Product updated successfully!'}), 200

@app.route('/api/products/<id>', methods=['DELETE'])
def delete_product(id):
    """Delete a product by ID from the database."""
    mongo.db.products.delete_one({'_id': ObjectId(id)})
    return jsonify({'message': 'Product deleted successfully!'}), 200

@app.route('/api/login', methods=['POST'])
def login():
    """User login."""
    data = request.get_json()
    user = mongo.db.users.find_one({'username': data['username']})
    if user and bcrypt.checkpw(data['password'].encode('utf-8'), user['password']):
        return jsonify({'message': 'Login successful', 'user_id': str(user['_id'])}), 200
    return jsonify({'message': 'Invalid username or password'}), 401

@app.route('/api/signup', methods=['POST'])
def signup():
    """User signup."""
    data = request.get_json()
    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    mongo.db.users.insert_one({'username': data['username'], 'password': hashed_password})
    return jsonify({'message': 'User created successfully!'}), 201

@app.route('/api/cart/<user_id>', methods=['GET', 'POST', 'PUT'])
def manage_cart(user_id):
    """Fetch or update the user's cart."""
    if request.method == 'GET':
        # Fetch the user's cart
        user_cart = mongo.db.carts.find_one({'user_id': user_id})
        if user_cart:
            return jsonify(user_cart['products']), 200
        else:
            return jsonify([]), 200  # Return empty cart if not found

    if request.method == 'POST':
        # Add a product to the user's cart
        data = request.get_json()
        product = data['product']
        mongo.db.carts.update_one(
            {'user_id': user_id},
            {'$addToSet': {'products': product}},
            upsert=True
        )
        return jsonify({'message': 'Product added to cart!'}), 201

    if request.method == 'PUT':
        # Update the user's cart
        data = request.get_json()
        cart = data['cart']
        mongo.db.carts.update_one(
            {'user_id': user_id},
            {'$set': {'products': cart}},
            upsert=True
        )
        return jsonify({'message': 'Cart updated!'}), 200

if __name__ == '__main__':
    app.run(debug=True)
