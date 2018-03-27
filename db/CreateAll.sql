DROP TABLE IF EXISTS Penhouse;
CREATE TABLE Penhouse(
    PenNumber INTEGER,
    Location CHAR(100),
    Size INTEGER,
    PRIMARY KEY (PenNumber)
);

DROP TABLE IF EXISTS Farmer;
CREATE TABLE Farmer(
    SIN INTEGER,
    FirstName CHAR(150),
    LastName CHAR(150)
);

DROP TABLE IF EXISTS HasHealthInsurance;
CREATE TABLE HasHealthInsurance (
    SIN INTEGER,
    PolicyNumber INTEGER,
    StartingDate DATE,
    PRIMARY KEY (SIN, PolicyNumber),
    FOREIGN KEY (SIN) REFERENCES Farmer
);

DROP TABLE IF EXISTS Manager;
CREATE TABLE Manager(
    SIN INTEGER
    PRIMARY KEY (SIN)
);

DROP TABLE IF EXISTS Worker;
CREATE TABLE Worker(
    SIN INTEGER,
    FirstName CHAR(150),
    LastName CHAR(150),
    PRIMARY KEY (SIN),
    FOREIGN KEY (SIN) REFERENCES Farmer,
    FOREIGN KEY (Manager_SIN) REFERENCES Manager
);

DROP TABLE IF EXISTS Animal;
CREATE TABLE Animal(
    Id INTEGER,
    Age INTEGER,
    Weight INTEGER,
    Name CHAR(150),
    PenNum INTEGER,
    SIN INTEGER,
    Species CHAR(150),
    PRIMARY KEY (Id),
    FOREIGN KEY (PenNumber) REFERENCES Penhouse,
    FOREIGN KEY (SIN) REFERENCES Farmer
);

DROP TABLE IF EXISTS Product;
CREATE TABLE Product(
    ProductId INTEGER,
    ProductionTime TIME,
    Id INTEGER,
    SIN INTEGER,
    PRIMARY KEY (pId),
    FOREIGN KEY (Id) REFERENCES Animal,
    FOREIGN KEY (SIN) REFERENCES Farmer
);

DROP TABLE IF EXISTS Milk;
CREATE TABLE Milk(
    pId INTEGER,
    Id INTEGER,
    Volume INTEGER,
    PRIMARY KEY (pId),
    FOREIGN KEY (pId) REFERENCES Product,
    FOREIGN KEY (Id) REFERENCES Animal
);

DROP TABLE IF EXISTS Egg;
CREATE TABLE Egg(
    pId INTEGER,
    Id INTEGER,
    Quantity INTEGER,
    Size INTEGER,
    PRIMARY KEY (pId),
    FOREIGN KEY (pId) REFERENCES Product,
    FOREIGN KEY (Id) REFERENCES Animal
);

DROP TABLE IF EXISTS Wool;
CREATE TABLE Wool(
    pId INTEGER,
    Id INTEGER,
    Weight INTEGER,
    Grade INTEGER,
    PRIMARY KEY (pId),
    FOREIGN KEY (pId) REFERENCES Product,
    FOREIGN KEY (Id) REFERENCES Animal
);

DROP TABLE IF EXISTS MealFeeding;
CREATE TABLE MealFeeding(
    Time TIME,
    Food CHAR(150),
    Water INTEGER,
    Id INTEGER,
    SIN INTEGER,
    PRIMARY KEY (Time),
    FOREIGN KEY (Id) REFERENCES Animal,
    FOREIGN KEY (SIN) REFERENCES Farmer
);

DROP TABLE IF EXISTS Harvests;
CREATE TABLE Harvests(
    Id INTEGER,
    SIN INTEGER,
    pId INTEGER,
    Date DATETIME,
    Duration INTEGER,
    PRIMARY KEY (Id, pId),
    FOREIGN KEY (Id) REFERENCES Animal,
    FOREIGN KEY (pId) REFERENCES Product
);

DROP TABLE IF EXISTS CowProduces;
CREATE TABLE CowProduces(
    pId INTEGER,
    Id INTEGER,
    PRIMARY KEY (pId),
    FOREIGN KEY (Id) REFERENCES Animal,
    FOREIGN KEY (pId) REFERENCES Product
);

DROP TABLE IF EXISTS ChickenProduces;
CREATE TABLE ChickenProduces(
    pId INTEGER,
    Id INTEGER,
    PRIMARY KEY (pId),
    FOREIGN KEY (Id) REFERENCES Animal,
    FOREIGN KEY (pId) REFERENCES Product
);

DROP TABLE IF EXISTS SheepProduces;
CREATE TABLE SheepProduces(
    pId INTEGER,
    Id INTEGER,
    PRIMARY KEY (pId),
    FOREIGN KEY (Id) REFERENCES Animal,
    FOREIGN KEY (pId) REFERENCES Product
);

DROP TABLE IF EXISTS AnimalMaintenance;
CREATE TABLE AnimalMaintenance(
    SIN INTEGER,
    Id INTEGER,
    PRIMARY KEY (Id),
    FOREIGN KEY (SIN) REFERENCES Farmer
);

DROP TABLE IF EXISTS ExpirationLookup;
CREATE TABLE ExpirationLookup(
    ProductionTime TIME,
    ExpiryDate DATETIME,
    PRIMARY KEY (ProductionTime)
);
