import '../../assets/styles/global.css'
import '../../assets/styles/MedicalCardStyles/StyleCreateCard.css'
import SearchPatientMedicalCard from '../../components/MedicalCardComponents/SearchPatientMedicalCard'
import PatientListForm from '../../components/MedicalCardComponents/PatientListForm'



const CreateCardPage = () => {
    return(
        <div className="container">
        <main>
        <h1>Создать карточку</h1>
        <SearchPatientMedicalCard />
        <PatientListForm />
    </main>
    </div>
    );
};

export default CreateCardPage;