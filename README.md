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
PORT=<your_port>
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
## Running endpoints on postman for testing 
### For registering user
```
http://your_localhost/api/auth/register
now send data in json format POST http method
{
  "username": "name",
  "password": "password",
  "role": "role_of_user"
}
```

### To login user
```
http://your_localhost/api/auth/login
now send data in json format in POST http method
{
  "username": "name",
  "password": "password",
}
```


### To add trains
```
http://your_localhost/api/trains/add

Set headers for authorization
Authorization:<token_generated_after_registering_for_admin>
x-api-key:<API_Key_from_env>

now send data in json format in POST http method
{
    "train_name":"Rajdhani",
    "source_station":"Bhopal",
    "destination_station":"Jammu",
    "total_seats":150,
    "available_seats":150
}
```



### Get Seat Availability
```
http://your_localhost/api/trains/get?source=Bhopal&destination=Jammu
Hit request in GET http method

```


### Book a Seat
```
http://your_localhost/api/bookings/book

Set headers for authentication for login
Authorization:Bearer <token_generated_after_login_for_user>

now send data in json format in POST http method
{
    "train_id":2,
    "source_station":"Bhopal",
    "destination_station":"Jammu"
}

```


### Get Specific Booking Details
```
http://your_localhost/api/bookings/:id

Set headers for authentication for login
Authorization:Bearer <token_generated_after_login_for_user>

Hit request in GET http method


```
