import '../../assets/styles/global.css'
import '../../assets/styles/DoctorsStyles/StyleInsertDoctor.css'
import { useState } from 'react';
import axios from 'axios';

const InsertDoctorFormPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        userName: '',
        password: ''
    });

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
            const response = await axios.post('https://localhost:7284/doctors/add', formData);
            alert('Врач добавлен успешно');
            setFormData({
                firstName: '',
                lastName: '',
                phoneNumber: '',
                userName: '',
                password: ''
            });
        } catch (error) {
            console.error('Ошибка при добавлении врача:', error);
            alert('Ошибка при добавлении врача');
        }
    };

    return (
        <div className="container">
            <h1>Добавить врача</h1>
            <form className="insert-doctor-form" onSubmit={handleSubmit}>
                <div className="insert-doctor-form-container">
                    <div className="insert-doctor-labels-inputs-container">
                        <div className="insert-doctor-labels">
                            <label htmlFor="firstName">Имя</label>
                            <label htmlFor="lastName">Фамилия</label>
                            <label htmlFor="userName">Логин</label>
                            <label htmlFor="password">Пароль</label>
                            <label htmlFor="phoneNumber">Телефон</label>
                        </div>
                        <div className="insert-doctor-inputs">
                            <input type="text" id="firstName" name="firstName" placeholder="Имя" value={formData.firstName} onChange={handleChange} />
                            <input type="text" id="lastName" name="lastName" placeholder="Фамилия" value={formData.lastName} onChange={handleChange} />
                            <input type="text" id="userName" name="userName" placeholder="Логин" value={formData.userName} onChange={handleChange} />
                            <input type="password" id="password" name="password" placeholder="Пароль" value={formData.password} onChange={handleChange} />
                            <input type="text" id="phoneNumber" name="phoneNumber" placeholder="Телефон" value={formData.phoneNumber} onChange={handleChange} />
                        </div>
                    </div>
                    <button className="insert-doctor-button" type="submit">Добавить врача</button>
                </div>
            </form>
        </div>
    );
};

export default InsertDoctorFormPage;
