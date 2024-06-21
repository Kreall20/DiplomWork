import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../assets/styles/global.css';
import '../../assets/styles/MedicalCardStyles/StyleCards.css';
import Card from "../../assets/images/Card.png";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const MedicalCardsPage = () => {
    const [patientsWithCards, setPatientsWithCards] = useState([]);
    const [selectedMedicalBookId, setSelectedMedicalBookId] = useState('');
    const [searchText, setSearchText] = useState('');

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
        setSelectedMedicalBookId(patient.medicalBookId);
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
                fetchPatientsWithCards();
                setSelectedMedicalBookId(null);
            } catch (error) {
                console.error('Error deleting medical book:', error);
            }
        }
    };

    const handleSearchChange = async (e) => {
        const searchText = e.target.value;
        setSearchText(searchText);

        try {
            const response = await axios.get(`https://localhost:7284/MedicalBook/patients-with-medical-cards/${searchText}`);
            setPatientsWithCards(response.data);
        } catch (error) {
            console.error('Error fetching patients with medical cards by name:', error);
        }
    };

    const handlePrint = () => {
        // Создаем новый документ PDF
        const doc = new jsPDF();

        // Формируем контент для печати
        const content = document.getElementById('print-content');

        // Преобразуем HTML-элемент в canvas с помощью html2canvas
        html2canvas(content)
            .then(canvas => {
                const imgData = canvas.toDataURL('image/png');

                // Добавляем изображение в документ PDF
                doc.addImage(imgData, 'PNG', 10, 10, 180, 150);
                
                // Сохраняем или отображаем документ PDF
                doc.save('medical-cards.pdf');
            })
            .catch(error => {
                console.error('Error generating PDF:', error);
            });
    };

    return (
        <div className="container">
            <main>
                <div className="headername">
                    <img src={Card} className="CardIcon" alt="" />
                    <h1>Мед. карточки</h1>
                </div>
                <form className="Searchform" action="">
                    <label htmlFor="searchPatient"></label>
                    <div className="searchblock">
                        <input
                            className="Search"
                            id="searchPatient"
                            type="text"
                            placeholder="Поиск"
                            value={searchText}
                            onChange={handleSearchChange}
                        />
                    </div>
                </form>
                <div className="CardsList">
                    <form className="CardForm" action="">
                        <div id="print-content" className="CardItem">
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
                        <button className="CardsButton" onClick={handlePrint}>Печать</button>
                        <Link to={`/medicalCards/open-card/${selectedMedicalBookId}`}>
                            <button className="CardsButton" onClick={scrollToTop}>Открыть карточку</button>
                        </Link>
                        <Link to="/medicalCards/add-card">
                            <button className="CardsButton" onClick={scrollToTop}>Добавить карточку</button>
                        </Link>
                        <button className="CardsButton" onClick={handleDeleteMedicalBook}>Удалить карточку</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MedicalCardsPage;
