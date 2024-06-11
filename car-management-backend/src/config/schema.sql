-- Table Creation with DROP IF EXISTS for Safe Overwrite
DROP TABLE IF EXISTS dataACCOUTING;
DROP TABLE IF EXISTS dataTRANSACTION;
DROP TABLE IF EXISTS dataEMPLOYEE;
DROP TABLE IF EXISTS dataAGENCY;
DROP TABLE IF EXISTS dataCUSTOMER;
DROP TABLE IF EXISTS dataCAR; 

CREATE TABLE dataCAR (
	Model_Car_ID VARCHAR (255) PRIMARY KEY, -- Define as primary key here
	Model_Car_Name VARCHAR (255) NOT NULL, 
	Price FLOAT NOT NULL,
	Color VARCHAR (255) NOT NULL,
	Origin_Of_Car VARCHAR (255) NOT NULL,
	Date_Of_Import DATE NOT NULL,
	Car_Number_Availability INT NOT NULL, 
	Car_Sold INT NOT NULL,
	Lauching_Year INT NOT NULL
);

CREATE TABLE dataCUSTOMER  (
    Citizen_ID VARCHAR (255),
    Email VARCHAR (255) NOT NULL UNIQUE, 
    Customer_Name VARCHAR (255) NOT NULL,
    Phone_No VARCHAR (10) NOT NULL UNIQUE,
    Address VARCHAR (255) NOT NULL UNIQUE,
    Number_Transaction INT NOT NULL,
    PRIMARY KEY (Citizen_ID)
)

CREATE TABLE dataAGENCY (
	Agency_ID VARCHAR (255) PRIMARY KEY,
	Agency_Email VARCHAR (255) NOT NULL UNIQUE, 
	Agency_Brand  VARCHAR (255) NOT NULL UNIQUE,
	Phone_No VARCHAR (10) NOT NULL UNIQUE,
	Address VARCHAR (255) NOT NULL UNIQUE,
	Pass_Word VARCHAR (255) NOT NULL UNIQUE
);

CREATE TABLE dataEMPLOYEE (
	Employee_CitizenID  VARCHAR (255) PRIMARY KEY,
	Employee_Name VARCHAR (255) NOT NULL, 
	Employee_Birthday DATE NOT NULL,
	Employee_Phone_No VARCHAR (10) NOT NULL UNIQUE,
	Employee_Email VARCHAR (255) NOT NULL UNIQUE,
	Employee_Address VARCHAR (255) NOT NULL UNIQUE,
	Role_Title VARCHAR (255) NOT NULL 
);	


CREATE TABLE dataTRANSACTION (
    Transaction_ID VARCHAR (255),
    Citizen_ID VARCHAR (255) NOT NULL UNIQUE,
    Model_Car_ID VARCHAR (255) NOT NULL UNIQUE,

    Transaction_Date DATE NOT NULL,
    Payment_Date DATE NOT NULL,
    Warranty_Valid_Date DATE NOT NULL,
    Status_Of_Purchasing VARCHAR (255) NOT NULL,   --store 3 status (chưa cọc, đã cọc, đã thanh toán)

    PRIMARY KEY (Transaction_ID),
    FOREIGN KEY (Citizen_ID) REFERENCES dataCUSTOMER(Citizen_ID),
    FOREIGN KEY (Model_Car_ID) REFERENCES dataCAR(Model_Car_ID)
)
	
CREATE TABLE dataACCOUTING (
	Transaction_ID VARCHAR (255) NOT NULL REFERENCES dataTRANSACTION(Transaction_ID),
	Citizen_ID VARCHAR (255) NOT NULL REFERENCES dataCUSTOMER(Citizen_ID),
	Transaction_Price FLOAT NOT NULL,
	Deposit_Price FLOAT NOT NULL,
	CONSTRAINT PK_Accouting PRIMARY KEY (Citizen_ID, Transaction_ID)
);
