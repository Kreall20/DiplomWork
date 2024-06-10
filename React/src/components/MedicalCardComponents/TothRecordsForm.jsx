import '../../assets/styles/global.css'
import '../../assets/styles/MedicalCardStyles/StyleTothRecords.css'
import { Link } from 'react-router-dom';

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const TothRecordsForm = () => {
    return(
        <>
            <div className="CardsList">
            <form className="TothRecordsForm" action="">
                <div className="TothRecordsItem">
                    <label htmlFor="patient_name">Записи</label>
                    <input className="longer" type="text" id="patient_name" name="patient_name"/>
                </div>
                <div className="TothRecordsItem">
                    <label htmlFor="appointment_date">Время</label>
                    <input type="datetime-local" id="appointment_date" name="appointment_date"/>
                </div>
            </form>
            </div>
            <div className="RecordsButtons">
                <Link to="/medicalCards/card/add-record"><button className="TothButton" onClick={scrollToTop}>Добавить запись</button></Link>
                <Link to="/medicalCards/card/open-record"><button className="TothButton" onClick={scrollToTop}>Открыть запись</button></Link>
                <button className="RecordsButton">Удалить запись</button>
            </div>
        </>
    );
};

export default TothRecordsForm;