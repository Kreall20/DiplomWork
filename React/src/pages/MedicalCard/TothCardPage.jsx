import React from 'react';
import '../../assets/styles/global.css';
import '../../assets/styles/MedicalCardStyles/StyleTeth.css';
import ToothImage from '../../assets/images/tooth.png'; // замените на путь к вашему изображению зуба
import { Link } from 'react-router-dom';

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleToothClick = (toothNumber) => {
    alert(`Зуб ${toothNumber} выбран`);
};

const ToothCardPage = () => {
    const createToothButtons = (toothOrder, isTopRow) => {
        return toothOrder.map((number, index) => (
            <button
                className={`ToothBlock ${isTopRow ? `top-row-${number}` : `bottom-row-${number}`}`}
                onClick={() => handleToothClick(number)}
                key={index}
            >
                <img src={ToothImage} alt={`Зуб ${number}`} className="ToothImage" />
                <span className="ToothNumber">{number}</span>
            </button>
        ));
    };

    const topRowOrder = [8, 7, 6, 5, 4, 3, 2, 1, 1, 2, 3, 4, 5, 6, 7, 8];
    const bottomRowOrder = [8, 7, 6, 5, 4, 3, 2, 1, 1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <main>
            <div className="headername">
                <h1>Карточка Пациента</h1>
            </div>
            <div className="TethList">
                <div className="ToothRow">{createToothButtons(topRowOrder, true)}</div>
                <div className="ToothRow">{createToothButtons(bottomRowOrder, false)}</div>
            </div>
            <div className="TothButtons">
                <Link to="/medicalCards/card/add-record"><button className="TothButton" onClick={scrollToTop}>Добавить запись</button></Link>
                <Link to="/medicalCards/card/open-records"><button className="TothButton" onClick={scrollToTop}>Открыть записи</button></Link>
                <Link to="/medicalCards/print"><button className="TothButton">Печать</button></Link>
                <Link to="/medicalCards/delete-card"><button className="TothButton">Удалить</button></Link>
            </div>
        </main>
    );
};

export default ToothCardPage;
