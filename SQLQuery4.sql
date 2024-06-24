--Все записи
CREATE OR ALTER PROCEDURE GetAllScheduleRecords
AS
BEGIN
    SELECT 
        SR.schedule_record_id,
		SR.doctor_id,
		SR.patient_id,
		SR.is_completed,
		SR.appointment_date AS appointment_date,
        P.first_name + ' ' + P.last_name AS PatientName,
        D.first_name + ' ' + D.last_name AS DoctorName
		FROM 
        ScheduleRecords AS SR
    INNER JOIN 
        Patients AS P ON P.patient_id = SR.patient_id
    INNER JOIN 
        Doctors AS D ON D.doctor_id = SR.doctor_id;
END;


GO
--Все записи
CREATE OR ALTER PROCEDURE GetAllScheduleRecordsToday
AS
DECLARE @Today DATE = CAST(GETDATE() AS DATE);
BEGIN
    SELECT 
        SR.schedule_record_id,
		SR.doctor_id,
		SR.patient_id,
		SR.is_completed,
		SR.appointment_date AS appointment_date,
        P.first_name + ' ' + P.last_name AS PatientName,
        D.first_name + ' ' + D.last_name AS DoctorName
		FROM 
        ScheduleRecords AS SR
    INNER JOIN 
        Patients AS P ON P.patient_id = SR.patient_id
    INNER JOIN 
        Doctors AS D ON D.doctor_id = SR.doctor_id
	WHERE CAST(SR.appointment_date AS DATE) = @Today;
END;

GO
CREATE OR ALTER PROCEDURE GetScheduleRecords
    @AppointmentDate DATETIME = NULL,
    @PatientFirstName NVARCHAR(50) = NULL,
    @DoctorFirstName NVARCHAR(50) = NULL,
    @OrderByField NVARCHAR(50) = 'appointment_date',
    @OrderDirection NVARCHAR(4) = 'ASC'
AS
BEGIN
    DECLARE @sql NVARCHAR(MAX);
    DECLARE @params NVARCHAR(MAX);

    SET @sql = N'
    SELECT SR.appointment_date, 
           P.first_name + '' '' + P.last_name AS PatientName, 
           D.first_name + '' '' + D.last_name AS DoctorName
    FROM ScheduleRecords AS SR
    INNER JOIN Patients AS P ON P.patient_id = SR.patient_id
    INNER JOIN Doctors AS D ON D.doctor_id = SR.doctor_id
    WHERE (1=1) ';

    IF @AppointmentDate IS NOT NULL
        SET @sql = @sql + N' AND SR.appointment_date = @AppointmentDate ';

    IF @PatientFirstName IS NOT NULL
        SET @sql = @sql + N' AND (P.first_name LIKE ''%'' + @PatientFirstName + ''%'' OR P.last_name LIKE ''%'' + @PatientFirstName + ''%'') ';

    IF @DoctorFirstName IS NOT NULL
        SET @sql = @sql + N' AND (D.first_name LIKE ''%'' + @DoctorFirstName + ''%'' OR D.last_name LIKE ''%'' + @DoctorFirstName + ''%'') ';

    SET @sql = @sql + N' ORDER BY ' + QUOTENAME(@OrderByField) + N' ' + @OrderDirection;

    SET @params = N'@AppointmentDate DATETIME, @PatientFirstName NVARCHAR(50), @DoctorFirstName NVARCHAR(50)';

    EXEC sp_executesql @sql, @params, @AppointmentDate=@AppointmentDate, @PatientFirstName=@PatientFirstName, @DoctorFirstName=@DoctorFirstName;
END;

TRUNCATE TABLE Patients;

--Записи врача
GO
CREATE OR ALTER PROCEDURE GetScheduleRecordsByDoctorId @DoctorId INT
AS
BEGIN
    SELECT SR.appointment_date,P.first_name+P.last_name,D.first_name+D.last_name
	FROM ScheduleRecords AS SR
	INNER JOIN Patients AS P ON P.patient_id = SR.patient_id
	INNER JOIN Doctors AS D ON D.doctor_id = SR.doctor_id
	WHERE D.doctor_id = @DoctorId;
END;
--Врачи
GO
CREATE OR ALTER PROCEDURE GetAllDoctors
AS
BEGIN
    SELECT * 
	FROM Doctors;
