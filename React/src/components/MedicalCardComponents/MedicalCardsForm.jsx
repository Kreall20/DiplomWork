import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../assets/styles/MedicalCardStyles/StyleCards.css';

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const MedicalCardsForm = () => {
    const [patientsWithCards, setPatientsWithCards] = useState([]);
    const [selectedMedicalBookId, setSelectedMedicalBookId] = useState(''); // Для хранения выбранной медицинской карточки

    useEffect(() => {
        fetchPatientsWithCards();
    }, []);

    const fetchPatientsWithCards = async () => {
        try {
            const response = await axios.get('https://localhost:7284/MedicalBook/patients-with-medical-cards');
            setPatientsWithCards(response.data);
        } catch (error) {
            console.error('Error fetching patients with medical cards:', error);
        }
    };

    const handlePatientClick = (patient) => {
        console.log('Selected patient ID:', patient.patientId);
        setSelectedMedicalBookId(patient.medicalBookId); // Устанавливаем выбранную медицинскую карточку
        // Дополнительные действия при выборе пациента, например, заполнение формы или переход на другую страницу
    };

    const handleDeleteMedicalBook = async () => {
        if (!selectedMedicalBookId) {
            console.error('No medical book selected to delete.');
            return;
        }

        if (window.confirm('Вы уверены, что хотите удалить медицинскую карточку?')) {
            try {
                const response = await axios.delete(`https://localhost:7284/MedicalBook/delete/${selectedMedicalBookId}`);
                console.log('Medical book deleted successfully:', response.data);
                
                // После успешного удаления карточки обновляем список пациентов с карточками
                fetchPatientsWithCards();

                // Очищаем выбранную медицинскую карточку только после успешного удаления
                setSelectedMedicalBookId(null);
            } catch (error) {
                console.error('Error deleting medical book:', error);
            }
        }
    };

    return (
        <>
            <div className="CardsList">
                <form className="CardForm" action="">
                    <div className="CardItem">
                        {patientsWithCards.map(patient => (
                            <div key={patient.patientId}>
                                <input
                                    className="longer"
                                    type="text"
                                    id={patient.patientId}
                                    onClick={() => handlePatientClick(patient)}
                                    value={`${patient.firstName} ${patient.lastName}`}
                                    readOnly
                                />
                            </div>
                        ))}
                    </div>
                </form>
                <div className="CardsButtons">
                    <Link to="/medicalCards/add-card">
                        <button className="CardsButton" onClick={scrollToTop}>Добавить карточку</button>
                    </Link>
                    <Link to="/medicalCards/open-card">
                        <button className="CardsButton" onClick={scrollToTop}>Открыть карточку</button>
                    </Link>
                    <Link to="/medicalCards/print">
                        <button className="CardsButton" onClick={scrollToTop}>Печать</button>
                    </Link>
                    <button className="CardsButton" onClick={handleDeleteMedicalBook}>Удалить карточку</button>
                </div>
            </div>

        </>
    );
};

export default MedicalCardsForm;
