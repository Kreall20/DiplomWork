import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/styles/global.css';
import '../../assets/styles/MedicalCardStyles/StyleCreateCard.css';
import '../../assets/styles/MedicalCardStyles/StyleCards.css';

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const CreateCardPage = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [searchText, setSearchText] = useState('');

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
        console.log('Selected patient ID:', patient.patientId);
    };

    const handleCreateMedicalBook = async () => {
        if (!selectedPatient) {
            console.error('No patient selected to create medical book for.');
            return;
        }

        try {
            const response = await axios.post(`https://localhost:7284/medicalbook/create?patientId=${selectedPatient.patientId}`);
            console.log('Medical book created successfully:', response.data);
            fetchPatients(); // Обновляем список пациентов после создания карточки
        } catch (error) {
            console.error('Error creating medical book:', error);
        }
    };

    const handleSearchChange = async (e) => {
        const searchText = e.target.value;
        setSearchText(searchText);

        if (searchText.trim() === '') {
            fetchPatients();
        } else {
            try {
                const response = await axios.get(`https://localhost:7284/Patient/patients-without-medical-books-search/${searchText}`);
                setPatients(response.data);
            } catch (error) {
                console.error('Error searching patients:', error);
            }
        }
    };

    return (
        <div className="container">
            <main>
                <h1>Создать карточку</h1>
                <form className="search-form" action="">
                    <label htmlFor="searchPatient"></label>
                    <div className="searchblock">
                        <input
                            className="search"
                            id="searchPatient"
                            type="text"
                            placeholder="Поиск"
                            value={searchText}
                            onChange={handleSearchChange}
                        />
                    </div>
                </form>
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
            </main>
        </div>
    );
};

export default CreateCardPage;
