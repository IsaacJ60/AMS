from dotenv import load_dotenv, find_dotenv
from flask import Flask, jsonify, request
from authlib.integrations.flask_oauth2 import ResourceProtector
from validator import Auth0JWTBearerTokenValidator
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
import os

load_dotenv(find_dotenv())

AUTH0_DOMAIN = os.getenv("AUTH0_DOMAIN")
AUTH0_AUDIENCE = os.getenv("AUTH0_AUDIENCE")
SQL_PASSWORD = os.getenv("SQL_PASSWORD")
SQL_USER = os.getenv("SQL_USER")
SQL_HOST = os.getenv("SQL_HOST")
SQL_DATABASE = os.getenv("SQL_DATABASE")

require_auth = ResourceProtector()
validator = Auth0JWTBearerTokenValidator(
    AUTH0_DOMAIN,
    AUTH0_AUDIENCE
)
require_auth.register_token_validator(validator)

APP = Flask(__name__)
CORS(APP)

# MySQL Database Configuration
APP.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{SQL_USER}:{SQL_PASSWORD}@{SQL_HOST}/{SQL_DATABASE}'
APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(APP)

#----------------- Database Models -----------------#

class PlayerBase(db.Model):
    base_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)

# Define Player Model with player_base_id
class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    player_base_id = db.Column(db.Integer, nullable=False)  # NEW COLUMN
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.String(100))
    gender = db.Column(db.String(100))

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_base_id = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(100), nullable=False)

# Create Tables (Run once)
with APP.app_context():
    db.create_all()

#----------------- User Management -----------------#

# ✅ Create a New User
@APP.route("/api/user-player-bases", methods=['POST'])
@require_auth(None)
def create_player_base_with_user():
    data = request.json
    if not data["email"]:
        return jsonify(error="email is required"), 400

    new_base = Users(user_base_id=data["user_base_id"], email=data["email"])
    db.session.add(new_base)
    db.session.commit()
    return jsonify(message={"message": "Player base with email association created successfully", "email": new_base.email}), 201

#----------------- Player Base Management -----------------#

# ✅ Get max_player_base_id
@APP.route("/api/player-bases-count", methods=['GET'])
@require_auth(None)
def get_player_bases_count():
    try:
        result = db.session.execute(text("SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'player_base'"))
        player_base = result.scalar()
        return jsonify(message={"base_id": player_base})
    except Exception as e:
        return jsonify(error="Error fetching player bases", message=str(e)), 500

# ✅ Get All Player Bases
@APP.route("/api/player-bases", methods=['GET'])
@require_auth(None)
def get_player_bases():
    try:
        player_bases = PlayerBase.query.all()
        return jsonify(message=[{
            'base_id': player_base.base_id,
            'name': player_base.name
        } for player_base in player_bases])
    except Exception as e:
        return jsonify(error="Error fetching player bases", message=str(e)), 500
    
# ✅ Create a New Player Base
@APP.route("/api/player-bases", methods=['POST'])
@require_auth(None)
def create_player_base():
    data = request.json
    if not data.get("name"):
        return jsonify(error="Base name is required"), 400

    new_base = PlayerBase(name=data["name"])
    db.session.add(new_base)
    db.session.commit()
    return jsonify(message={"message": "Player base created successfully", "base_id": new_base.base_id}), 201
    
# ✅ Get All Player Bases
@APP.route("/api/player-bases-user", methods=['POST'])
@require_auth(None)
def get_player_bases_with_user():
    data = request.json
    if not data.get("email"):
        return jsonify(error="Email is required"), 400
    else:
        email = data["email"]
    
    try:
        player_bases = db.session.query(PlayerBase.base_id, PlayerBase.name) \
            .join(Users, PlayerBase.base_id == Users.user_base_id) \
            .filter(Users.email == email) \
            .all()
        return jsonify(message=[{
            'base_id': player_base.base_id,
            'name': player_base.name
        } for player_base in player_bases])
    except Exception as e:
        return jsonify(error="Error fetching player bases with user", message=str(e)), 500

# ✅ Delete a Player Base
@APP.route("/api/player-bases/<int:base_id>", methods=['DELETE'])
@require_auth(None)
def delete_player_base(base_id):
    base = PlayerBase.query.get(base_id)
    if not base:
        return jsonify(error="Player base not found"), 404

    db.session.delete(base)
    db.session.commit()
    return jsonify({"message": "Player base deleted successfully"})

#----------------- Player Management -----------------#

@APP.route("/api/player-bases/<int:player_base_id>/players")
@require_auth(None)
def get_players(player_base_id):
    """Fetch players for a specific player base."""
    try:
        players = Player.query.filter_by(player_base_id=player_base_id).all()
        return jsonify(message=[{'id': p.id, 'name': p.name, 'age': p.age, 'gender': p.gender} for p in players])
    except Exception as e:
        print(f"Error fetching players: {str(e)}")
        return jsonify(error="Internal Server Error", message=str(e)), 500

# Add New Player to a Specific Player Base
@APP.route("/api/player-bases/<int:player_base_id>/players", methods=['POST'])
@require_auth(None)
def add_player(player_base_id):
    data = request.json
    new_player = Player(
        player_base_id=player_base_id, 
        name=data['name'], 
        age=data['age'], 
        gender=data['gender']
    )
    db.session.add(new_player)
    db.session.commit()
    return jsonify({'message': 'Player added successfully'}), 201

# Update Player in a Specific Player Base
@APP.route('/api/player-bases/<int:player_base_id>/players/<int:id>', methods=['PUT'])
@require_auth(None)
def update_player(player_base_id, id):
    player = Player.query.filter_by(id=id, player_base_id=player_base_id).first()
    if not player:
        return jsonify({'error': 'Player not found'}), 404
    
    data = request.json
    player.name = data['name']
    player.age = data['age']
    player.gender = data['gender']
    
    db.session.commit()
    return jsonify({'message': 'Player updated successfully'})

# Delete Player from a Specific Player Base
@APP.route('/api/player-bases/<int:player_base_id>/players/<int:id>', methods=['DELETE'])
@require_auth(None)
def delete_player(player_base_id, id):
    player = Player.query.filter_by(id=id, player_base_id=player_base_id).first()
    if not player:
        return jsonify({'error': 'Player not found'}), 404
    
    db.session.delete(player)
    db.session.commit()
    return jsonify({'message': 'Player deleted successfully'})

if __name__ == '__main__':
    APP.run(host='localhost', port=6060, debug=True)
