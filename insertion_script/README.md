# Docker Insertion Script for Wishlist Application

this Docker Insertion Script provides a Python image to run the data insertion script for the Wishlist application.

## Usage

Use a lightweight Python base image:

```Dockerfile
FROM python:3.8-slim
```

Set the working directory in the container:

```Dockerfile
WORKDIR /app
```

Copy the data insertion script:

```Dockerfile
COPY script.py .
COPY requirements.txt .
```

Install Python dependencies:

```Dockerfile
RUN pip install --no-cache-dir -r requirements.txt
```

Command to run the data insertion script:

```Dockerfile
CMD ["python", "script.py"]
```

The requirements.txt file contains the psycopg2-binary dependency to connect to the PostgreSQL database.

```
psycopg2-binary==2.9.1
```

The Python script connects to the PostgreSQL database, executes SQL queries to insert users, wishlist items, and shared wishlists, then commits the transaction.

## Deployment

To deploy the data insertion script, make sure you have Docker installed on your machine, then run the following commands:

```
docker build -t insertion-script .
docker run insertion-script
```

Also, make sure to configure the necessary environment variables for the data insertion script to correctly connect to the database.

## Technical Documentation

The Docker Insertion Script provides a Python image to run the data insertion script for the Wishlist application. It contains the necessary dependencies to connect to the PostgreSQL database and insert data into the tables.

## Technologies Used

The Docker Insertion Script uses the following technology:

- **Python**: A high-level programming language for general-purpose programming.