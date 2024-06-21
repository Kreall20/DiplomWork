import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../assets/styles/global.css';
import '../../assets/styles/MedicalCardStyles/StyleTeth.css';
import ToothImage from '../../assets/images/tooth.png';
import axios from 'axios';

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const ToothCardPage = () => {
    const { patientId } = useParams(); // Получаем параметр patientId из URL
    const [selectedToothId, setSelectedToothId] = useState(null); // Добавляем состояние для хранения выбранного зуба

    const handleToothClick = (toothNumber) => {
        console.log(toothNumber);
        setSelectedToothId(toothNumber);
    };

    const createToothButtons = (toothOrder, isTopRow,sum) => {
        return toothOrder.map((number, index) => (
            <button
                className={`ToothBlock ${isTopRow ? `top-row-${number}` : `bottom-row-${number}`}`}
                onClick={() => handleToothClick(sum+index)}
                key={sum+index}
            >
                <img src={ToothImage} alt={`Зуб ${number}`} className="ToothImage" />
                <span className="ToothNumber">{number}</span>
            </button>
        ));
    };

    const topRowOrder = [8, 7, 6, 5, 4, 3, 2, 1, 1, 2, 3, 4, 5, 6, 7, 8];
    const bottomRowOrder = [8, 7, 6, 5, 4, 3, 2, 1, 1, 2, 3, 4, 5, 6, 7, 8];

    const handleDeleteToothRecords = async () => {
        if (!selectedToothId) {
            console.error('Не выбран зуб для удаления записей');
            return;
        }

        try {
            console.log(selectedToothId +patientId);
            await axios.delete(`https://localhost:7284/medicalbook/DeleteToothRecords/${patientId}/${selectedToothId}`);
            console.log(`Записи для зуба ${selectedToothId} пациента ${patientId} успешно удалены`);
        } catch (error) {
            console.error('Ошибка при удалении записей зуба:', error);
        }
    };

    return (
        <main>
            <div className="headername">
                <h1>Карточка Пациента</h1> {/* Отображаем patientId */}
            </div>
            <div className="TethList">
                <div className="ToothRow">{createToothButtons(topRowOrder, true,1)}</div>
                <div className="ToothRow">{createToothButtons(bottomRowOrder, false,16)}</div>
            </div>
            <div className="TothButtons">
                <Link to={`/medicalCards/card/add-record/${patientId}/${selectedToothId}`}>
                    <button className="TothButton" onClick={scrollToTop} disabled={!selectedToothId}>
                        Добавить запись
                    </button>
                </Link>
                <Link to={`/medicalCards/card/open-records/${patientId}/${selectedToothId}`}>
                    <button className="TothButton" onClick={scrollToTop}>Открыть записи</button>
                </Link>
                {/* <button className="TothButton" onClick={handleDeleteToothRecords}>Удалить</button> */}
                <Link to="/medicalCards/print">
                    <button className="TothButton">Печать</button>
                </Link>
            </div>
        </main>
    );
};

export default ToothCardPage;
