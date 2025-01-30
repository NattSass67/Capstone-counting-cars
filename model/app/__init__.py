# app/__init__.py

from flask import Flask
from flask_socketio import SocketIO
from sockets.test_socket import register_video_socket_handlers
from flask_cors import CORS  # Import CORS

socketio = SocketIO(cors_allowed_origins='*', async_mode='eventlet')
register_video_socket_handlers(socketio)


def create_app():
    app = Flask(__name__)
    # Configure your app here
    CORS(app)

    socketio.init_app(app)

    from .routes import main
    app.register_blueprint(main)

    return app
