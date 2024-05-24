import '../../assets/styles/global.css'
import '../../assets/styles/MedicalCardStyles/StyleTothRecords.css'

const TothRecordsForm = () => {
    return(
        <>
            <div className="CardsList">
            <form className="CardForm" action="">
                <div className="CardItem">
                    <label htmlFor="patient_name">Записи</label>
                    <input className="longer" type="text" id="patient_name" name="patient_name"/>
                </div>
                <div className="CardItem">
                    <label htmlFor="appointment_date">Время</label>
                    <input type="datetime-local" id="appointment_date" name="appointment_date"/>
                </div>
            </form>
            </div>
            <div className="CardsButtons">
                <button className="CardsButton">Добавить запись</button>
                <button className="CardsButton">Открыть запись</button>
                <button className="CardsButton">Удалить запись</button>
            </div>
        </>
    );
};

export default TothRecordsForm;