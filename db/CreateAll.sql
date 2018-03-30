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
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Farmer;
DROP SEQUENCE IF EXISTS PenNumber_seq;
DROP TABLE IF EXISTS Penhouse;

CREATE TABLE Penhouse(
    PenNumber INTEGER,
    Location VARCHAR(100),
    Size INTEGER,
    PRIMARY KEY (PenNumber),
    CONSTRAINT CHK_Size CHECK (Size>0)
);

CREATE SEQUENCE PenNumber_seq
    START 1
    increment 1
    CACHE 1;
ALTER TABLE PenNumber_seq OWNER TO yvttysuu;

INSERT INTO Penhouse (PenNumber, Location, Size) VALUES (nextval('PenNumber_seq'), 'Chicken Coop', 20);
INSERT INTO Penhouse (PenNumber, Location, Size) VALUES (nextval('PenNumber_seq'), 'Sheep Barn', 25);
INSERT INTO Penhouse (PenNumber, Location, Size) VALUES (nextval('PenNumber_seq'), 'Cow Barn', 30);

CREATE TABLE Farmer(
    SIN CHAR(9),
    FirstName VARCHAR(150),
    LastName VARCHAR(150),
    PRIMARY KEY (SIN),
    CONSTRAINT CHK_SIN CHECK (SIN ~ $$[0-9]{9}$$),
    CONSTRAINT CHK_FirstName CHECK (FirstName ~ $$[a-zA-Z]+$$),
    CONSTRAINT CHK_LastName CHECK (LastName ~ $$[a-zA-Z]+$$)
);

INSERT INTO Farmer (SIN, FirstName, LastName) VALUES ('111111111', 'Johnson', 'Vu');
INSERT INTO Farmer (SIN, FirstName, LastName) VALUES ('222222222', 'Justin', 'Kwan');
INSERT INTO Farmer (SIN, FirstName, LastName) VALUES ('333333333', 'Nicholas', 'Leung');
INSERT INTO Farmer (SIN, FirstName, LastName) VALUES ('444444444', 'Xingtu', 'Tao');

CREATE TABLE Users (
    userid SERIAL,
	username VARCHAR(32) UNIQUE NOT NULL,
	password TEXT NOT NULL,
	isActive BOOLEAN NOT NULL DEFAULT TRUE,
	SIN CHAR(9) NULL,
	PRIMARY KEY (userid),
	FOREIGN KEY (SIN) REFERENCES Farmer ON DELETE CASCADE
);
CREATE SEQUENCE UsersId_seq
    START 1
    increment 1
    CACHE 1;
ALTER TABLE UsersId_seq OWNER TO yvttysuu;

INSERT INTO Users (USERNAME, PASSWORD, SIN) VALUES ('jvu', '1234', '111111111');
INSERT INTO Users (USERNAME, PASSWORD, SIN) VALUES ('jkw', '1234', '222222222');
INSERT INTO Users (USERNAME, PASSWORD, SIN) VALUES ('nle', '1234', '333333333');
INSERT INTO Users (USERNAME, PASSWORD, SIN) VALUES ('xta', '1234', '444444444');

CREATE TABLE HasHealthInsurance (
    SIN CHAR(9),
    PolicyNumber INTEGER,
    StartingDate DATE,
    PRIMARY KEY (SIN, PolicyNumber),
    FOREIGN KEY (SIN) REFERENCES Farmer ON DELETE CASCADE
);

CREATE TABLE Manager(
    SIN CHAR(9),
    PRIMARY KEY (SIN),
    FOREIGN KEY (SIN) REFERENCES Farmer ON DELETE CASCADE
);

INSERT INTO Manager (SIN) VALUES (111111111);

CREATE TABLE Worker(
    SIN CHAR(9),
    Manager_SIN CHAR(9),
    PRIMARY KEY (SIN),
    FOREIGN KEY (SIN) REFERENCES Farmer ON DELETE CASCADE,
    FOREIGN KEY (Manager_SIN) REFERENCES Manager
);