END;
--Врач
GO
CREATE OR ALTER PROCEDURE GetDoctorbyId @DoctorId INT
AS
BEGIN
    SELECT d.last_name, d.first_name, d.phone_number, asp.UserName,d.user_Id,d.doctor_id
    FROM Doctors d
    INNER JOIN AspNetUsers asp ON asp.Id = d.user_Id
    WHERE d.doctor_id = @DoctorId;
END;


GO
CREATE OR ALTER PROCEDURE GetDoctorbyName @DoctorName NVARCHAR(50)
AS
BEGIN
    SELECT * 
	FROM Doctors AS D
	WHERE D.first_name LIKE @DoctorName + '%' OR D.last_name LIKE @DoctorName + '%';
END;

--Пациент
GO
CREATE OR ALTER PROCEDURE GetPatientbyId @PatientId INT
AS
BEGIN
    SELECT * 
	FROM Patients
	WHERE patient_id = @PatientId;
END;

GO
CREATE OR ALTER PROCEDURE GetPatientbyName @PatientName NVARCHAR(50)
AS
BEGIN
    SELECT * 
	FROM Patients AS P
	WHERE P.first_name LIKE '%' + @PatientName + '%' OR P.last_name LIKE '%' + @PatientName + '%';
END;

--Пациенты
GO
CREATE OR ALTER PROCEDURE GetAllPatients
AS
BEGIN
    SELECT * 
	FROM Patients;
END;


GO

CREATE OR ALTER PROCEDURE GetAllMedicalRecordsById 
    @PatientId INT
AS
BEGIN
    SELECT T.tooth_number, T.DescriptionTooth
    FROM Tooth AS T
    INNER JOIN MedicalRecord AS MR ON MR.medical_record_id = T.medical_record_id
    INNER JOIN MedicalBooks AS MB ON MB.medical_book_id = MR.medical_book_id
    WHERE MB.patient_id = @PatientId;
END;
GO
CREATE OR ALTER PROCEDURE GetMedicalRecordsByPatientIdAndToothNum
    @PatientId INT,
    @ToothNum INT
AS
BEGIN
    SELECT T.DescriptionTooth, MR.date, MR.medical_record_id
    FROM Tooth AS T
    INNER JOIN MedicalRecord AS MR ON MR.medical_record_id = T.medical_record_id
    INNER JOIN MedicalBooks AS MB ON MB.medical_book_id = MR.medical_book_id
    WHERE MB.patient_id = @PatientId
      AND T.tooth_number = @ToothNum;
END;


GO
CREATE PROCEDURE GetPatientsWithMedicalBooks
AS
BEGIN
    SELECT p.patient_id, mb.medical_book_id, p.first_name, p.last_name
    FROM Patients p
    INNER JOIN MedicalBooks mb ON p.patient_Id = mb.patient_Id;
END;

GO
CREATE PROCEDURE GetPatientsWithMedicalBooksSearch
@PatientName NVARCHAR(50)
AS
BEGIN
    SELECT p.patient_id, mb.medical_book_id, p.first_name, p.last_name
    FROM Patients p
    INNER JOIN MedicalBooks mb ON p.patient_Id = mb.patient_Id
	WHERE P.first_name LIKE '%' + @PatientName + '%' OR P.last_name LIKE '%' + @PatientName + '%';
END;

GO
CREATE OR ALTER PROCEDURE GetPatientsWithoutMedicalBooks
AS
BEGIN
    SELECT p.patient_id, p.first_name, p.last_name,p.phone_number
    FROM Patients p
    LEFT JOIN MedicalBooks mb ON p.patient_Id = mb.patient_Id
    WHERE mb.medical_book_id IS NULL; -- Выбираем только тех пациентов, у которых нет медицинских карточек
END;

GO
CREATE OR ALTER PROCEDURE GetPatientsWithoutMedicalBooksSearch
@PatientName NVARCHAR(50)
AS
BEGIN
    SELECT p.patient_id, p.first_name, p.last_name,p.phone_number
    FROM Patients p
    LEFT JOIN MedicalBooks mb ON p.patient_Id = mb.patient_Id
    WHERE mb.medical_book_id IS NULL AND P.first_name LIKE '%' + @PatientName + '%' OR P.last_name LIKE '%' + @PatientName + '%';
END;

GO
CREATE PROCEDURE GetAllMedicalRecordsByName 
    @PatientName NVARCHAR(50)
AS
BEGIN
    SELECT T.tooth_number, T.DescriptionTooth
    FROM Tooth AS T
    INNER JOIN MedicalRecord AS MR ON MR.medical_record_id = T.medical_record_id
    INNER JOIN MedicalBooks AS MB ON MB.medical_book_id = MR.medical_book_id
    INNER JOIN Patients AS P ON P.patient_id = MB.patient_id
    WHERE P.first_name LIKE '%' + @PatientName + '%' OR P.last_name LIKE '%' + @PatientName + '%';
