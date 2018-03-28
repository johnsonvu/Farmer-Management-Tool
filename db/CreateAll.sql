DROP TABLE IF EXISTS ExpirationLookup;
DROP TABLE IF EXISTS AnimalMaintenance;
DROP TABLE IF EXISTS SheepProduces;
DROP TABLE IF EXISTS ChickenProduces;
DROP TABLE IF EXISTS CowProduces;
DROP TABLE IF EXISTS Harvests;
DROP TABLE IF EXISTS MealFeeding;
DROP TABLE IF EXISTS Wool;
DROP TABLE IF EXISTS Egg;
DROP TABLE IF EXISTS Milk;
DROP TABLE IF EXISTS Product;
DROP TABLE IF EXISTS Worker;
DROP TABLE IF EXISTS Manager;
DROP TABLE IF EXISTS HasHealthInsurance;
DROP SEQUENCE IF EXISTS AnimalId_seq;
DROP TABLE IF EXISTS Animal;
DROP TABLE IF EXISTS Farmer;
DROP SEQUENCE IF EXISTS PenNumber_seq;
DROP TABLE IF EXISTS Penhouse;

CREATE TABLE Penhouse(
    PenNumber INTEGER,
    Location CHAR(100),
    Size INTEGER,
    PRIMARY KEY (PenNumber)
);

CREATE SEQUENCE PenNumber_seq
    START 1
    increment 1
    CACHE 1;
ALTER TABLE PenNumber_seq OWNER TO yvttysuu;

INSERT INTO Penhouse (PenNumber, Location, Size) VALUES (nextval('PenNumber_seq'), 'Chicken Coop', 8);
INSERT INTO Penhouse (PenNumber, Location, Size) VALUES (nextval('PenNumber_seq'), 'Sheep Barn', 6);


CREATE TABLE Farmer(
    SIN INTEGER,
    FirstName CHAR(150),
    LastName CHAR(150),
    PRIMARY KEY (SIN)
);

INSERT INTO Farmer (SIN, FirstName, LastName) VALUES (111111111, 'Johnson', 'Vu');
INSERT INTO Farmer (SIN, FirstName, LastName) VALUES (222222222, 'Justin', 'Kwan');


CREATE TABLE HasHealthInsurance (
    SIN INTEGER,
    PolicyNumber INTEGER,
    StartingDate DATE,
    PRIMARY KEY (SIN, PolicyNumber),
    FOREIGN KEY (SIN) REFERENCES Farmer
);

CREATE TABLE Manager(
    SIN INTEGER,
    PRIMARY KEY (SIN)
);

INSERT INTO Manager (SIN) VALUES (111111111);

CREATE TABLE Worker(
    SIN INTEGER,
    Manager_SIN INTEGER,
    PRIMARY KEY (SIN),
    FOREIGN KEY (SIN) REFERENCES Farmer,
    FOREIGN KEY (Manager_SIN) REFERENCES Manager
);

INSERT INTO Worker (SIN, Manager_SIN) VALUES (222222222, 111111111);

CREATE TABLE Animal(
    Id INTEGER,
    Age INTEGER,
    Weight INTEGER,
    Name CHAR(150),
    SIN INTEGER,
    Species CHAR(150),
    PenNumber INTEGER,
    PRIMARY KEY (Id),
    FOREIGN KEY (PenNumber) REFERENCES Penhouse,
    FOREIGN KEY (SIN) REFERENCES Farmer
);

CREATE SEQUENCE AnimalId_seq
    START 1
    increment 1
    CACHE 1;
ALTER TABLE AnimalId_seq OWNER TO yvttysuu;

INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 5, 90, 'Edmond', 222222222, 'CHICKEN', 1);
INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 3, 110, 'Ian', 222222222, 'SHEEP', 2);
INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 1, 55, 'Jeffrey', 222222222, 'CHICKEN', 1);

CREATE TABLE Product(
    ProductId INTEGER,
    ProductionTime TIME,
    Id INTEGER,
    SIN INTEGER,
    PRIMARY KEY (ProductId),
    FOREIGN KEY (Id) REFERENCES Animal,
    FOREIGN KEY (SIN) REFERENCES Farmer
);

CREATE TABLE Milk(
    ProductId INTEGER,
    Id INTEGER,
    Volume INTEGER,
    PRIMARY KEY (ProductId),
    FOREIGN KEY (ProductId) REFERENCES Product,
    FOREIGN KEY (Id) REFERENCES Animal
);

CREATE TABLE Egg(
    ProductId INTEGER,
    Id INTEGER,
    Quantity INTEGER,
    Size INTEGER,
    PRIMARY KEY (ProductId),
    FOREIGN KEY (ProductId) REFERENCES Product,
    FOREIGN KEY (Id) REFERENCES Animal
);

CREATE TABLE Wool(
    ProductId INTEGER,
    Id INTEGER,
    Weight INTEGER,
    Grade INTEGER,
    PRIMARY KEY (ProductId),
    FOREIGN KEY (ProductId) REFERENCES Product,
    FOREIGN KEY (Id) REFERENCES Animal
);

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

CREATE TABLE CowProduces(
    ProductId INTEGER,
    Id INTEGER,
    PRIMARY KEY (ProductId),
    FOREIGN KEY (Id) REFERENCES Animal,
    FOREIGN KEY (ProductId) REFERENCES Product
);

CREATE TABLE ChickenProduces(
    ProductId INTEGER,
    Id INTEGER,
    PRIMARY KEY (ProductId),
    FOREIGN KEY (Id) REFERENCES Animal,
    FOREIGN KEY (ProductId) REFERENCES Product
);

CREATE TABLE SheepProduces(
    ProductId INTEGER,
    Id INTEGER,
    PRIMARY KEY (ProductId),
    FOREIGN KEY (Id) REFERENCES Animal,
    FOREIGN KEY (ProductId) REFERENCES Product
);

CREATE TABLE AnimalMaintenance(
    SIN INTEGER,
    Id INTEGER,
    PRIMARY KEY (Id),
    FOREIGN KEY (SIN) REFERENCES Farmer
);

CREATE TABLE ExpirationLookup(
    ProductionTime TIME,
    ExpiryDate TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY (ProductionTime)
);
