import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../assets/styles/global.css';
import '../../assets/styles/MedicalCardStyles/StyleInsertCardRecord.css';

const InsertCardRecordPage = () => {
    const { patientId,toothNum } = useParams(); // Получаем параметр patientId из URL

    const [formData, setFormData] = useState({
        patientName: '', // Это поле является текстовым полем для ввода имени пациента
        doctorId: '', // Это поле является селектором для выбора врача
        date: '', // Это поле является полем для ввода даты
        description: '' // Это поле является текстовым полем для ввода описания
    });

    const [doctors, setDoctors] = useState([]); // Состояние для хранения списка врачей
    const [errors, setErrors] = useState({}); // Состояние для управления ошибками формы

    useEffect(() => {
        // Функция для загрузки списка врачей с сервера
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('https://localhost:7284/doctors');
                setDoctors(response.data); // Сохраняем полученные данные в состояние doctors
            } catch (error) {
                console.error('Ошибка при загрузке врачей:', error);
            }
        };

        fetchDoctors(); // Вызов функции загрузки врачей при загрузке компонента
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

            const handleSubmit = async (e) => {
        e.preventDefault(); // Предотвращаем стандартное поведение отправки формы

        try {
            const urlParts = window.location.pathname.split('/');
            const toothNum = urlParts[urlParts.length - 1];
            // Отправка POST запроса на сервер для добавления записи
            const response = await axios.post('https://localhost:7284/MedicalBook/add', {
                patientId: patientId,
                toothNum: toothNum,
                date: formData.date,
                description: formData.description,
                doctorName: formData.doctorId // Передача ID выбранного врача
            });

            if (response.status === 200) {
                alert('Запись успешно добавлена!'); // Вывод сообщения об успешном добавлении записи
            } else {
                alert('Ошибка при добавлении записи'); // Вывод сообщения об ошибке
            }
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error.message);
            alert('Произошла ошибка при добавлении записи'); // Вывод сообщения об ошибке
        }
    };

    return (
        <main>
            <h1>Добавить запись в карточку</h1>
            <form className="InsertCardRecord-form" onSubmit={handleSubmit}>
                <div className="form-container">
                    <div className="labelsinputs-container">
                        <div className="insert-card-record-labels">
                            <label htmlFor="doctorId">Врач</label>
                            <label htmlFor="date">Дата</label>
                        </div>
                        <div className="insert-card-record-inputs">
                            <select
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
                            <input
                                type="datetime-local"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="Description">
                        <label htmlFor="description">Описание</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            cols="30"
                            rows="10"
                            placeholder="Описание"
                        />
                    </div>
                    <button type="submit" className="InsertRecordButton">
                        Добавить запись
                    </button>
                </div>
            </form>
        </main>
    );
};

export default InsertCardRecordPage;
