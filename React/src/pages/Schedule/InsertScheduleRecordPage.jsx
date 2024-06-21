import React, { useState, useEffect } from 'react';
import '../../assets/styles/global.css';
import '../../assets/styles/ScheduleStyles/StyleScheduleInsertRecord.css';
import axios from 'axios';

const InsertScheduleRecordPage = () => {
    const [formData, setFormData] = useState({
        patientName: '',
        phoneNumber: '',
        appointmentDate: '',
        doctorId: ''  // Заменили doctorname на doctorId
    });

    const [doctors, setDoctors] = useState([]);
    const [errors, setErrors] = useState({});

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { patientName, phoneNumber, appointmentDate, doctorId } = formData;
            // Убедитесь, что doctorId выбран и не пуст
            if (!doctorId) {
                alert('Выберите врача');
                return;
            }
            // Подготовка данных для отправки на сервер
            const postData = {
                appointmentDate: appointmentDate,
                firstName: patientName.split(' ')[0], // Первое слово считаем именем
                lastName: patientName.split(' ')[1] || '', // Второе слово (если есть) считаем фамилией
                phoneNumber: phoneNumber,
                doctorFio: doctorId // Здесь передаем doctorId напрямую
            };
    
            // Отправка данных на сервер
            const response = await axios.post('https://localhost:7284/schedule/add', postData);
            console.log(response.data);
            alert('Запись добавлена успешно');
            
            // Очищаем форму после успешной отправки
            setFormData({
                patientName: '',
                phoneNumber: '',
                appointmentDate: '',
                doctorId: '' // Сбрасываем doctorId
            });
        } catch (error) {
            console.error('Ошибка при добавлении записи:', error);
            alert('Ошибка при добавлении записи');
        }
    };

    return (
        <div className="container">
            <main>
                <h1>Добавить запись</h1>
                <form className="InsertScheduleRecord-form" onSubmit={handleSubmit}>
                    <div className="form-container">
                        <div className="labelsinputs-container">
                            <div className="InsertScheduleRecord-labels">
                                <label htmlFor="patientName">Пациент</label>
                                <label htmlFor="phoneNumber">Телефон</label>
                            </div>
                            <div className="InsertScheduleRecord-inputs">
                                <input
                                    type="text"
                                    id="patientName"
                                    name="patientName"
                                    placeholder="Имя Фамилия"
                                    value={formData.patientName}
                                    onChange={handleChange}
                                />
                                {errors.patientName && <span className="error">{errors.patientName}</span>}
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    placeholder="Телефон"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />
                                {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
                            </div>
                        </div>
                        <div className="labelsinputs-container">
                            <div className="InsertScheduleRecord-labels">
                                <label htmlFor="doctorId">Врач</label>
                                <label htmlFor="appointmentDate">Дата</label>
                            </div>
                            <div className="InsertScheduleRecord-inputs second">
                                <select
                                    className="addselect"
                                    id="doctorId"
                                    name="doctorId"
                                    value={formData.doctorId}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>Выберите врача</option>
                                    {doctors.map(doctor => (
                                        <option key={doctor.id} value={doctor.id}>
                                            {doctor.firstName} {doctor.lastName}
                                        </option>
                                    ))}
                                </select>
                                {errors.doctorId && <span className="error">{errors.doctorId}</span>}
                                <input
                                    className='dateinput'
                                    type="datetime-local"
                                    id="appointmentDate"
                                    name="appointmentDate"
                                    value={formData.appointmentDate}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <button className="InsertRecordButton" type="submit">Добавить запись</button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default InsertScheduleRecordPage;
