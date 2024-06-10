import '../../assets/styles/global.css'
import '../../assets/styles/MedicalCardStyles/StyleCreateCard.css'

const SearchPatientMedicalCard = () => {
    return(
        <form className="search-form" action="">
            <label htmlFor="searchPatient"></label>
            <div className="searchblock">
                <input className="search" id="searchPatient" type="text" placeholder="Поиск" />
            </div>
        </form>
    );
};

export default SearchPatientMedicalCard;
