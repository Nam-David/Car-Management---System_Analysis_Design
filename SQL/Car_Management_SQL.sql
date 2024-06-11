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
)
--DROP TABLE dataCAR 

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

CREATE TABLE dataEMPLOYEE  (
	Employee_CitizenID  VARCHAR (255),
	Employee_Name VARCHAR (255) NOT NULL, 
	Employee_Birthday DATE NOT NULL,
	Employee_Phone_No VARCHAR (10) NOT NULL UNIQUE,
	Employee_Email VARCHAR (255) NOT NULL UNIQUE,
	Employee_Address VARCHAR (255) NOT NULL UNIQUE,
	Role_Title VARCHAR (255) NOT NULL,   -- chức danh 
	PRIMARY KEY (Employee_CitizenID)
)

	
CREATE TABLE dataTRANSACTION (
	Transaction_ID VARCHAR (255),
	Citizen_ID VARCHAR (255) NOT NULL UNIQUE,
	Model_Car_ID VARCHAR (255) NOT NULL UNIQUE,

	Transaction_Date DATE NOT NULL,
	Number_Transaction INT DEFAULT 1,
	Status_Of_Purchasing VARCHAR (255) NOT NULL,   --store 3 status (chưa cọc, đã cọc, đã thanh toán)
	
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
	('VINVFWSG', 'VF Wild (Special)', 10000.00, 'Grey', 'Vietnam', '2024-06-01', 0, 0, 2025),
	('VINVFWG', 'VF Wild', 10000.00, 'Grey', 'Vietnam', '2024-06-01', 8, 5, 2024),
	('VINVF8ECR', 'VF 8 Eco', 1200000.00, 'Crimson Red', 'Vietnam', '2024-06-01', 8, 5, 2023),
	('VINVF8EBL', 'VF 8 Eco', 1200000.00, 'Black', 'Vietnam', '2024-06-01', 8, 3, 2023),
	('VINVF8PLSWH', 'VF 8 Plus', 140000.00, 'White', 'Vietnam', '2024-06-01', 9, 7, 2023),
	('VINVF8PLSCR', 'VF 8 Plus', 1400000.00, 'Crimson Red', 'Vietnam', '2024-06-01', 9, 4, 2023),
	('VINVF9ECR', 'VF 9 Eco', 1500000.00, 'Crimson Red', 'Vietnam', '2024-06-01', 10, 10, 2023),
	('VINVF9EBL', 'VF 9 Eco', 1500000.00, 'Black', 'Vietnam', '2024-06-01', 10, 8, 2023),
	('VINVF9PLSWH', 'VF 9 Plus', 1700000.00, 'White', 'Vietnam', '2024-06-01', 9, 12, 2023),
	('VINVF9PLSCR', 'VF 9 Plus', 1700000.00, 'Crimson Red', 'Vietnam', '2024-06-01', 9, 9, 2023),
	('VINVF5ECOB', 'VF 5 Eco', 9000000.00, 'Blue', 'Vietnam', '2024-07-01', 8, 12, 2023),
	('VINVF5PLUSB', 'VF 5 Plus', 1100000.00, 'Blue', 'Vietnam', '2024-07-01', 9, 15, 2023),
	('VINVF6ECOG', 'VF 6 Eco', 1050000.00, 'Green', 'Vietnam', '2024-08-01', 8, 8, 2023),
	('VINVF6PLUSG', 'VF 6 Plus', 1250000.00, 'Green', 'Vietnam', '2024-08-01', 9, 11, 2023),
	('VINVF7ECOP', 'VF 7 Eco', 1350000.00, 'Purple', 'Vietnam', '2024-09-01', 9, 6, 2023),
	('VINVF7PLUSP', 'VF 7 Plus', 1550000.00, 'Purple', 'Vietnam', '2024-09-01', 9, 8, 2023),
	('VINVF3STDO', 'VF 3', 800000.00, 'Orange', 'Vietnam', '2024-10-01', 7, 20, 2023),
	('VINE34STDW', 'VF e34 Standard', 650000.00, 'White', 'Vietnam', '2024-05-01', 8, 15, 2023),
	('VINE34PLUG', 'VF e34 Plus', 720000.00, 'Grey', 'Vietnam', '2024-05-01', 9, 10, 2023);
