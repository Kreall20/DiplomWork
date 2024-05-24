import '../../assets/styles/global.css'
import '../../assets/styles/DoctorsStyles/StyleDoctors.css'



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
            <button className="CardsButton">Добавить врача</button>
            <button className="CardsButton">Открыть данные врача</button>
            <button className="CardsButton">Показать график</button>
            <button className="CardsButton">Удалить</button>
            </div>
        </>
    );
};

export default DoctorsForm;