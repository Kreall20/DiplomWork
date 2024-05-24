import '../../assets/styles/global.css'
import '../../assets/styles/MedicalCardStyles/StyleTothRecords.css'
import SearchTothRecords from '../../components/MedicalCardComponents/SearchTothRecords';
import TothRecordsForm from '../../components/MedicalCardComponents/TothRecordsForm';


const MedicalCardsForm = () => {
    return(
        <main>
        <h1>Записи зуба</h1>
        <SearchTothRecords />
        <TothRecordsForm />
    </main>
    );
};

export default MedicalCardsForm;