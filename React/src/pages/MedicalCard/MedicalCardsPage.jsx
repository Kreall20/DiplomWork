import '../../assets/styles/global.css'
import '../../assets/styles/MedicalCardStyles/StyleCards.css'
import MedicalCardsForm from '../../components/MedicalCardComponents/MedicalCardsForm';
import SearcMedicalCard from '../../components/MedicalCardComponents/SearchMedicalCards';


const MedicalCardsPage = () => {
    return(
        <div className="container">
            <main>
            <h1>Мед. карточки</h1>
            <SearcMedicalCard />
            <MedicalCardsForm />
        </main>
    </div>
    );
};

export default MedicalCardsPage;