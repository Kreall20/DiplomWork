import '../../assets/styles/global.css'
import '../../assets/styles/MedicalCardStyles/StyleCreateCard.css'

const MedicalCardsForm = () => {
    return(
        <>
            <div className="PatientsList">
            <form className="PatientForm" action="">
                <div className="PatientFormItem">
                    <label htmlFor="patient_name">Пациент</label>
                    <input className="longer" type="text" id="patient_name" name="patient_name"/>
                </div>
                </form>
            </div>
            <div className="CardsButtons">
                <button className="CardsButton">Добавить карточку</button>
            </div>
        </>
    );
};

export default MedicalCardsForm;
