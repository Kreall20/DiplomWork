import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../assets/styles/global.css';
import '../../assets/styles/MedicalCardStyles/StyleTothRecords.css';

const MedicalCardsForm = () => {
    const { patientId } = useParams(); // Получаем параметр patientId из URL

    const [records, setRecords] = useState([]); // Состояние для хранения списка записей
    const [searchTerm, setSearchTerm] = useState(''); // Состояние для хранения поискового запроса
    const [loading, setLoading] = useState(true); // Состояние для отображения состояния загрузки
    const [selectedMedicalRecordId, setSelectedMedicalRecordId] = useState(null); // Состояние для хранения выбранного medicalRecordId

    useEffect(() => {
        // Функция для загрузки записей зуба из базы данных
        const fetchToothRecords = async () => {
            try {
                const urlParts = window.location.pathname.split('/');
                const toothNum = urlParts[urlParts.length - 1];
                const url = `https://localhost:7284/medicalbook/records/${patientId}/${toothNum}`;
                const response = await axios.get(url);
                setRecords(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке записей зуба:', error);
            } finally {
                setLoading(false); // Устанавливаем loading в false после загрузки данных
            }
        };

        fetchToothRecords(); // Вызов функции загрузки записей зуба при загрузке компонента
    }, [patientId]); // Зависимость useEffect от patientId, чтобы обновлять данные при изменении ID пациента

    const handleSearch = (e) => {
        setSearchTerm(e.target.value); // Обновляем состояние searchTerm при изменении значения в поле поиска
    };

    const handleDeleteRecord = async () => {
        if (!selectedMedicalRecordId) {
            console.error('Не выбрана запись для удаления');
            return;
        }

        const confirmDelete = window.confirm('Вы уверены, что хотите удалить эту запись?');

        if (confirmDelete) {
            try {
                await axios.delete(`https://localhost:7284/medicalbook/deletemedicalrecord/${selectedMedicalRecordId}`);
                console.log(selectedMedicalRecordId)
                // После успешного удаления, обновляем список записей, исключая удаленную запись
                const updatedRecords = records.filter(record => record.medicalRecordId !== selectedMedicalRecordId);
                setRecords(updatedRecords);
                setSelectedMedicalRecordId(null); // Сбрасываем выбранный medicalRecordId после удаления
            } catch (error) {
                console.error('Ошибка при удалении записи:', error);
            }
        }
    };

    const handleSelectMedicalRecord = (medicalRecordId) => {
        setSelectedMedicalRecordId(medicalRecordId); // Сохраняем выбранный medicalRecordId
    };

    return (
        <main>
            <h1>Записи зуба</h1>
            <div className="CardsList">
                <form className="TothRecordsForm">
                    <div className="TothRecordsItem">
                        <label htmlFor="patient_name">Описание</label>
                        {records.map(record => (
                            <div key={record.medicalRecordId} className="RecordItem" onClick={() => handleSelectMedicalRecord(record.medicalRecordId)}>
                                <input
                                    className="longer"
                                    type="text"
                                    id="patient_name"
                                    name="patient_name"
                                    value={record.descriptionTooth}
                                    readOnly // Запрещаем редактирование
                                />
                            </div>
                        ))}
                    </div>
                    <div className="TothRecordsItem">
                        <label htmlFor="appointment_date">Дата записи</label>
                        {records.map(record => (
                            <div key={record.medicalRecordId} className="RecordItem" onClick={() => handleSelectMedicalRecord(record.medicalRecordId)}>
                                <input
                                    type="datetime-local"
                                    id="appointment_date"
                                    name="appointment_date"
                                    value={record.date}
                                    readOnly // Запрещаем редактирование
                                />
                            </div>
                        ))}
                    </div>
                </form>
            </div>
            <div className="RecordsButtons">
                {/* Кнопка для удаления записи */}
                <button className="RecordsButton" onClick={handleDeleteRecord}>Удалить запись</button>

                {/* Ссылка для открытия записи */}
                {/* <Link to={`/medicalCards/card/open-record/${patientId}/${selectedMedicalRecordId}`}>
                    <button className="TothButton">Открыть запись</button>
                </Link> */}
            </div>
        </main>
    );
};

export default MedicalCardsForm;
