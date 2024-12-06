# WorkIndiaTask

# How to Set Up Project

## To run commands
```
git clone https://github.com/AmanVerma2202/WorkIndiaTask.git
cd WorkindiaTask
npm run dev
```
## Set the environment variables(.env file)
```
DB_HOST=<your_local_host>
DB_USER=<Database_user>
DB_PASSWORD=<Database_Password>
DB_NAME=<your_database_name>
JWT_SECRET=<your_jwt_secret>
API_KEY=<Your_api_key>
```

## Creating database
```
CREATE DATABASE your_database_name;
USE your_database_name;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user'
);

CREATE TABLE trains (
  id INT PRIMARY KEY AUTO_INCREMENT,
  train_name VARCHAR(255) NOT NULL,
  source_station VARCHAR(255) NOT NULL,
  destination_station VARCHAR(255) NOT NULL,
  total_seats INT NOT NULL,
  available_seats INT NOT NULL
);

CREATE TABLE bookings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  train_id INT NOT NULL,
  source_station VARCHAR(255) NOT NULL,
  destination_station VARCHAR(255) NOT NULL,
  status ENUM('confirmed', 'cancelled') DEFAULT 'confirmed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (train_id) REFERENCES trains(id)
);

```

*project set up done*

# How to test Project
