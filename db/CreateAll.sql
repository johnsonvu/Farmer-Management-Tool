BEGIN;

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
DROP SEQUENCE IF EXISTS ProductId_seq;
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
    Location VARCHAR(100),
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
    FirstName VARCHAR(150),
    LastName VARCHAR(150),
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
    Name VARCHAR(150),
    SIN INTEGER,
    Species VARCHAR(150),
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
INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 1, 55, 'Jeffrey', 222222222, 'CHICKEN', 1);
INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 4, 33, 'Ma', 222222222, 'CHICKEN', 1);
INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 7, 22, 'Churches', 222222222, 'CHICKEN', 1);
INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 3, 110, 'Ian', 222222222, 'SHEEP', 2);
INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 2, 33, 'Lamb', 222222222, 'SHEEP', 2);
INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 1, 43, 'Ham', 222222222, 'SHEEP', 2);
INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 3, 110, 'Joe', 222222222, 'SHEEP', 2);
INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 4, 223, 'Alan', 222222222, 'COW', 1);
INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 7, 643, 'Jerry', 222222222, 'COW', 1);
INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 12, 321, 'Tommy', 222222222, 'COW', 1);

CREATE TABLE Product(
    ProductId INTEGER,
    ProductionDate DATE,
    AnimalId INTEGER,
    SIN INTEGER,
    PRIMARY KEY (ProductId),
    FOREIGN KEY (AnimalId) REFERENCES Animal,
    FOREIGN KEY (SIN) REFERENCES Farmer
);

CREATE SEQUENCE ProductId_seq
    START 1
    increment 1
    CACHE 1;
ALTER TABLE ProductId_seq OWNER TO yvttysuu;

CREATE TABLE Milk(
    ProductId INTEGER,
    Volume INTEGER,
    Grade VARCHAR(150),
    PRIMARY KEY (ProductId),
    FOREIGN KEY (ProductId) REFERENCES Product
);

CREATE TABLE Egg(
    ProductId INTEGER,
    Quantity INTEGER,
    Size VARCHAR(150),
    PRIMARY KEY (ProductId),
    FOREIGN KEY (ProductId) REFERENCES Product
);

CREATE TABLE Wool(
    ProductId INTEGER,
    Weight INTEGER,
    Grade VARCHAR(150),
    PRIMARY KEY (ProductId),
    FOREIGN KEY (ProductId) REFERENCES Product
);


INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), '2018-02-25', 1, 222222222);
INSERT INTO Egg (ProductId, Quantity, Size) VALUES (currval('ProductId_seq'), 3, 'Large');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), '2018-02-26', 2, 222222222);
INSERT INTO Egg (ProductId, Quantity, Size) VALUES (currval('ProductId_seq'), 7, 'Large');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), (NOW() AT TIME ZONE 'US/Pacific')::DATE, 3, 222222222);
INSERT INTO Egg (ProductId, Quantity, Size) VALUES (currval('ProductId_seq'), 3, 'Large');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), (NOW() AT TIME ZONE 'US/Pacific')::DATE, 5, 222222222);
INSERT INTO Wool (ProductId, Weight, Grade) VALUES (currval('ProductId_seq'), 4, 'A');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), (NOW() AT TIME ZONE 'US/Pacific')::DATE, 9, 222222222);
INSERT INTO Milk (ProductId, Volume, Grade) VALUES (currval('ProductId_seq'), 30, 'B');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), '2018-02-28', 10, 222222222);
INSERT INTO Milk (ProductId, Volume, Grade) VALUES (currval('ProductId_seq'), 2, 'A');


CREATE TABLE MealFeeding(
    Date DATE,
    Food VARCHAR(150),
    Water INTEGER,
    AnimalId INTEGER,
    SIN INTEGER,
    PRIMARY KEY (Date, AnimalId),
    FOREIGN KEY (AnimalId) REFERENCES Animal,
    FOREIGN KEY (SIN) REFERENCES Farmer
);

INSERT INTO MealFeeding (Date, Food, Water, AnimalId, SIN) VALUES ('2018-02-20', 'Birthday Cake', 2, 1, 222222222);
INSERT INTO MealFeeding (Date, Food, Water, AnimalId, SIN) VALUES ('2018-02-21', 'Leftover Cake', 2, 1, 222222222);
INSERT INTO MealFeeding (Date, Food, Water, AnimalId, SIN) VALUES ('2018-02-22', 'Chicken food', 2, 1, 222222222);
INSERT INTO MealFeeding (Date, Food, Water, AnimalId, SIN) VALUES ('2018-02-20', 'Ice Cream Cake', 1, 3, 222222222);
INSERT INTO MealFeeding (Date, Food, Water, AnimalId, SIN) VALUES ((NOW() AT TIME ZONE 'US/Pacific')::DATE, 'Green Donuts', 1, 3, 222222222);

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

COMMIT;
