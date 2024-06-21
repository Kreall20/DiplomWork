import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchForm from '../../components/ScheduleComponents/SearchSchedule';
import ScheduleIcon from "../../assets/images/Schedule.png";
import axios from 'axios';

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const SchedulePage = () => {
    const [scheduleRecords, setScheduleRecords] = useState([]);
    const [schedule_record_id, setRecordId] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [searchParams, setSearchParams] = useState({
        date: '',
        doctorId: '',
        patientName: ''
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

    useEffect(() => {
        fetchScheduleRecords();
    }, []);

    const fetchScheduleRecords = async () => {
        try {
            const response = await fetch('https://localhost:7284/schedule/all');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            const processedRecords = data.map(record => ({
                ScheduleRecordId: record.scheduleRecordId,
                patientName: record.patientName,
                doctorName: record.doctorName,
                appointmentDate: record.appointmentDate,
                isCompleted: record.isCompleted,
                patientPhone: record.patientPhone
                // Добавьте другие поля, которые вам нужны из ответа
            }));
            setScheduleRecords(processedRecords);

        } catch (error) {
            console.error('Error fetching schedule records:', error);
        }
    };

    const handleClick = (id) => {
        console.log(id);
        setRecordId(id);
    };

    const handleDelete = async () => {
        if (schedule_record_id !== "") {
            const confirmDelete = window.confirm('Вы уверены, что хотите удалить запись?');
            if (confirmDelete) {
                try {
                    const response = await fetch(`https://localhost:7284/schedule/delete/${schedule_record_id}`, {
                        method: 'DELETE'
                    });
                    if (response.ok) {
                        console.log('Schedule record deleted successfully.');
                        alert('Запись удалена успешно.');
                        setRecordId('');
                        fetchScheduleRecords(); // Обновляем график после удаления
                    } else {
                        console.error('Failed to delete schedule record');
                        alert('Не удалось удалить запись.');
                    }
                } catch (error) {
                    console.error('Error deleting schedule record:', error);
                    alert('Произошла ошибка при удалении записи.');
                }
            }
        }
    };

    const handleCheckboxChange = (id, isChecked) => {
        const confirmChange = window.confirm('Вы уверены, что хотите изменить состояние приема?');
    
        if (confirmChange) {
            // Обновление состояния чекбокса локально
            const updatedRecords = scheduleRecords.map(record => {
                if (record.ScheduleRecordId === id) {
                    return {
                        ...record,
                        isCompleted: isChecked
                    };
                }
                return record;
            });
    
            setScheduleRecords(updatedRecords);
            console.log('Schedule record updated locally.');
        }
    };

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchParams({
            ...searchParams,
            [name]: value
        });
    };


    return (
        <div className="container">
            <main>
                <div className="headername">
                    <img src={ScheduleIcon} className="PartitionIcon" alt=""/>
                    <h1>График работы</h1>
                </div>
                <form className="Searchform" action="">
                    <div className="searchblock">
                    <label htmlFor="sortdesasc" className='label'>Сортировать по</label>
                    <select name="sortdesasc" id="">
                        <option value="ascending">возрастанию</option>
                        <option value="descending">убыванию</option>
                        </select>
                    <select className = "searchselect" name="fieldsort" id="">
                            <option value="patient">Имени Пациента</option>
                            <option value="doctor">Имени Врача</option>
                            <option value="date">Даты</option>
                        </select>
                        <input className = "searchdate" type="datetime-local" />
                        <select className = "searchselect" name="doctors" id="">
                        <option value="" disabled selected>Выберите врача</option>
                                {doctors.map(doctor => (
                                    <option key={doctor.id} value={doctor.id}>{doctor.firstName} {doctor.lastName}</option>
                                ))}
                        </select>
                        <input className="Search" id="searchPatient" type="text" placeholder="Поиск" />
                        <button>Поиск</button>
                    </div>
                </form>
                <div className="ScheduleList">
                    <form className="Scheduleform" action="">
                        <div className="ScheduleItems">
                            <div className="ScheduleItem longer">
                                <label>Пациент и телефон</label>
                                {scheduleRecords.map(record => (
                                    <div className='wrap' key={record.ScheduleRecordId} onClick={() => handleClick(record.ScheduleRecordId)}>
                                        <input
                                            key={`patient_name_${record.ScheduleRecordId}`}
                                            type="text"
                                            id={`patient_name_${record.ScheduleRecordId}`}
                                            name="patient_name"
                                            value={`${record.patientName} ${record.patientPhone}`}
                                            readOnly
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="ScheduleItem longer">
                                <label>Врач</label>
                                {scheduleRecords.map(record => (
                                    <div className='wrap' key={record.ScheduleRecordId} onClick={() => handleClick(record.ScheduleRecordId)}>
                                        <input
                                            key={`doctor_name_${record.ScheduleRecordId}`}
                                            type="text"
                                            id={`doctor_name_${record.ScheduleRecordId}`}
                                            name="doctor_name"
                                            value={record.doctorName}
                                            readOnly
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="ScheduleItem">
                                <label>Время</label>
                                {scheduleRecords.map(record => (
                                    <div className='wrap' key={record.ScheduleRecordId} onClick={() => handleClick(record.ScheduleRecordId)}>
                                        <input
                                            key={`appointment_date_${record.ScheduleRecordId}`}
                                            type="datetime-local"
                                            id={`appointment_date_${record.ScheduleRecordId}`}
                                            name="appointment_date"
                                            value={record.appointmentDate}
                                            readOnly
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="ScheduleItem">
                                <label>Прием окончен</label>
                                {scheduleRecords.map(record => (
                                    <div className='wrap' key={record.ScheduleRecordId} onClick={() => handleClick(record.ScheduleRecordId)}>
                                        <input
                                            key={`appointment_completed_${record.ScheduleRecordId}`}
                                            type="checkbox"
                                            id={`appointment_completed_${record.ScheduleRecordId}`}
                                            name="appointment_completed"
                                            checked={record.isCompleted}
                                            onChange={() => handleCheckboxChange(record.ScheduleRecordId, !record.isCompleted)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </form>
                </div>
                <div className="PaymentSection">
                    <label htmlFor="payment">Оплата</label>
                    <input type="text" id="payment" name="payment" />
                </div>
                <div className="ScheduleButtons">
                    <Link to="/schedule/add">
                        <button className="FormButtons"onClick={scrollToTop} >Добавить запись</button>
                    </Link>
                    <Link to={`/schedule/open/${schedule_record_id}`} disabled={!schedule_record_id}>
                        <button className="FormButtons" onClick={scrollToTop}>Открыть запись</button>
                    </Link>
                    <button className="FormButtons" onClick={handleDelete}>Удалить запись</button>
                </div>
            </main>
        </div>
    );
};

export default SchedulePage;
