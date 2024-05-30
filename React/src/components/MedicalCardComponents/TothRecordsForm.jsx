import '../../assets/styles/global.css'
import '../../assets/styles/MedicalCardStyles/StyleTothRecords.css'

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
                <button className="RecordsButton">Добавить запись</button>
                <button className="RecordsButton">Открыть запись</button>
                <button className="RecordsButton">Удалить запись</button>
            </div>
        </>
    );
};

export default TothRecordsForm;