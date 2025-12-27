DROP TABLE IF EXISTS Ticket, AppUser, Show, Room, ProgramTime, Movie CASCADE;

CREATE TABLE IF NOT EXISTS Movie(
            MovieID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            image VARCHAR(50) NULL,
            awards VARCHAR(50) NULL,
            title VARCHAR(50) NOT NULL,
            rating INT NOT NULL,
            releaseDate DATE NOT NULL,
            length INT NOT NULL,
            ageRating INT NOT NULL,
            genre VARCHAR(50) NOT NULL,
            description VARCHAR(1000) NOT NULL
       );

        CREATE TABLE IF NOT EXISTS ProgramTime(
            ProgramTimeID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            fk_MovieID INT NOT NULL REFERENCES Movie(MovieID) ON DELETE CASCADE,
            time TIME NOT NULL
        );

        CREATE TABLE IF NOT EXISTS Room(
            RoomID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name VARCHAR(30) NOT NULL,
            description VARCHAR(50)
        );

        CREATE TABLE IF NOT EXISTS Show(
            ShowID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            fk_movie_id INT NOT NULL REFERENCES Movie(MovieID),
            fk_room_id INT NOT NULL REFERENCES Room(RoomID),
            start_time TIME NOT NULL,
            end_time TIME NOT NULL,
            price DECIMAL(5,2) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS AppUser(
            UserID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name VARCHAR(40) NOT NULL,
            email VARCHAR(40) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            preferences VARCHAR(100) NULL
        );

        CREATE TABLE IF NOT EXISTS Ticket(
            TicketID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            fk_showID INT NOT NULL REFERENCES Show(ShowID),
            fk_userID INT NOT NULL REFERENCES AppUser(UserID)
        );