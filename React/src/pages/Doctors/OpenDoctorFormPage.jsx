import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../../assets/styles/global.css';
import '../../assets/styles/DoctorsStyles/StyleOpenDoctor.css';

const OpenDoctorFormPage = () => {
    const { doctorId } = useParams();
    const [doctorData, setDoctorData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        phoneNumber: ''
    });

    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const response = await axios.get(`https://localhost:7284/doctors/open/${doctorId}`);
                if (response.status === 200) {
                    const { firstName, lastName, userName, phoneNumber } = response.data;
                    setDoctorData({
                        firstName,
                        lastName,
                        userName,
                        phoneNumber
                    });
                } else {
                    console.error('Failed to fetch doctor data');
                }
            } catch (error) {
                console.error('Error fetching doctor data:', error);
            }
        };

        fetchDoctorData();
    }, [doctorId]);

    return (
        <div className="container">
            <h1>Врач {doctorData.firstName} {doctorData.lastName}</h1>
            <form className="open-doctor-form">
                <div className="open-doctor-form-container">
                    <div className="open-doctor-labels-inputs-container">
                        <div className="open-doctor-labels">
                            <label htmlFor="fio">ФИО</label>
                            <label htmlFor="login">Логин</label>
                            <label htmlFor="phone">Телефон</label>
                        </div>
                        <div className="open-doctor-inputs">
                            <input type="text" id="fio" className="fio" name="fio" placeholder="ФИО" value={`${doctorData.firstName} ${doctorData.lastName}`} readOnly />
                            <input type="text" id="login" name="login" placeholder="Логин" value={doctorData.userName} readOnly />
                            <input type="text" id="phone" name="phone" placeholder="Телефон" value={doctorData.phoneNumber} readOnly />
                        </div>
                    </div>
                    <div className="open-doctor-buttons">
                        <Link to={`/doctors/edit/${doctorId}`} className="open-doctor-button">Изменить</Link>
                        {/* <button className="open-doctor-button" onClick={handleDelete}>Удалить</button> */}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default OpenDoctorFormPage;
