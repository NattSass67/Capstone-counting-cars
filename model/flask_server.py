import os
from app import create_app

app = create_app()

# Log when the server starts or restarts
def log_start():
    print("Server started or restarted!")

if __name__ == "__main__":
    # Watch the entire project directory
    project_root = os.path.abspath(os.path.dirname(__file__))
    
    # Collect all files from the project directory and its subdirectories
    extra_files = []
    for directory_path, _, files in os.walk(project_root):
        for f in files:
            file_path = os.path.join(directory_path, f)
            extra_files.append(file_path)

    # Log initial server start
    log_start()  
    
    app.run(host='localhost', port=5000, debug=True, extra_files=extra_files)
