CREATE TABLE dataCAR (
	Model_Car_ID VARCHAR (255),
	Model_Car_Name VARCHAR (255) NOT NULL, 
	Price FLOAT NOT NULL,
	Color VARCHAR (255) NOT NULL,
	Origin_Of_Car VARCHAR (255) NOT NULL,
	Date_Of_Import DATE NOT NULL,
	Car_Number_Availability INT NOT NULL, 
	Car_Sold INT NOT NULL,
	PRIMARY KEY (Model_Car_ID)
)
DROP TABLE dataCAR 

CREATE TABLE dataCUSTOMER  (
	Citizen_ID VARCHAR (255),
	Email VARCHAR (255) NOT NULL UNIQUE, 
	Customer_Name VARCHAR (255) NOT NULL,
	Phone_No VARCHAR (10) NOT NULL UNIQUE,
	Address VARCHAR (255) NOT NULL UNIQUE,
	PRIMARY KEY (Citizen_ID)
)
--DROP TABLE dataCUSTOMER

CREATE TABLE dataAGENCY  (
	Agency_ID VARCHAR (255),
	Agency_Email VARCHAR (255) NOT NULL UNIQUE, 
	Agency_Brand  VARCHAR (255) NOT NULL UNIQUE,
	Phone_No VARCHAR (10) NOT NULL UNIQUE,
	Address VARCHAR (255) NOT NULL UNIQUE,
	Pass_Word VARCHAR (255) NOT NULL UNIQUE,
	PRIMARY KEY (Agency_ID)
)
--DROP TABLE dataAGENCY
	
CREATE TABLE dataTRANSACTION (
	Transaction_ID VARCHAR (255),
	Citizen_ID VARCHAR (255) NOT NULL UNIQUE,
	Model_Car_ID VARCHAR (255) NOT NULL UNIQUE,

	Transaction_Date DATE NOT NULL,
	Number_Transaction INT DEFAULT 1,
	Status_Of_Purchasing VARCHAR (255) NOT NULL,   --store 3 status 
	
	PRIMARY KEY (Transaction_ID),
	FOREIGN KEY (Citizen_ID) REFERENCES dataCUSTOMER(Citizen_ID),
	FOREIGN KEY (Model_Car_ID) REFERENCES dataCAR(Model_Car_ID)
)
--DROP TABLE dataTRANSACTION
	
CREATE TABLE dataACCOUTING (
	Transaction_ID VARCHAR (255) NOT NULL UNIQUE,
	Citizen_ID VARCHAR (255) NOT NULL UNIQUE,
	Transaction_Price FLOAT NOT NULL,
	Deposit_Price FLOAT NOT NULL,
	
	FOREIGN KEY (Citizen_ID) REFERENCES dataCUSTOMER(Citizen_ID),
	FOREIGN KEY (Transaction_ID) REFERENCES dataTRANSACTION(Transaction_ID),
	CONSTRAINT PK_Accouting PRIMARY KEY (Citizen_ID, Transaction_ID)
)
--DROP TABLE dataACCOUTING

INSERT INTO dataCAR (Model_Car_ID, Model_Car_Name, Price, Color, Origin_Of_Car, Date_Of_Import, Car_Number_Availability, Car_Sold)
VALUES 	
	('MERMAYSBL', 'Mercedes Maybach S', 999900.9, 'Black', 'Germany', '2024-06-01', 9, 1),
	('MERMAYSWH', 'Mercedes Maybach S', 999999.9, 'White', 'Germany', '2024-06-01', 8, 4),
	('MERG63GR', 'Mercedes G Wagon', 500000.98, 'Grey', 'Germany', '2024-06-01', 5, 0),
	('MERMAYGLSGR', 'Mercedes Maybach GLS', 520000.9, 'Grey', 'Germany', '2024-06-01', 9, 1),
	('MERAMGSLBL', 'Mercedes AMG SL', 400000.9, 'Black', 'Germany', '2024-06-01', 9, 1),
	('MERAMGSLNV', 'Mercedes AMG SL', 400000.9, 'Dark Navy', 'Germany', '2024-06-01', 9, 1),
	('MERAMGCBL', 'Mercedes AMG C Class', 100000.9, 'Black', 'Germany', '2024-06-01', 10, 4),
	('MERAMGCWH', 'Mercedes AMG C Class', 100000.9, 'White', 'Germany', '2024-06-01', 10, 4),
	('MEREQSBL', 'Mercedes EQS', 390000.9, 'Black', 'Germany', '2024-06-01', 10, 5),
	('MERS680BR', 'Mercedes S 680', 888880.9, 'Brown', 'Germany', '2024-06-01', 9, 1),
	('MERS680WH', 'Mercedes S 680', 888880.9, 'White', 'Germany', '2024-06-01', 9, 1),
	('MERE200WH', 'Mercedes E 200 Limited', 666600.9, 'White', 'Germany', '2024-06-01', 9, 1),
	('MERE300WH', 'Mercedes E 300', 600500.9, 'White', 'Germany', '2024-06-01', 9, 1);





















