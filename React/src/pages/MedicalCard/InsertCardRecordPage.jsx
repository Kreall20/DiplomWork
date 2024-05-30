import '../../assets/styles/global.css'
import '../../assets/styles/MedicalCardStyles/StyleInsertCardRecord.css'

const InsertCardRecordPage = () => {
    return(
        <main>
            <h1>Добавить запись в карточку</h1>
            <form className="InsertCardRecord-form">
                <div className="form-container">
                    <div className="labelsinputs-container">
                        <div className="insert-card-record-labels">
                            <label htmlFor="patientName">Пациент</label>
                            <label htmlFor="doctor">Врач</label>
                            <label htmlFor="datetime-local">Дата</label>
                            <label htmlFor="Toth">Зуб</label>
                        </div>
                        <div className="insert-card-record-inputs">
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
                    <button className="InserRecordButton">Добавить запись</button>
                </div>
            </form>
        </main>
    );
};

export default InsertCardRecordPage;
