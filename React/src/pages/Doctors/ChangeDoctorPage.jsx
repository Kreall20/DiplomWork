import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../assets/styles/global.css';
import '../../assets/styles/DoctorsStyles/StyleChangeDoctor.css';

const ChangeDoctorPage = () => {
    const { doctorId } = useParams();
    const [doctorData, setDoctorData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        phoneNumber: ''
    });

    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const response = await fetch(`https://localhost:7284/doctors/open/${doctorId}`);
                if (response.ok) {
                    const data = await response.json();
                    const { firstName, lastName, userName, phoneNumber } = data;
                    setDoctorData({
                        firstName,
                        lastName,
                        userName,
                        phoneNumber,
                        password: '' // Make sure to set password to an empty string initially
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctorData(prevDoctorData => ({
            ...prevDoctorData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { firstName, lastName, userName, password, phoneNumber } = doctorData;
            const requestData = {
                firstName,
                lastName,
                userName,
                password,
                phoneNumber
            };

            const response = await fetch(`https://localhost:7284/doctors/edit/${doctorId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            alert("Данные успешно обновлены");
            // Добавьте здесь логику для отображения сообщения об успешном обновлении

        } catch (error) {
            console.error('Error updating doctor:', error);
            alert("Произошла ошибка при обновлении данных");
            // Добавьте здесь логику для отображения сообщения об ошибке обновления
        }
    };

    return (
        <div className="container">
            <h1>Изменить данные врача {doctorData.firstName} {doctorData.lastName}</h1>
            <form className="change-doctor-form" onSubmit={handleSubmit}>
                <div className="change-doctor-form-container">
                    <div className="change-doctor-labels-inputs-container">
                        <div className="change-doctor-labels">
                            <label htmlFor="firstName">Имя</label>
                            <label htmlFor="lastName">Фамилия</label>
                            <label htmlFor="login">Логин</label>
                            <label htmlFor="password">Пароль</label>
                            <label htmlFor="phone">Телефон</label>
                        </div>
                        <div className="change-doctor-inputs">
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="Имя"
                                value={doctorData.firstName}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Фамилия"
                                value={doctorData.lastName}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                id="login"
                                name="userName"
                                placeholder="Логин"
                                value={doctorData.userName}
                                onChange={handleChange}
                            />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Пароль"
                                value={doctorData.password}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                id="phone"
                                name="phoneNumber"
                                placeholder="Номер телефона"
                                value={doctorData.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <button type="submit" className="change-doctor-button">Изменить данные врача</button>
                </div>
            </form>
        </div>
    );
};

export default ChangeDoctorPage;
