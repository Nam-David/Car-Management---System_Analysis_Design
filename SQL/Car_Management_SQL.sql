DROP TABLE dataACCOUTING;
DROP TABLE  dataTRANSACTION;
DROP TABLE  dataEMPLOYEE;
DROP TABLE  dataAGENCY;
DROP TABLE dataCUSTOMER;
DROP TABLE  dataCAR; 

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

CREATE TABLE dataCUSTOMER  (
	Citizen_ID VARCHAR (255),
	Email VARCHAR (255) NOT NULL UNIQUE, 
	Customer_Name VARCHAR (255) NOT NULL,
	Phone_No VARCHAR (10) NOT NULL UNIQUE,
	Address VARCHAR (255) NOT NULL UNIQUE,
	Number_Transaction INT NOT NULL,
	PRIMARY KEY (Citizen_ID)
);

CREATE TABLE dataAGENCY  (
	Agency_ID VARCHAR (255),
	Agency_Email VARCHAR (255) NOT NULL UNIQUE, 
	Agency_Brand  VARCHAR (255) NOT NULL UNIQUE,
	Phone_No VARCHAR (10) NOT NULL UNIQUE,
	Address VARCHAR (255) NOT NULL UNIQUE,
	Pass_Word VARCHAR (255) NOT NULL,
	PRIMARY KEY (Agency_ID)
);

CREATE TABLE dataEMPLOYEE  (
	Employee_CitizenID  VARCHAR (255),
	Employee_Name VARCHAR (255) NOT NULL, 
	Employee_Birthday DATE NOT NULL,
	Employee_Phone_No VARCHAR (10) NOT NULL UNIQUE,
	Employee_Email VARCHAR (255) NOT NULL UNIQUE,
	Employee_Address VARCHAR (255) NOT NULL UNIQUE,
	Role_Title VARCHAR (255) NOT NULL,   -- chức danh 
	PRIMARY KEY (Employee_CitizenID)
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
);
	
CREATE TABLE dataACCOUTING (
	Transaction_ID VARCHAR (255) NOT NULL UNIQUE,
	Citizen_ID VARCHAR (255) NOT NULL UNIQUE,
	Transaction_Price FLOAT NOT NULL,
	Deposit_Price FLOAT NOT NULL,
	
	FOREIGN KEY (Citizen_ID) REFERENCES dataCUSTOMER(Citizen_ID),
	FOREIGN KEY (Transaction_ID) REFERENCES dataTRANSACTION(Transaction_ID),
	CONSTRAINT PK_Accouting PRIMARY KEY (Citizen_ID, Transaction_ID)
);


INSERT INTO dataAGENCY (Agency_ID, Agency_Email, Agency_Brand, Phone_No, Address, Pass_word)
VALUES (
    'AGENCY9',
    'anotheragency@example.com',
    'Vinfast .LTD',
    '0123456789',
    '123 Ho Chi Minh City, Vietnam',
    '123456789'  
);
	
INSERT INTO dataCAR (Model_Car_ID, Model_Car_Name, Price, Color, Origin_Of_Car, Date_Of_Import, Car_Number_Availability, Car_Sold, Lauching_Year)
VALUES 	
	('VINVFWG', 'VF Wild', 50000.00, 'Grey', 'Vietnam', '2024-06-01', 8, 5, 2024),
	('VINVF8BL', 'VF 8', 47200.00, 'Black', 'Vietnam', '2024-06-01', 8, 3, 2023),
	('VINVF8WH', 'VF 8', 47200.00, 'White', 'Vietnam', '2024-06-01', 9, 7, 2023),
	('VINVF8B', 'VF 8', 47200.00, 'Blue', 'Vietnam', '2024-06-01', 9, 4, 2023),
	('VINVF9CR', 'VF 9', 81000.00, 'Crimson Red', 'Vietnam', '2024-06-01', 10, 10, 2023),
	('VINVF9BL', 'VF 9', 81000.00, 'Black', 'Vietnam', '2024-06-01', 10, 8, 2023),
	('VINVF9SL', 'VF 9', 81000.00, 'Silver', 'Vietnam', '2024-06-01', 9, 12, 2023),
	('VINVF5B', 'VF 5', 30000.00, 'Blue', 'Vietnam', '2024-07-01', 8, 12, 2023),
	('VINVF6G', 'VF 6', 35000.00, 'Green', 'Vietnam', '2024-08-01', 8, 8, 2023),
	('VINVF7R', 'VF 7', 37000.00, 'Red', 'Vietnam', '2024-09-01', 9, 6, 2023),
	('VINVF7BL', 'VF 7', 37000.00, 'Black', 'Vietnam', '2024-09-01', 9, 8, 2023),
	('VINVF7B', 'VF 7', 37000.00, 'Blue', 'Vietnam', '2024-09-01', 9, 8, 2023),
	('VINVF3B', 'VF 3', 16000.00, 'Blue', 'Vietnam', '2024-10-01', 7, 20, 2023),
	('VINVF3YL', 'VF 3', 16000.00, 'Yello', 'Vietnam', '2024-10-01', 7, 20, 2023),
	('VINVF3PK', 'VF 3', 16000.00, 'Pink', 'Vietnam', '2024-10-01', 7, 20, 2023),
	('VINE34WH', 'VF e34', 26000.00, 'White', 'Vietnam', '2024-05-01', 8, 15, 2023),
	('VINE34B', 'VF e34', 26000.00, 'Black', 'Vietnam', '2024-05-01', 9, 10, 2023);
