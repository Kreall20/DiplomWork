Create Database Denistry_clinic_DB;

Use Denistry_clinic_DB;
-- �������� ������� User
CREATE TABLE [User] (
    user_id INT PRIMARY KEY IDENTITY(1,1),
    login VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
);

--�������� ������� �������
CREATE TABLE Clinic_Phone_Numbers(
	phone_number_id INT PRIMARY KEY,
	phone_number VARCHAR(20) NOT NULL
);
-- �������� ������� Administrator
CREATE TABLE Administrator (
    admin_id INT PRIMARY KEY,
    FOREIGN KEY (admin_id) REFERENCES [User](user_id)
);

-- �������� ������� Doctor
CREATE TABLE Doctor (
    doctor_id INT PRIMARY KEY,
    FOREIGN KEY (doctor_id) REFERENCES [User](user_id)
);

-- �������� ������� Patient
CREATE TABLE Patient (
    patient_id INT PRIMARY KEY,
    FOREIGN KEY (patient_id) REFERENCES [User](user_id)
);

-- �������� ������� ScheduleRecord
CREATE TABLE ScheduleRecord (
    schedule_record_id INT PRIMARY KEY IDENTITY(1,1),
    doctor_id INT,
    patient_id INT,
    appointment_date DATETIME,
    FOREIGN KEY (doctor_id) REFERENCES Doctor(doctor_id),
    FOREIGN KEY (patient_id) REFERENCES Patient(patient_id)
);

-- �������� �������� ��� ������� ScheduleRecord
CREATE INDEX idx_doctor_id ON ScheduleRecord(doctor_id);
CREATE INDEX idx_patient_id ON ScheduleRecord(patient_id);
CREATE INDEX idx_appointment_date ON ScheduleRecord(appointment_date);

-- �������� ������� MedicalBook
CREATE TABLE MedicalBook (
    medical_book_id INT PRIMARY KEY IDENTITY(1,1),
    patient_id INT,
    FOREIGN KEY (patient_id) REFERENCES Patient(patient_id)
);

-- �������� ������� MedicalRecord
CREATE TABLE MedicalRecord (
    medical_record_id INT PRIMARY KEY IDENTITY(1,1),
    medical_book_id INT,
    FOREIGN KEY (medical_book_id) REFERENCES MedicalBook(medical_book_id)
);

-- �������� ������� ��� ������� MedicalRecord
CREATE INDEX idx_medical_book_id ON MedicalRecord(medical_book_id);

-- �������� ������� Tooth
CREATE TABLE Tooth (
    tooth_id INT PRIMARY KEY IDENTITY(1,1),
    medical_record_id INT,
    tooth_number INT,
    condition VARCHAR(100),
    FOREIGN KEY (medical_record_id) REFERENCES MedicalRecord(medical_record_id)
);

-- �������� ������� ��� ������� Tooth
CREATE INDEX idx_medical_record_id ON Tooth(medical_record_id);

EXEC sp_rename 'Patient', 'Patients';

ALTER TABLE Patient
ADD first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(20) NOT NULL;

EXEC sp_rename 'Doctor', 'Doctors';

EXEC sp_rename 'User', 'Users';
EXEC sp_rename 'MedicalBook', 'MedicalBooks';
EXEC sp_rename 'ScheduleRecord', 'ScheduleRecords';

ALTER TABLE Doctors
ADD first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(20) NOT NULL;


	-- �������� �������� ����� �� ������� Patient
ALTER TABLE Patients
DROP CONSTRAINT FK_Patient_User;



CREATE TABLE UserTypes (
    type_id INT PRIMARY KEY,
    type_name VARCHAR(50) NOT NULL
);

-- �������� ����� �������������
INSERT INTO UserTypes (type_id, type_name)
VALUES
    (1, '�������������'),
    (2, '����'),
    (3, '�������');

-- ��������� ������� Users ��� ���������� ������� ���� ������������
ALTER TABLE Users
ADD user_type_id INT,
    FOREIGN KEY (user_type_id) REFERENCES UserTypes(type_id);