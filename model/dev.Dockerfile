# Use the official Python image
FROM python:3.10-slim

# Install system dependencies for OpenCV and other tools
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender1
    
# Set the working directory in the container
WORKDIR /app

# Copy requirements.txt and install dependencies
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container
COPY . .

# Set environment variables for Flask
ENV FLASK_APP=flask_server.py
# Enable hot-reload for Flask
ENV FLASK_ENV=development  


# Expose port 5000 for Flask
EXPOSE 5000

# Command to run Flask on container start
CMD ["flask", "run", "--host=0.0.0.0"]
