import '../../assets/styles/global.css'
import '../../assets/styles/MedicalCardStyles/StyleCreateCard.css'

const SearchPatientMedicalCard = () => {
    return(
        <form class="Searchform" action="">
            <label htmlFor="searchPatient"></label>
            <div class="serchblock">
                <input class="Search" id="searchPatient" type="text" placeholder="Поиск" />
            </div>
        </form>
    );
};

export default SearchPatientMedicalCard;