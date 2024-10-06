from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)

# Replace <username> and <password> with your actual credentials
app.config["MONGO_URI"] = "mongodb+srv://hrushikesh069:hrushikesh2021@cluster0.k55w3.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=cluster0"  
mongo = PyMongo(app)

@app.route('/products', methods=['GET'])
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

@app.route('/products/<id>', methods=['GET'])
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

@app.route('/products', methods=['POST'])
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

@app.route('/products/<id>', methods=['PUT'])
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

@app.route('/products/<id>', methods=['DELETE'])
def delete_product(id):
    """Delete a product by ID from the database."""
    mongo.db.products.delete_one({'_id': ObjectId(id)})
    return jsonify({'message': 'Product deleted successfully!'}), 200

if __name__ == '__main__':
    app.run(debug=True)
