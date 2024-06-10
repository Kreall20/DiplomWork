import '../../assets/styles/global.css'
import '../../assets/styles/MedicalCardStyles/StyleCards.css'
import MedicalCardsForm from '../../components/MedicalCardComponents/MedicalCardsForm';
import SearcMedicalCard from '../../components/MedicalCardComponents/SearchMedicalCards';
import Card from "../../assets/images/Card.png"

const MedicalCardsPage = () => {
    return(
        <div className="container">
            <main>
            <div className="headername">
                <img src={Card} className="CardIcon" alt=""/>
                <h1>Мед. карточки</h1>
            </div>
            <SearcMedicalCard />
            <MedicalCardsForm />
        </main>
    </div>
    );
};

export default MedicalCardsPage;