INSERT INTO Worker (SIN, Manager_SIN) VALUES ('222222222', '111111111');
INSERT INTO Worker (SIN, Manager_SIN) VALUES ('333333333', '111111111');
INSERT INTO Worker (SIN, Manager_SIN) VALUES ('444444444', '111111111');

CREATE TABLE Animal(
    Id INTEGER,
    Age INTEGER,
    Weight INTEGER,
    Name VARCHAR(150),
    SIN CHAR(9),
    Species VARCHAR(150),
    PenNumber INTEGER,
    PRIMARY KEY (Id),
    FOREIGN KEY (PenNumber) REFERENCES Penhouse,
    FOREIGN KEY (SIN) REFERENCES Farmer ON DELETE SET NULL,
    CONSTRAINT CHK_Age CHECK (Age>0),
    CONSTRAINT CHK_Weight CHECK (Weight>0),
    CONSTRAINT CHK_Name CHECK (Name ~ $$[a-zA-Z]+$$),
    CONSTRAINT CHK_Species CHECK (Species ~ $$[a-zA-Z]+$$)
);

CREATE SEQUENCE AnimalId_seq
    START 1
    increment 1
    CACHE 1;
ALTER TABLE AnimalId_seq OWNER TO yvttysuu;

INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 5, 90, 'Edmond', '222222222', 'CHICKEN', 1);
INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 1, 55, 'Jeffrey', '222222222', 'CHICKEN', 1);
INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 4, 33, 'Ma', '222222222', 'CHICKEN', 1);
INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 7, 22, 'Churches', '222222222', 'CHICKEN', 1);
INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 3, 110, 'Ian', '222222222', 'SHEEP', 2);
INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 2, 33, 'Lamb', '222222222', 'SHEEP', 2);
INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 1, 43, 'Ham', '222222222', 'SHEEP', 2);
INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 3, 110, 'Joe', '222222222', 'SHEEP', 2);
INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 4, 223, 'Alan', '222222222', 'COW', 3);
INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 7, 643, 'Jerry', '222222222', 'COW', 3);
INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 12, 321, 'Tommy', '222222222', 'COW', 3);

INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 3, 110, 'Ra', '333333333', 'SHEEP', 2);
INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 2, 33, 'Ga', '333333333', 'SHEEP', 2);
INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 1, 43, 'La', '333333333', 'SHEEP', 2);
INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 3, 110, 'Jea', '333333333', 'SHEEP', 2);

INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 4, 223, 'Gregor', '444444444', 'COW', 3);
INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 7, 643, 'Optimus', '444444444', 'COW', 3);
INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 12, 321, 'Soysauce', '444444444', 'COW', 3);

INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 7, 22, 'Sushi', '111111111', 'CHICKEN', 1);
INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 3, 110, 'Pizza', '111111111', 'SHEEP', 2);
INSERT INTO Animal (Id, Age, Weight, Name, SIN, Species, PenNumber) VALUES (nextval('AnimalId_seq'), 12, 321, 'Kamakazi', '111111111', 'COW', 3);

CREATE TABLE Product(
    ProductId INTEGER,
    ProductionDate DATE,
    AnimalId INTEGER,
    SIN CHAR(9),
    PRIMARY KEY (ProductId),
    FOREIGN KEY (AnimalId) REFERENCES Animal ON DELETE SET NULL,
    FOREIGN KEY (SIN) REFERENCES Farmer ON DELETE SET NULL
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
    FOREIGN KEY (ProductId) REFERENCES Product,
    CONSTRAINT CHK_Volume CHECK (Volume>0)
);

CREATE TABLE Egg(
    ProductId INTEGER,
    Quantity INTEGER,
    Size VARCHAR(150),
    PRIMARY KEY (ProductId),
    FOREIGN KEY (ProductId) REFERENCES Product,
    CONSTRAINT CHK_Quantity CHECK (Quantity>0)
);

