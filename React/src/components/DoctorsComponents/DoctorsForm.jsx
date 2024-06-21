import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const DoctorsForm = () => {
    const [doctors, setDoctors] = useState([]);
    const [doctorId, setDoctorId] = useState('');
    const [searchText, setSearchText] = useState('');
    const [originalDoctors, setOriginalDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch(`https://localhost:7284/doctors`);
                if (!response.ok) {
                    throw new Error('Failed to fetch doctors');
                }
                const data = await response.json();
                setDoctors(data);
                setOriginalDoctors(data); // Сохраняем оригинальный список врачей
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, []);

    useEffect(() => {
        const fetchDoctorsByName = async () => {
            try {
                const response = await axios.get(`https://localhost:7284/doctors/byname/${searchText}`);
                setDoctors(response.data);
            } catch (error) {
                console.error('Error fetching doctors by name:', error);
            }
        };

        // Если поле поиска пустое, возвращаем все данные
        if (searchText.trim() === '') {
            setDoctors(originalDoctors); // Восстанавливаем оригинальный список
        } else {
            fetchDoctorsByName();
        }
    }, [searchText, originalDoctors]); // Добавляем originalDoctors в зависимости, чтобы реагировать на изменения

    const handleDoctorClick = (id) => {
        setDoctorId(id);
    };

    const handleDelete = async () => {
        if(doctorId != ""){
            const confirmDelete = window.confirm('Вы уверены, что хотите удалить этого врача?');
            if (confirmDelete) {
                try {
                    const response = await axios.delete(`https://localhost:7284/doctors/delete/${doctorId}`);
                    if (response.status === 200) {
                        console.log('Doctor deleted successfully.');
                        alert('Врач удален успешно.');
                        setDoctorId(''); // Сбросить doctorId после успешного удаления
                        // После удаления обновляем список врачей, чтобы отобразить изменения
                        const updatedDoctors = doctors.filter(doctor => doctor.doctorId !== doctorId);
                        setDoctors(updatedDoctors);
                    } else {
                        console.error('Failed to delete doctor');
                        alert('Не удалось удалить врача.');
                    }
                } catch (error) {
                    console.error('Error deleting doctor:', error);
                    alert('Произошла ошибка при удалении врача.');
                }
            }
        }
    };

    const handleChange = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <>
            <form className="search-form" action="">
                <div className="search-block">
                    <input
                        className="search"
                        id="searchDoctor"
                        type="text"
                        placeholder="Введите имя врача"
                        value={searchText}
                        onChange={handleChange}
                    />
                </div>
            </form>
            <div className="doctor-list">
                <form className="doctor-form" action="">
                    {doctors.map((doctor) => (
                        <div className="doctor-item" key={doctor.doctorId} onClick={() => handleDoctorClick(doctor.doctorId)}>
                            <input
                                className="doctor-input"
                                type="text"
                                id={`doctor_name_${doctor.doctorId}`}
                                name={`doctor_name_${doctor.doctorId}`}
                                value={`${doctor.firstName} ${doctor.lastName}`}
                                readOnly
                            />
                        </div>
                    ))}
                </form>
            </div>
            <div className="doctor-buttons">
                <Link to="/doctors/add">
                    <button className="doctor-button" onClick={scrollToTop}>Добавить врача</button>
                </Link>
                <Link to={`/doctors/open/${doctorId}`}>
                    <button className="doctor-button" onClick={scrollToTop}>Открыть данные врача</button>
                </Link>
                <Link to="/doctors/schedule">
                    <button className="doctor-button" onClick={scrollToTop}>Показать график</button>
                </Link>
                <button className="doctor-button" onClick={handleDelete}>Удалить</button>
            </div>
        </>
    );
};

export default DoctorsForm;
