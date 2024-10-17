from flask_socketio import SocketIO


def register_video_socket_handlers(socketio: SocketIO):
    """Handle incoming video frames and add them to the queue."""
    print("Regis called")
    @socketio.on('connect')
    def handle_connect():
        print("Client connected.")
        # Start the background task when the first client connects
        # socketio.start_background_task(process_frames, socketio)

    @socketio.on('disconnect')
    def handle_disconnect():
        print("Client disconnected.")
    
    @socketio.on('video-frame')
    def handle_video_frame(data):
        print("process videoframe")