import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../assets/styles/global.css';
import '../../assets/styles/MedicalCardStyles/StyleOpenTothRecord.css';

const OpenTothRecordPage = () => {
    const { patientId, medicalRecordId } = useParams(); // Получаем параметры patientId и medicalRecordId из URL

    const [recordData, setRecordData] = useState({
        doctor: '',
        date: '',
        description: ''
    });

    useEffect(() => {
        const fetchRecordData = async () => {
            try {
                const response = await axios.get(`https://localhost:7284/medicalbook/records/${patientId}/${medicalRecordId}`);
                setRecordData({
                    doctor: response.data.doctor, // Предположим, что данные о враче приходят в response.data.doctor
                    date: response.data.date, // Данные о дате записи
                    description: response.data.description // Описание записи
                });
            } catch (error) {
                console.error('Ошибка при загрузке данных записи:', error);
            }
        };

        fetchRecordData();
    }, [patientId, medicalRecordId]);

    return (
        <main>
            <h1>Запись</h1>
            <form className="OpenTothRecord-form">
                <div className="form-container">
                    <div className="labelsinputs-container">
                        <div className="labels">
                            <label htmlFor="doctor">Врач</label>
                            <label htmlFor="datetime-local">Дата</label>
                        </div>
                        <div className="inputs">
                            <input
                                type="text"
                                id="doctor"
                                name="doctor"
                                value={recordData.doctor}
                                readOnly
                            />
                            <input
                                type="datetime-local"
                                id="date"
                                name="date"
                                value={recordData.date}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="Description">
                        <label htmlFor="Desc">Описание</label>
                        <textarea
                            id="Desc"
                            name="description"
                            cols="30"
                            rows="10"
                            placeholder="Описание"
                            value={recordData.description}
                            readOnly
                        />
                    </div>
                    {/* Здесь могут быть кнопки для изменения, печати и удаления записи */}
                </div>
            </form>
        </main>
    );
};

export default OpenTothRecordPage;
