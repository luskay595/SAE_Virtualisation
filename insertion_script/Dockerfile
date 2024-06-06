# Use a lightweight Python base image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Copy the Python script and the configuration file
COPY script.py .
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Command to run the Python script
CMD ["python", "script.py"]
