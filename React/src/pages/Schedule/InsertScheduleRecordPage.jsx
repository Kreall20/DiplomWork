import '../../assets/styles/global.css'
import '../../assets/styles/ScheduleStyles/StyleScheduleInsertRecord.css'

const InsertScheduleRecordPage = () => {
    return (
        <div className="container">
             <main>
            <h1>Добавить запись</h1>
            <form className="InsertScheduleRecord-form">
                <div className="form-container">
                    <div className="labelsinputs-container">
                        <div className="labels">
                            <label htmlFor="patientName">Пациент</label>
                            <label htmlFor="doctor">Врач</label>
                            <label htmlFor="datetime-local">Дата</label>
                        </div>
                        <div className="inputs">
                            <input type="text" id="patientName" name="patientName" placeholder="Пациент"/>
                            <select name="doctors" id="">
                                <option value=""></option>
                            </select>
                            <input type="datetime-local" className="short" id="date" name="date"/>
                        </div>
                    </div>
                    <button className="InserRecordButton">Добавить запись</button>
                </div>
            </form>
        </main>
    </div>
    );
  };

  export default InsertScheduleRecordPage;