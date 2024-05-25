import '../../assets/styles/global.css'
import '../../assets/styles/DoctorsStyles/StyleDoctors.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InsertDoctorFormPage from '../../pages/Doctors/InsertDoctorFormPage';
import OpenDoctorFormPage from '../../pages/Doctors/OpenDoctorFormPage';
import SchedulePage from '../../pages/Schedule/SchedulePage';


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
                {/* <Link to="/doctors/insertDoctor">
                    <button className="CardsButton">Добавить врача</button>
                </Link>
                <Link to="/doctors/openDoctor">
                    <button className="CardsButton">Открыть данные врача</button>
                </Link>
                <Link to="/doctors/schedule">
                    <button className="CardsButton">Показать график</button>
                </Link> */}
                <button className="CardsButton">Удалить</button>
            </div>
        </>
    );
};

export default DoctorsForm;