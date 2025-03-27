CREATE TABLE Users (
    Id SERIAL PRIMARY KEY,
    Username TEXT NOT NULL,
    Email TEXT NOT NULL UNIQUE,
    Password TEXT NOT NULL
);

CREATE TABLE Fridge (
    Id SERIAL PRIMARY KEY,
    UserId INT NOT NULL,
    Quantity INT,
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);

CREATE TABLE Recipes (
    Id SERIAL PRIMARY KEY,
    Name TEXT NOT NULL,
    Description TEXT
);

CREATE TABLE Planner (
    Id SERIAL PRIMARY KEY,
    UserId INT NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);

CREATE TABLE Planner_Recipes (
    Id SERIAL PRIMARY KEY,
    PlannerId INT NOT NULL,
    RecipeId INT NOT NULL,
    DayOfWeek TEXT NOT NULL CHECK (
        DayOfWeek IN (
            'Monday', 'Tuesday', 'Wednesday',
            'Thursday', 'Friday', 'Saturday', 'Sunday'
        )
    ),
    FOREIGN KEY (PlannerId) REFERENCES Planner(Id),
    FOREIGN KEY (RecipeId) REFERENCES Recipes(Id)
);
