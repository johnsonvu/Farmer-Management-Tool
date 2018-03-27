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
    LastName CHAR(150),
    PRIMARY KEY (SIN)
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
    SIN INTEGER,
    PRIMARY KEY (SIN)
);

DROP TABLE IF EXISTS Worker;
CREATE TABLE Worker(
    SIN INTEGER,
    Manager_SIN INTEGER,
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
    PenNumber INTEGER,
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
    PRIMARY KEY (ProductId),
    FOREIGN KEY (Id) REFERENCES Animal,
    FOREIGN KEY (SIN) REFERENCES Farmer
);

DROP TABLE IF EXISTS Milk;
CREATE TABLE Milk(
    ProductId INTEGER,
    Id INTEGER,
    Volume INTEGER,
    PRIMARY KEY (ProductId),
    FOREIGN KEY (ProductId) REFERENCES Product,
    FOREIGN KEY (Id) REFERENCES Animal
);

DROP TABLE IF EXISTS Egg;
CREATE TABLE Egg(
    ProductId INTEGER,
    Id INTEGER,
    Quantity INTEGER,
    Size INTEGER,
    PRIMARY KEY (ProductId),
    FOREIGN KEY (ProductId) REFERENCES Product,
    FOREIGN KEY (Id) REFERENCES Animal
);

DROP TABLE IF EXISTS Wool;
CREATE TABLE Wool(
    ProductId INTEGER,
    Id INTEGER,
    Weight INTEGER,
    Grade INTEGER,
    PRIMARY KEY (ProductId),
    FOREIGN KEY (ProductId) REFERENCES Product,
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
    ProductId INTEGER,
    Date TIMESTAMP WITHOUT TIME ZONE,
    Duration INTEGER,
    PRIMARY KEY (Id, ProductId),
    FOREIGN KEY (Id) REFERENCES Animal,
    FOREIGN KEY (ProductId) REFERENCES Product
);

DROP TABLE IF EXISTS CowProduces;
CREATE TABLE CowProduces(
    ProductId INTEGER,
    Id INTEGER,
    PRIMARY KEY (ProductId),
    FOREIGN KEY (Id) REFERENCES Animal,
    FOREIGN KEY (ProductId) REFERENCES Product
);

DROP TABLE IF EXISTS ChickenProduces;
CREATE TABLE ChickenProduces(
    ProductId INTEGER,
    Id INTEGER,
    PRIMARY KEY (ProductId),
    FOREIGN KEY (Id) REFERENCES Animal,
    FOREIGN KEY (ProductId) REFERENCES Product
);

DROP TABLE IF EXISTS SheepProduces;
CREATE TABLE SheepProduces(
    ProductId INTEGER,
    Id INTEGER,
    PRIMARY KEY (ProductId),
    FOREIGN KEY (Id) REFERENCES Animal,
    FOREIGN KEY (ProductId) REFERENCES Product
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
    ExpiryDate TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY (ProductionTime)
);