CREATE TABLE Wool(
    ProductId INTEGER,
    Weight INTEGER,
    Grade VARCHAR(150),
    PRIMARY KEY (ProductId),
    FOREIGN KEY (ProductId) REFERENCES Product,
    CONSTRAINT CHK_Weight CHECK (Weight>0)
);

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), '2018-02-25', 1, '222222222');
INSERT INTO Egg (ProductId, Quantity, Size) VALUES (currval('ProductId_seq'), 3, 'Large');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), '2018-02-23', 1, '222222222');
INSERT INTO Egg (ProductId, Quantity, Size) VALUES (currval('ProductId_seq'), 5, 'Medium');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), '2018-02-26', 2, '222222222');
INSERT INTO Egg (ProductId, Quantity, Size) VALUES (currval('ProductId_seq'), 7, 'Large');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), (NOW() AT TIME ZONE 'US/Pacific')::DATE, 3, '222222222');
INSERT INTO Egg (ProductId, Quantity, Size) VALUES (currval('ProductId_seq'), 3, 'Large');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), (NOW() AT TIME ZONE 'US/Pacific')::DATE, 4, '222222222');
INSERT INTO Egg (ProductId, Quantity, Size) VALUES (currval('ProductId_seq'), 2, 'X-Large');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), (NOW() AT TIME ZONE 'US/Pacific')::DATE, 5, '222222222');
INSERT INTO Wool (ProductId, Weight, Grade) VALUES (currval('ProductId_seq'), 4, 'B+');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), (NOW() AT TIME ZONE 'US/Pacific')::DATE, 6, '222222222');
INSERT INTO Wool (ProductId, Weight, Grade) VALUES (currval('ProductId_seq'), 7, 'A');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), (NOW() AT TIME ZONE 'US/Pacific')::DATE, 7, '222222222');
INSERT INTO Wool (ProductId, Weight, Grade) VALUES (currval('ProductId_seq'), 10, 'B');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), (NOW() AT TIME ZONE 'US/Pacific')::DATE, 8, '222222222');
INSERT INTO Wool (ProductId, Weight, Grade) VALUES (currval('ProductId_seq'), 2, 'A');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), (NOW() AT TIME ZONE 'US/Pacific')::DATE, 9, '222222222');
INSERT INTO Milk (ProductId, Volume, Grade) VALUES (currval('ProductId_seq'), 30, 'B');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), '2018-02-28', 10, '222222222');
INSERT INTO Milk (ProductId, Volume, Grade) VALUES (currval('ProductId_seq'), 2, 'A');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), '2018-02-23', 11, '222222222');
INSERT INTO Milk (ProductId, Volume, Grade) VALUES (currval('ProductId_seq'), 6, 'A');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), '2018-02-25', 1, '222222222');
INSERT INTO Egg (ProductId, Quantity, Size) VALUES (currval('ProductId_seq'), 5, 'Large');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), '2018-02-23', 1, '222222222');
INSERT INTO Egg (ProductId, Quantity, Size) VALUES (currval('ProductId_seq'), 7, 'Medium');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), '2018-02-26', 2, '222222222');
INSERT INTO Egg (ProductId, Quantity, Size) VALUES (currval('ProductId_seq'), 9, 'Large');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), (NOW() AT TIME ZONE 'US/Pacific')::DATE, 3, '222222222');
INSERT INTO Egg (ProductId, Quantity, Size) VALUES (currval('ProductId_seq'), 2, 'Large');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), (NOW() AT TIME ZONE 'US/Pacific')::DATE, 4, '222222222');
INSERT INTO Egg (ProductId, Quantity, Size) VALUES (currval('ProductId_seq'), 1, 'X-Large');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), (NOW() AT TIME ZONE 'US/Pacific')::DATE, 5, '222222222');
INSERT INTO Wool (ProductId, Weight, Grade) VALUES (currval('ProductId_seq'), 8, 'B+');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), (NOW() AT TIME ZONE 'US/Pacific')::DATE, 6, '222222222');
INSERT INTO Wool (ProductId, Weight, Grade) VALUES (currval('ProductId_seq'), 5, 'A');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), (NOW() AT TIME ZONE 'US/Pacific')::DATE, 7, '222222222');
INSERT INTO Wool (ProductId, Weight, Grade) VALUES (currval('ProductId_seq'), 33, 'B');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), (NOW() AT TIME ZONE 'US/Pacific')::DATE, 8, '222222222');
INSERT INTO Wool (ProductId, Weight, Grade) VALUES (currval('ProductId_seq'), 22, 'A');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), (NOW() AT TIME ZONE 'US/Pacific')::DATE, 9, '222222222');
INSERT INTO Milk (ProductId, Volume, Grade) VALUES (currval('ProductId_seq'), 31, 'B');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), '2018-02-28', 10, '222222222');
INSERT INTO Milk (ProductId, Volume, Grade) VALUES (currval('ProductId_seq'), 7, 'A');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), '2018-02-23', 11, '222222222');
INSERT INTO Milk (ProductId, Volume, Grade) VALUES (currval('ProductId_seq'), 9, 'A');


INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), (NOW() AT TIME ZONE 'US/Pacific')::DATE, 12, '333333333');
INSERT INTO Wool (ProductId, Weight, Grade) VALUES (currval('ProductId_seq'), 4, 'B+');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), (NOW() AT TIME ZONE 'US/Pacific')::DATE, 13, '333333333');
INSERT INTO Wool (ProductId, Weight, Grade) VALUES (currval('ProductId_seq'), 10, 'A');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), (NOW() AT TIME ZONE 'US/Pacific')::DATE, 14, '333333333');
INSERT INTO Wool (ProductId, Weight, Grade) VALUES (currval('ProductId_seq'), 13, 'B');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), (NOW() AT TIME ZONE 'US/Pacific')::DATE, 15, '333333333');
INSERT INTO Wool (ProductId, Weight, Grade) VALUES (currval('ProductId_seq'), 7, 'A');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), (NOW() AT TIME ZONE 'US/Pacific')::DATE, 12, '333333333');
INSERT INTO Wool (ProductId, Weight, Grade) VALUES (currval('ProductId_seq'), 3, 'B+');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), (NOW() AT TIME ZONE 'US/Pacific')::DATE, 13, '333333333');
INSERT INTO Wool (ProductId, Weight, Grade) VALUES (currval('ProductId_seq'), 1, 'A');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), (NOW() AT TIME ZONE 'US/Pacific')::DATE, 14, '333333333');
INSERT INTO Wool (ProductId, Weight, Grade) VALUES (currval('ProductId_seq'), 11, 'B');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), (NOW() AT TIME ZONE 'US/Pacific')::DATE, 15, '333333333');
INSERT INTO Wool (ProductId, Weight, Grade) VALUES (currval('ProductId_seq'), 3, 'A');


INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), (NOW() AT TIME ZONE 'US/Pacific')::DATE, 16, '444444444');
INSERT INTO Milk (ProductId, Volume, Grade) VALUES (currval('ProductId_seq'), 30, 'B');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), '2018-02-28', 17, '444444444');
INSERT INTO Milk (ProductId, Volume, Grade) VALUES (currval('ProductId_seq'), 2, 'A');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), '2018-02-23', 18, '444444444');
INSERT INTO Milk (ProductId, Volume, Grade) VALUES (currval('ProductId_seq'), 6, 'A');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), (NOW() AT TIME ZONE 'US/Pacific')::DATE, 16, '444444444');
INSERT INTO Milk (ProductId, Volume, Grade) VALUES (currval('ProductId_seq'), 21, 'B');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), '2018-02-28', 17, '444444444');
INSERT INTO Milk (ProductId, Volume, Grade) VALUES (currval('ProductId_seq'), 3, 'A');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), '2018-02-23', 18, '444444444');
INSERT INTO Milk (ProductId, Volume, Grade) VALUES (currval('ProductId_seq'), 2, 'A');


INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), (NOW() AT TIME ZONE 'US/Pacific')::DATE, 19, '111111111');
INSERT INTO Egg (ProductId, Quantity, Size) VALUES (currval('ProductId_seq'), 21, 'X-Large');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), (NOW() AT TIME ZONE 'US/Pacific')::DATE, 20, '111111111');
INSERT INTO Wool (ProductId, Weight, Grade) VALUES (currval('ProductId_seq'), 4, 'B');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), (NOW() AT TIME ZONE 'US/Pacific')::DATE, 21, '111111111');
INSERT INTO Milk (ProductId, Volume, Grade) VALUES (currval('ProductId_seq'), 20, 'B');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), (NOW() AT TIME ZONE 'US/Pacific')::DATE, 19, '111111111');
INSERT INTO Egg (ProductId, Quantity, Size) VALUES (currval('ProductId_seq'), 11, 'X-Large');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), (NOW() AT TIME ZONE 'US/Pacific')::DATE, 20, '111111111');
INSERT INTO Wool (ProductId, Weight, Grade) VALUES (currval('ProductId_seq'), 6, 'B');

INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval('ProductId_seq'), (NOW() AT TIME ZONE 'US/Pacific')::DATE, 21, '111111111');
INSERT INTO Milk (ProductId, Volume, Grade) VALUES (currval('ProductId_seq'), 12, 'B');


CREATE TABLE MealFeeding(
    Date DATE,
    Food VARCHAR(150),
    Water INTEGER,
    AnimalId INTEGER,
    SIN CHAR(9),
    PRIMARY KEY (Date, AnimalId),
    FOREIGN KEY (AnimalId) REFERENCES Animal,
    FOREIGN KEY (SIN) REFERENCES Farmer ON DELETE SET NULL,
    CONSTRAINT CHK_Water CHECK (Water>0)
);

INSERT INTO MealFeeding (Date, Food, Water, AnimalId, SIN) VALUES ('2018-02-20', 'Birthday Cake', 2, 1, 222222222);
INSERT INTO MealFeeding (Date, Food, Water, AnimalId, SIN) VALUES ('2018-02-21', 'Leftover Cake', 2, 1, 222222222);
INSERT INTO MealFeeding (Date, Food, Water, AnimalId, SIN) VALUES ('2018-02-22', 'Chicken food', 2, 1, 222222222);
INSERT INTO MealFeeding (Date, Food, Water, AnimalId, SIN) VALUES ('2018-02-20', 'Ice Cream Cake', 1, 3, 222222222);
INSERT INTO MealFeeding (Date, Food, Water, AnimalId, SIN) VALUES ((NOW() AT TIME ZONE 'US/Pacific')::DATE, 'Green Donuts', 1, 3, 222222222);

CREATE TABLE Harvests(
    Id INTEGER,
    SIN CHAR(9),
    ProductId INTEGER,
    Date TIMESTAMP WITHOUT TIME ZONE,
    Duration INTEGER,
    PRIMARY KEY (Id, ProductId),
    FOREIGN KEY (Id) REFERENCES Animal ON DELETE SET NULL,
    FOREIGN KEY (ProductId) REFERENCES Product,
    CONSTRAINT CHK_Duration CHECK (Duration>0)
);

CREATE TABLE CowProduces(
    ProductId INTEGER,
    Id INTEGER,
    PRIMARY KEY (ProductId),
    FOREIGN KEY (Id) REFERENCES Animal ON DELETE SET NULL,
    FOREIGN KEY (ProductId) REFERENCES Product
);

CREATE TABLE ChickenProduces(
    ProductId INTEGER,
    Id INTEGER,
    PRIMARY KEY (ProductId),
    FOREIGN KEY (Id) REFERENCES Animal ON DELETE SET NULL,
    FOREIGN KEY (ProductId) REFERENCES Product
);

CREATE TABLE SheepProduces(
    ProductId INTEGER,
    Id INTEGER,
    PRIMARY KEY (ProductId),
    FOREIGN KEY (Id) REFERENCES Animal ON DELETE SET NULL,
    FOREIGN KEY (ProductId) REFERENCES Product
);

CREATE TABLE AnimalMaintenance(
    SIN CHAR(9),
    Id INTEGER,
    PRIMARY KEY (Id),
    FOREIGN KEY (SIN) REFERENCES Farmer ON DELETE SET NULL
);

CREATE TABLE ExpirationLookup(
    ProductionTime TIME,
    ExpiryDate TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY (ProductionTime)
);

COMMIT;
