-- Drop Existing Tables
-- DROP TABLE IF EXISTS dataACCOUTING;
-- DROP TABLE IF EXISTS dataTRANSACTION;
-- DROP TABLE IF EXISTS dataEMPLOYEE;
-- DROP TABLE IF EXISTS dataAGENCY;
-- DROP TABLE IF EXISTS dataCUSTOMER;
-- DROP TABLE IF EXISTS dataCAR;

-- Create dataCAR table
CREATE TABLE dataCAR (
	Model_Car_ID VARCHAR (255),
	Model_Car_Name VARCHAR (255) NOT NULL, 
	Price FLOAT NOT NULL,
	Color VARCHAR (255) NOT NULL,
	Origin_Of_Car VARCHAR (255) NOT NULL,
	Date_Of_Import DATE NOT NULL,
	Car_Number_Availability INT NOT NULL, 
	Car_Sold INT NOT NULL,
	Lauching_Year INT NOT NULL,
	PRIMARY KEY (Model_Car_ID)
);

-- Create dataCUSTOMER table
CREATE TABLE dataCUSTOMER  (
	Citizen_ID VARCHAR (255),				-- có vấn đề - pros add number transaction | cons: 2 custommer nhap cung id, nhung khac ten --> conflict 
	Email VARCHAR (255) NOT NULL UNIQUE, 
	Customer_Name VARCHAR (255) NOT NULL,
	Phone_No VARCHAR (10) NOT NULL UNIQUE,
	Address VARCHAR (255) NOT NULL UNIQUE,
	Number_Transaction INT NOT NULL,
	PRIMARY KEY (Citizen_ID)
);
-- DELETE FROM users WHERE citizen_id = '0123456';
-- DELETE FROM dataCUSTOMER WHERE Citizen_ID = '0123456';

-- Create dataAGENCY table
CREATE TABLE dataAGENCY  (
	Agency_ID VARCHAR (255),
	Agency_Email VARCHAR (255) NOT NULL UNIQUE, 
	Agency_Brand  VARCHAR (255) NOT NULL UNIQUE,
	Phone_No VARCHAR (10) NOT NULL UNIQUE,
	Address VARCHAR (255) NOT NULL UNIQUE,
	Pass_Word VARCHAR (255) NOT NULL,
	PRIMARY KEY (Agency_ID)
);

-- Create dataEMPLOYEE table
CREATE TABLE dataEMPLOYEE  (
	Employee_CitizenID  VARCHAR (255),
	Employee_Name VARCHAR (255) NOT NULL, 
	Employee_Birthday DATE NOT NULL,
	Employee_Phone_No VARCHAR (10) NOT NULL UNIQUE,
	Employee_Email VARCHAR (255) NOT NULL UNIQUE,
	Employee_Address VARCHAR (255) NOT NULL UNIQUE,
	Role_Title VARCHAR (255) NOT NULL,   
	PRIMARY KEY (Employee_CitizenID)
);

-- Create dataTRANSACTION table
CREATE TABLE dataTRANSACTION (
    Transaction_ID VARCHAR (255) PRIMARY KEY, 
    Citizen_ID VARCHAR (255) NOT NULL, --remove Unique,customers can buy multiple
    Model_Car_ID VARCHAR (255) NOT NULL,
    Transaction_Date DATE NOT NULL,
    Payment_Date DATE NOT NULL,
    Warranty_Valid_Date DATE NOT NULL,
    Status_Of_Purchasing VARCHAR (255) NOT NULL, --deposited, paid, canceled
    FOREIGN KEY (Citizen_ID) REFERENCES dataCUSTOMER(Citizen_ID),
    FOREIGN KEY (Model_Car_ID) REFERENCES dataCAR(Model_Car_ID)
);

-- Create dataACCOUTING table
CREATE TABLE dataACCOUTING (
	Transaction_ID VARCHAR (255) NOT NULL UNIQUE,
	Citizen_ID VARCHAR (255) NOT NULL UNIQUE,
	Transaction_Price FLOAT NOT NULL,
	Deposit_Price FLOAT NOT NULL,
	
	FOREIGN KEY (Citizen_ID) REFERENCES dataCUSTOMER(Citizen_ID),
	FOREIGN KEY (Transaction_ID) REFERENCES dataTRANSACTION(Transaction_ID),
	CONSTRAINT PK_Accouting PRIMARY KEY (Citizen_ID, Transaction_ID)
);

-- DELETE FROM dataCUSTOMER;
-- TRUNCATE TABLE dataCUSTOMER;