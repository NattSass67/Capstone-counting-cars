import eventlet
eventlet.monkey_patch()

import os
from app import create_app, socketio

# Create the Flask app
app = create_app()


# Log when the server starts or restarts
def log_start():
    print("Server started or restarted!")
    
if __name__ == "__main__":
    # Log initial server start
    log_start()

    # Run the SocketIO server without extra_files
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)

