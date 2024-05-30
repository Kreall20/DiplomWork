import '../../assets/styles/global.css'
import '../../assets/styles/MedicalCardStyles/StyleCards.css'
import { Link } from 'react-router-dom'; 


const MedicalCardsForm = () => {
    return(
        <>
            <div class="CardsList">
                <form class="CardForm" action="">
                    <div class="CardItem">
                        <label for="patient_name">Пациент</label>
                        <input class="longer" type="text" id="patient_name" name="patient_name"/>
                    </div>
                </form>
                </div>
                <div class="CardsButtons">
                    <Link to="/medicalCards/add-card"><button class="CardsButton">Добавить карточку</button></Link>
                    <Link to="/medicalCards/open-card"><button class="CardsButton">Открыть карточку</button></Link>
                    <Link to="/medicalCards/print"><button class="CardsButton">Печать</button></Link>
                    <Link to="/medicalCards/delete-card"><button class="CardsButton">Удалить карточку</button></Link>
                </div>
            </>
    );
};

export default MedicalCardsForm;