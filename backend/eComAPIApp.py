from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson.objectid import ObjectId
import bcrypt
from dotenv import load_dotenv
import os


load_dotenv()
app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)

@app.route('/api/products', methods=['GET'])
def get_products():
    products = mongo.db.products.find()
    output = []
    for product in products:
        output.append({
            'id': str(product['_id']),
            'name': product['name'],
            'description': product['description'],
            'price': product['price']
        })
    return jsonify(output)

@app.route('/api/products/<id>', methods=['GET'])
def get_product(id):
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
    mongo.db.products.delete_one({'_id': ObjectId(id)})
    return jsonify({'message': 'Product deleted successfully!'}), 200

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = mongo.db.users.find_one({'username': data['username']})
    if user and bcrypt.checkpw(data['password'].encode('utf-8'), user['password']):
        return jsonify({'message': 'Login successful', 'user_id': str(user['_id'])}), 200
    return jsonify({'message': 'Invalid username or password'}), 401

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    mongo.db.users.insert_one({'username': data['username'], 'password': hashed_password})
    return jsonify({'message': 'User created successfully!'}), 201

@app.route('/api/admin/signup', methods=['POST'])
def admin_signup():
    data = request.get_json()
    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    mongo.db.admins.insert_one({'username': data['username'], 'password': hashed_password})
    return jsonify({'message': 'Admin created successfully!'}), 201

@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json()
    admin = mongo.db.admins.find_one({'username': data['username']})
    if admin and bcrypt.checkpw(data['password'].encode('utf-8'), admin['password']):
        return jsonify({'message': 'Admin login successful', 'admin_id': str(admin['_id'])}), 200
    return jsonify({'message': 'Invalid username or password'}), 401

@app.route('/api/cart/<user_id>', methods=['GET', 'POST', 'PUT'])
def manage_cart(user_id):
    if request.method == 'GET':
        user_cart = mongo.db.carts.find_one({'user_id': user_id})
        if user_cart:
            return jsonify(user_cart['products']), 200
        else:
            return jsonify([]), 200

    if request.method == 'POST':
        data = request.get_json()
        product = data['product']
        mongo.db.carts.update_one(
            {'user_id': user_id},
            {'$addToSet': {'products': product}},
            upsert=True
        )
        return jsonify({'message': 'Product added to cart!'}), 201

    if request.method == 'PUT':
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
