import '../../assets/styles/global.css'
import '../../assets/styles/MedicalCardStyles/StyleOpenTothRecord.css'
import { Link } from 'react-router-dom';


const OpenTothRecordPage = () => {
    return(
        <main>
        <h1>Запись</h1>
        <form className="OpenTothRecord-form">
            <div className="form-container">
                <div className="labelsinputs-container">
                    <div className="labels">
                        <label htmlFor="patientName">Пациент</label>
                        <label htmlFor="doctor">Врач</label>
                        <label htmlFor="datetime-local">Дата</label>
                        <label htmlFor="Toth">Зуб</label>
                    </div>
                    <div className="inputs">
                        <input type="text" id="patientName" name="patientName" placeholder="Пациент"/>
                        <select name="doctors" id="">
                            <option value=""></option>
                        </select>
                        <input type="datetime-local" className="short" id="date" name="date"/>
                        <select name="Teth" className="short" id="TothInput">
                            <option value=""></option>
                        </select>
                    </div>
                </div>
                <div className="Description">
                    <label htmlFor="Desc">Описание</label>
                    <textarea name="" id="" cols="30" rows="10" placeholder="Описание"></textarea>
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