import '../../assets/styles/global.css';
import '../../assets/styles/DoctorsStyles/StyleDoctors.css';
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from 'react-router-dom';
import InsertDoctorFormPage from '../../pages/Doctors/InsertDoctorFormPage';
import OpenDoctorFormPage from '../../pages/Doctors/OpenDoctorFormPage';
import SchedulePage from '../../pages/Schedule/SchedulePage';

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const DoctorsForm = () => {
    return (
        <>
            <div className="doctor-list">
                <form className="doctor-form" action="">
                    <div className="doctor-item">
                        {/* <label htmlFor="doctor_name">Врачи</label> */}
                        <input className="doctor-input" type="text" id="doctor_name" name="doctor_name" />
                        <input className="doctor-input" type="text" id="doctor_name" name="doctor_name" />
                        <input className="doctor-input" type="text" id="doctor_name" name="doctor_name" />
                        <input className="doctor-input" type="text" id="doctor_name" name="doctor_name" />
                        <input className="doctor-input" type="text" id="doctor_name" name="doctor_name" />
                        <input className="doctor-input" type="text" id="doctor_name" name="doctor_name" />
                    </div>
                </form>
            </div>
            <div className="doctor-buttons">
                <Link to="/doctors/add">
                    <button className="doctor-button" onClick={scrollToTop}>Добавить врача</button>
                </Link>
                <Link to="/doctors/open">
                    <button className="doctor-button" onClick={scrollToTop}>Открыть данные врача</button>
                </Link>
                <Link to="/doctors/schedule">
                    <button className="doctor-button" onClick={scrollToTop}>Показать график</button>
                </Link>
                <button className="doctor-button">Удалить</button>
            </div>
        </>
    );
};

export default DoctorsForm;
