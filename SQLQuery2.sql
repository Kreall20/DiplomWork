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

DROP TRIGGER trg_CheckAppointmentTime;
GO
CREATE OR ALTER TRIGGER trg_CheckAppointmentTime
ON ScheduleRecords
INSTEAD OF INSERT
AS
BEGIN
    DECLARE @AppointmentDate DATETIME;
    DECLARE @CurrentTime DATETIME;
    DECLARE @PatientId INT;
    DECLARE @FirstName NVARCHAR(50);
    DECLARE @LastName NVARCHAR(50);
    DECLARE @PhoneNumber NVARCHAR(15);

    -- Получаем текущее время
    SET @CurrentTime = GETDATE();

    -- Получаем данные пациента и дату назначения из вставленных данных
    SELECT @AppointmentDate = appointment_date,
           @PatientId = patient_id
    FROM inserted;

    -- Получаем ID пациента, если он уже существует
    SELECT @PatientId = patient_id FROM Patients WHERE first_name = @FirstName AND last_name = @LastName;

    -- Если пациент не существует, добавляем его и создаем карточку
    IF @PatientId IS NULL
    BEGIN
        -- Добавляем нового пациента
        INSERT INTO Patients (first_name, last_name, phone_number)
        VALUES (@FirstName, @LastName, @PhoneNumber);

        -- Получаем ID только что добавленного пациента
        SELECT @PatientId = SCOPE_IDENTITY();

        -- Создаем новую карточку для пациента
        INSERT INTO MedicalBooks (patient_id)
        VALUES (@PatientId);
    END

    -- Проверяем, что дата назначения не раньше чем через час
    IF @AppointmentDate < DATEADD(HOUR, 1, @CurrentTime)
    BEGIN
        RAISERROR ('Appointment date must be at least 1 hour in the future.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END

    -- Если проверка прошла, вставляем данные
    INSERT INTO ScheduleRecords (appointment_date, patient_id, doctor_id)
    SELECT appointment_date, @PatientId, doctor_id
    FROM inserted;
END;

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
    @DoctorId INT
AS
BEGIN
    -- Добавляем новую запись в таблицу ScheduleRecords
    INSERT INTO ScheduleRecords (appointment_date, patient_id, doctor_id)
    VALUES (@AppointmentDate, @PatientId, @DoctorId);
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