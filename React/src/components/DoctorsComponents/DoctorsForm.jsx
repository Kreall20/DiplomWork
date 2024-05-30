import '../../assets/styles/global.css'
import '../../assets/styles/DoctorsStyles/StyleDoctors.css'
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from 'react-router-dom';
import InsertDoctorFormPage from '../../pages/Doctors/InsertDoctorFormPage';
import OpenDoctorFormPage from '../../pages/Doctors/OpenDoctorFormPage';
import SchedulePage from '../../pages/Schedule/SchedulePage';


const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

const DoctorsForm = () => {
    return(
        <>
            <div className="CardsList">
            <form className="CardForm" action="">
                <div className="CardItem">
                <label htmlFor="patient_name">Врачи</label>
                <input className="longer" type="text" id="patient_name" name="patient_name" />
                <input className="longer" type="text" id="patient_name" name="patient_name" />
                <input className="longer" type="text" id="patient_name" name="patient_name" />
                <input className="longer" type="text" id="patient_name" name="patient_name" />
                <input className="longer" type="text" id="patient_name" name="patient_name" />
                <input className="longer" type="text" id="patient_name" name="patient_name" />
                </div>
            </form>
            </div>
            <div className="CardsButtons">
                <Link to="/doctors/add">
                    <button className="CardsButton" onClick={scrollToTop}>Добавить врача</button>
                </Link>
                <Link to="/doctors/open">
                    <button className="CardsButton" onClick={scrollToTop}>Открыть данные врача</button>
                </Link>
                <Link to="/doctors/schedule">
                    <button className="CardsButton" onClick={scrollToTop}>Показать график</button>
                </Link>
                <button className="CardsButton">Удалить</button>
            </div>
        </>
    );
};

export default DoctorsForm;