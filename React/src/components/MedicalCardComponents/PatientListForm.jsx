import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../assets/styles/MedicalCardStyles/StyleCards.css';
const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const PatientListForm = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null); // Для выбранного пациента

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await axios.get('https://localhost:7284/Patient/patients-without-medical-books');
            setPatients(response.data);
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    };

    const handlePatientClick = (patient) => {
        setSelectedPatient(patient);
        console.log('Selected patient ID:', patient.patientId); // Выводим ID выбранного пациента в консоль
        // Дополнительные действия при выборе пациента, например, заполнение формы или переход на другую страницу
    };

    const handleCreateMedicalBook = async () => {
        if (!selectedPatient) {
            console.error('No patient selected to create medical book for.');
            return;
        }
    
        try {
            const response = await axios.post(`https://localhost:7284/medicalbook/create?patientId=${selectedPatient.patientId}`, {
                // Если необходимо передать другие данные для создания карточки, их можно указать здесь
            });
            
            console.log('Medical book created successfully:', response.data);
            // После успешного создания карточки обновляем список пациентов без карточек
            fetchPatients();
        } catch (error) {
            console.error('Error creating medical book:', error);
        }
    };
    

    return (
        <>
            <div className="PatientsList">
                <form className="PatientForm" action="">
                    <div className="PatientFormItem">
                        {patients.map(patient => (
                            <input
                                className="longer"
                                key={patient.patientId}
                                type="text"
                                id={patient.patientId}
                                onClick={() => handlePatientClick(patient)}
                                name="patient_name"
                                value={`${patient.firstName} ${patient.lastName}`}
                                readOnly
                            />
                        ))}
                    </div>
                </form>
            </div>
            <div className="CardsButtonsCreateCard">
                <button className="CardsButtonCreateCard" onClick={handleCreateMedicalBook}>Добавить карточку</button>
            </div>
        </>
    );
};

export default PatientListForm;