END;
GO


GO
CREATE OR ALTER PROCEDURE AddPatient
    @FirstName NVARCHAR(50),
    @LastName NVARCHAR(50),
    @PhoneNumber NVARCHAR(20),
    @PatientId INT OUTPUT
AS
BEGIN
    INSERT INTO Patients (first_name, last_name, phone_number)
    VALUES (@FirstName, @LastName, @PhoneNumber);

    SET @PatientId = SCOPE_IDENTITY();
END;

GO
CREATE OR ALTER PROCEDURE AddScheduleRecord
    @AppointmentDate DATETIME,
    @PatientId INT,
    @DoctorId INT,
	@is_complited BIT
AS
BEGIN
    -- Добавляем новую запись в таблицу ScheduleRecords
    INSERT INTO ScheduleRecords (appointment_date, patient_id, doctor_id,is_completed)
    VALUES (@AppointmentDate, @PatientId, @DoctorId,@is_complited);
END;
GO

GO
CREATE OR ALTER PROCEDURE GetAllPastScheduleRecords
AS
BEGIN
    SELECT SR.appointment_date,P.first_name+P.last_name,D.first_name+D.last_name,PSR.PaymentAmount
	FROM PastScheduleRecords AS PSR
	INNER JOIN ScheduleRecords AS SR ON SR.schedule_record_id = PSR.schedule_record_id
	INNER JOIN Patients AS P ON P.patient_id = SR.patient_id
	INNER JOIN Doctors AS D ON D.doctor_id = SR.doctor_id
END;

GO
CREATE PROCEDURE GetAllPastScheduleRecordsToday
AS
DECLARE @Today DATE = CAST(GETDATE() AS DATE);
BEGIN
    SELECT SR.appointment_date,P.first_name+P.last_name,D.first_name+D.last_name,PSR.PaymentAmount
	FROM PastScheduleRecords AS PSR
	INNER JOIN ScheduleRecords AS SR ON SR.schedule_record_id = PSR.schedule_record_id
	INNER JOIN Patients AS P ON P.patient_id = SR.patient_id
	INNER JOIN Doctors AS D ON D.doctor_id = SR.doctor_id
	WHERE CAST(SR.appointment_date AS DATE) = @Today;
END;

GO
CREATE OR ALTER PROCEDURE GetPastScheduleRecords
    @AppointmentDate DATETIME = NULL,
    @PatientFirstName NVARCHAR(50) = NULL,
    @DoctorFirstName NVARCHAR(50) = NULL,
    @OrderByField NVARCHAR(50) = 'appointment_date',
    @OrderDirection NVARCHAR(4) = 'ASC'
AS
BEGIN
    DECLARE @sql NVARCHAR(MAX);
    DECLARE @params NVARCHAR(MAX);

    SET @sql = N'
    SELECT SR.appointment_date, 
           P.first_name + '' '' + P.last_name AS PatientName, 
           D.first_name + '' '' + D.last_name AS DoctorName,
           PSR.PaymentAmount
    FROM PastScheduleRecords AS PSR
    INNER JOIN ScheduleRecords AS SR ON SR.schedule_record_id = PSR.schedule_record_id
    INNER JOIN Patients AS P ON P.patient_id = SR.patient_id
    INNER JOIN Doctors AS D ON D.doctor_id = SR.doctor_id
    WHERE (1=1) ';

    IF @AppointmentDate IS NOT NULL
        SET @sql = @sql + N' AND CAST(SR.appointment_date AS DATE) = CAST(@AppointmentDate AS DATE) ';

    IF @PatientFirstName IS NOT NULL
        SET @sql = @sql + N' AND (P.first_name LIKE ''%'' + @PatientFirstName + ''%'' OR P.last_name LIKE ''%'' + @PatientFirstName + ''%'') ';

    IF @DoctorFirstName IS NOT NULL
        SET @sql = @sql + N' AND (D.first_name LIKE ''%'' + @DoctorFirstName + ''%'' OR D.last_name LIKE ''%'' + @DoctorFirstName + ''%'') ';

    SET @sql = @sql + N' ORDER BY ' + QUOTENAME(@OrderByField) + N' ' + @OrderDirection;

    SET @params = N'@AppointmentDate DATETIME, @PatientFirstName NVARCHAR(50), @DoctorFirstName NVARCHAR(50)';

    EXEC sp_executesql @sql, @params, @AppointmentDate=@AppointmentDate, @PatientFirstName=@PatientFirstName, @DoctorFirstName=@DoctorFirstName;
