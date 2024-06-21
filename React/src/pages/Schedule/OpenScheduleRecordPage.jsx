import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../../assets/styles/ScheduleStyles/StyleOpenScheduleRecord.css"

const OpenScheduleRecordPage = () => {
    const { schedule_record_id } = useParams();
    const [scheduleData, setScheduleData] = useState({
        doctorId: '',
        patientId: '',
        appointmentDate: '',
        isCompleted: false,
        patientName: '',
        doctorName: '',
        patientPhone: ''
    });
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
                } else {
                    console.error('Failed to fetch schedule data');
                }
            } catch (error) {
                console.error('Error fetching schedule data:', error);
            }
        };

        fetchScheduleData();
    }, [schedule_record_id]);

    return (
        <div className="container">
            <main>
                <h1>Запись</h1>
                <form className="OpenScheduleRecord-form">
                    <div className="form-container">
                        <div className="labelsinputs-container">
                            <div className="OpenScheduleRecord-labels">
                                <label htmlFor="patientName">Пациент</label>
                                <label htmlFor="doctorName">Врач</label>
                                <label htmlFor="appointmentDate">Дата</label>
                            </div>
                            <div className="OpenScheduleRecord-inputs">
                                <input
                                    type="text"
                                    id="patientName"
                                    name="patientName"
                                    placeholder="Пациент"
                                    value={`${scheduleData.patientName} ${scheduleData.patientPhone}`}
                                    readOnly
                                />
                                <input
                                    type="text"
                                    id="doctorName"
                                    name="doctorName"
                                    placeholder="Врач"
                                    value={scheduleData.doctorName}
                                    readOnly
                                />
                                <input
                                    type="datetime-local"
                                    id="appointmentDate"
                                    name="appointmentDate"
                                    value={scheduleData.appointmentDate}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="ChangeScheduleRecordbuttons">
                            <Link to={`/schedule/edit/${recordId}`} className="open-doctor-button">Изменить</Link>
                            {/* <button className="ChangeRecordButton">Изменить запись</button> */}
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default OpenScheduleRecordPage;
