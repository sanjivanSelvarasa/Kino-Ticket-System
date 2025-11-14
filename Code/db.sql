create database db
    go
   use db
    go

       CREATE TABLE Movie(
            MovieID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            title VARCHAR(50) NOT NULL,
            description VARCHAR(150),
            genre VARCHAR(20)
       );

        CREATE TABLE Room(
            RoomID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name VARCHAR(30) NOT NULL,
            description VARCHAR(50)
        );

        CREATE TABLE Show(
            ShowID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            movie_id INT REFERENCES Movie(MovieID),
            room_id INT REFERENCES Room(RoomID),
            start_time TIME NOT NULL,
            end_time TIME NOT NULL,
            price DECIMAL(5,2)
        );

        CREATE TABLE User(
            name VARCHAR(40) NOT NULL,
            email VARCHAR(40) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        );