END;
GO

CREATE OR ALTER PROCEDURE GetPastScheduleRecordsByDateRange
    @StartDate DATE = NULL,
    @EndDate DATE = NULL,
    @TotalPaymentAmount DECIMAL(18, 2) OUTPUT
AS
BEGIN
    IF @EndDate IS NULL
    BEGIN
        DECLARE @Date DATE = CAST(GETDATE() AS DATE);
        SELECT @TotalPaymentAmount = SUM(PSR.PaymentAmount)
        FROM PastScheduleRecords AS PSR
        INNER JOIN ScheduleRecords AS SR ON SR.schedule_record_id = PSR.schedule_record_id
        WHERE CAST(SR.appointment_date AS DATE) = @Date;
        
        SELECT SR.appointment_date, P.first_name + ' ' + P.last_name AS PatientName, D.first_name + ' ' + D.last_name AS DoctorName, PSR.PaymentAmount
        FROM PastScheduleRecords AS PSR
        INNER JOIN ScheduleRecords AS SR ON SR.schedule_record_id = PSR.schedule_record_id
        INNER JOIN Patients AS P ON P.patient_id = SR.patient_id
        INNER JOIN Doctors AS D ON D.doctor_id = SR.doctor_id
        WHERE CAST(SR.appointment_date AS DATE) = @Date;
    END
    ELSE
    BEGIN
        SELECT @TotalPaymentAmount = SUM(PSR.PaymentAmount)
        FROM PastScheduleRecords AS PSR
        INNER JOIN ScheduleRecords AS SR ON SR.schedule_record_id = PSR.schedule_record_id
        WHERE (@StartDate IS NULL OR CAST(SR.appointment_date AS DATE) >= @StartDate)
          AND (@EndDate IS NULL OR CAST(SR.appointment_date AS DATE) <= @EndDate);

        SELECT SR.appointment_date, P.first_name + ' ' + P.last_name AS PatientName, D.first_name + ' ' + D.last_name AS DoctorName, PSR.PaymentAmount
        FROM PastScheduleRecords AS PSR
        INNER JOIN ScheduleRecords AS SR ON SR.schedule_record_id = PSR.schedule_record_id
        INNER JOIN Patients AS P ON P.patient_id = SR.patient_id
        INNER JOIN Doctors AS D ON D.doctor_id = SR.doctor_id
        WHERE (@StartDate IS NULL OR CAST(SR.appointment_date AS DATE) >= @StartDate)
          AND (@EndDate IS NULL OR CAST(SR.appointment_date AS DATE) <= @EndDate);
    END
END;

/*GO
CREATE PROCEDURE GetPastScheduleRecordsByDateRange
    @StartDate DATE = NULL,
    @EndDate DATE = NULL
AS
BEGIN
    IF @EndDate IS NULL
    BEGIN
        DECLARE @Date DATE = CAST(GETDATE() AS DATE);
        SELECT SR.appointment_date, P.first_name + ' ' + P.last_name AS PatientName, D.first_name + ' ' + D.last_name AS DoctorName, PSR.PaymentAmount
        FROM PastScheduleRecords AS PSR
        INNER JOIN ScheduleRecords AS SR ON SR.schedule_record_id = PSR.schedule_record_id
        INNER JOIN Patients AS P ON P.patient_id = SR.patient_id
        INNER JOIN Doctors AS D ON D.doctor_id = SR.doctor_id
        WHERE CAST(SR.appointment_date AS DATE) = @Date;
    END
    ELSE
    BEGIN
        SELECT SR.appointment_date, P.first_name + ' ' + P.last_name AS PatientName, D.first_name + ' ' + D.last_name AS DoctorName, PSR.PaymentAmount
        FROM PastScheduleRecords AS PSR
        INNER JOIN ScheduleRecords AS SR ON SR.schedule_record_id = PSR.schedule_record_id
        INNER JOIN Patients AS P ON P.patient_id = SR.patient_id
        INNER JOIN Doctors AS D ON D.doctor_id = SR.doctor_id
        WHERE (@StartDate IS NULL OR CAST(SR.appointment_date AS DATE) >= @StartDate)
          AND (@EndDate IS NULL OR CAST(SR.appointment_date AS DATE) <= @EndDate);
    END
END;
GO*/