import '../../assets/styles/global.css';
import '../../assets/styles/MedicalCardStyles/StyleOpenTothRecord.css';
import { Link } from 'react-router-dom';

const OpenTothRecordPage = () => {
    return(
        <main>
            <h1>Запись</h1>
            <form className="OpenTothRecordForm">
                <div className="formContainer">
                    <div className="labelsInputsContainer">
                        <div className="OpenTothRecord-labels">
                            <label htmlFor="openPatientName">Пациент</label>
                            <label htmlFor="openDoctor">Врач</label>
                            <label htmlFor="openDateTime">Дата</label>
                            <label htmlFor="openTooth">Зуб</label>
                        </div>
                        <div className="OpenTothRecord--inputs">
                            <input type="text" id="openPatientName" name="openPatientName" placeholder="Пациент"/>
                            <select name="openDoctors" id="openDoctor">
                                <option value=""></option>
                            </select>
                            <input type="datetime-local" className="short" id="openDateTime" name="openDateTime"/>
                            <select name="openTooth" className="short" id="openToothInput">
                                <option value=""></option>
                            </select>
                        </div>
                    </div>
                    <div className="Description">
                        <label htmlFor="openDescription">Описание</label>
                        <textarea id="openDescription" name="openDescription" cols="30" rows="10" placeholder="Описание"></textarea>
                    </div>
                    <div className="buttons">
                        <Link to = "/medicalCard/card/change-record"><button className="ChangeScheduleRecordbutton">Изменить запись</button></Link>
                        <button className="ChangeScheduleRecordbutton">Печать</button>
                        <button className="ChangeScheduleRecordbutton">Удалить запись</button>
                    </div>
                </div>
            </form>
        </main>
    );
};

export default OpenTothRecordPage;
