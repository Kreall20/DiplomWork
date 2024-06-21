import '../../assets/styles/global.css'
import '../../assets/styles/ScheduleStyles/StyleChangeSchedule.css'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const ChangeScheduleRecordPage = () => {
    const { schedule_record_id } = useParams();
    const [doctors, setDoctors] = useState([]);
    const [doctorid,setDoctorID] = useState('');
    const [doctorName, setDoctorName] = useState('');
    const [scheduleData, setScheduleData] = useState({
        doctorId: '',
        patientId: '',
        appointmentDate: '',
        isCompleted: false,
        patientName: '',
        doctorName: '',
        patientPhone: ''
    });

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('https://localhost:7284/doctors');
                setDoctors(response.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, []);

    const [recordId,setrecordId] = useState();
    useEffect(() => {
        const fetchScheduleData = async () => {
            try {
                const pathElements = window.location.pathname.split('/');
                const lastPathElement = pathElements[pathElements.length - 1];
                setrecordId(lastPathElement);
                // Отправляем запрос на сервер для получения данных по schedule_record_id
                const response = await axios.get(`https://localhost:7284/Schedule/open/${lastPathElement}`);
                console.log(response.status)
                if (response.status === 200) {
                    const { doctorId, patientId, appointmentDate, isCompleted, patientName, doctorName, patientPhone } = response.data;
                    setScheduleData({
                        doctorId,
                        patientId,
                        appointmentDate,
                        isCompleted,
                        patientName,
                        doctorName,
                        patientPhone
                    });
                    const selectedDoctor = doctors.find(doctor => doctor.id === scheduleData.doctorId);
                    if (selectedDoctor) {
                        setDoctorName(`${scheduleData.firstName} ${scheduleData.lastName}`);
                    }
                    setDoctorID(doctorId);
                } else {
                    console.error('Failed to fetch schedule data');
                }
            } catch (error) {
                console.error('Error fetching schedule data:', error);
            }
        };

        fetchScheduleData();
    }, [schedule_record_id]);
    const handleUpdateScheduleRecord = async () => {
        if (window.confirm('Вы уверены, что хотите изменить запись?')) {
            try {
                // Разбиваем patientName на имя и фамилию
                const [firstName, ...lastNameParts] = scheduleData.patientName.split(' ');
                const lastName = lastNameParts.join(' '); // Соединяем оставшуюся часть как фамилию
                console.log()
                const response = await axios.put(`https://localhost:7284/Schedule/update/${recordId}`, {
                    AppointmentDate: scheduleData.appointmentDate,
                    FirstName: firstName,
                    LastName: lastName,
                    PhoneNumber: scheduleData.patientPhone,
                    DoctorFIO: doctorid 
                });
                if (response.status === 200) {
                    console.log('Schedule record updated successfully');
                    // Добавьте необходимые действия при успешном обновлении записи, например, сообщение или перенаправление пользователя
                } else {
                    console.error('Failed to update schedule record');
                    // Добавьте обработку ошибок при неудачном обновлении записи
                }
            } catch (error) {
                console.error('Error updating schedule record:', error);
                // Добавьте обработку ошибок при ошибке запроса
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setScheduleData({
            ...scheduleData,
            [name]: value
        });
    };

    const handleDoctorChange = (e) => {
        const selectedDoctorId = e.target.value;
        setDoctorID(selectedDoctorId);
        const selectedDoctor = doctors.find(doctor => doctor.firstName + doctor.lastName === selectedDoctorId);
        if (selectedDoctor) {
            setDoctorName(`${selectedDoctor.firstName} ${selectedDoctor.lastName}`);
        } else {
            setDoctorName(''); // Clear doctorName if no doctor is selected
        }
        setScheduleData({
            ...scheduleData,
            doctorId: selectedDoctorId
        });
    };

    return (
        <div className="container">
            <main>
                <h1>Изменить запись</h1>
                <form className="ChangeScheduleRecord-form">
                    <div className="form-container">
                        <div className="fields-container">
                            <div className="field-labels">
                                <label htmlFor="patientName">Пациент</label>
                                <label htmlFor="patientPhone">Номер</label>
                                <label htmlFor="doctor">Врач</label>
                                <label htmlFor="datetime-local">Дата</label>
                            </div>
                            <div className="field-inputs">
                            <input
                                    type="text"
                                    id="patientName"
                                    name="patientName"
                                    placeholder="Пациент"
                                    value={`${scheduleData.patientName}`}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    id="patientPhone"
                                    name="patientPhone"
                                    placeholder="Телефон"
                                    value={scheduleData.patientPhone}
                                    onChange={handleChange}
                                />
                                <select
                                    className="addselect"
                                    id="doctorId"
                                    name="doctorId"
                                    value={scheduleData.doctorId}
                                    onChange={handleDoctorChange}
                                >
                                    <option value="" disabled>Выберите врача</option>
                                    {doctors.map(doctor => (
                                        <option key={doctor.id} value={doctor.id}>
                                            {doctor.firstName} {doctor.lastName}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="datetime-local"
                                    className="short"
                                    id="date"
                                    name="appointmentDate"
                                    value={scheduleData.appointmentDate}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="ChangeScheduleRecord-buttons">
                            <button
                                type="button"
                                className="ChangeRecordButton"
                                onClick={handleUpdateScheduleRecord}
                            >
                                Изменить запись
                            </button>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default ChangeScheduleRecordPage;