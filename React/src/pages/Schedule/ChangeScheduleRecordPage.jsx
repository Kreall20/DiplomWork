import '../../assets/styles/global.css'
import '../../assets/styles/ScheduleStyles/StyleChangeSchedule.css'

const ChangeScheduleRecordPage = () => {
    return (
        <div className="container">
            <main>
            <h1>Изменить запись</h1>
            <form className="ChangeScheduleRecord-form">
                <div className="form-container">
                    <div className="labelsinputs-container">
                    <div className="labels">
                        <label htmlFor="patientName">Пациент</label>
                        <label htmlFor="doctor">Врач</label>
                        <label htmlFor="datetime-local">Дата</label>
                    </div>
                    <div className="inputs">
                        <input type="text" id="patientName" name="patientName" placeholder="Пациент" />
                        <select name="doctors" id="">
                            <option value=""></option>
                        </select>
                        <input type="datetime-local" className="short" id="date" name="date"/>
                    </div>
                </div>
                    <div className="ChangeScheduleRecordbuttons">
                        <button className="ChangeRecordButton">Изменить запись</button>
                        <button className="ChangeRecordButton">Удалить запись</button>
                    </div>
                </div>
            </form>
        </main>
    </div>
    );
  };

  export default ChangeScheduleRecordPage;