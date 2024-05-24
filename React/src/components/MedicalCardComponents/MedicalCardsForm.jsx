import '../../assets/styles/global.css'
import '../../assets/styles/MedicalCardStyles/StyleCards.css'



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
                    <button class="CardsButton">Добавить карточку</button>
                    <button class="CardsButton">Открыть карточку</button>
                    <button class="CardsButton">Печать</button>
                    <button class="CardsButton">Удалить карточку</button>
                </div>
            </>
    );
};

export default MedicalCardsForm;