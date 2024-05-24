import '../../assets/styles/global.css'
import '../../assets/styles/MedicalCardStyles/StyleTothRecords.css'

const SearchTothRecords = () => {
    return(
        <form className="Searchform" action="">
            <label htmlFor="searchPatient"></label>
            {/* <div className="serchblock"> */}
                <input className="Search" id="searchPatient" type="text" placeholder="Поиск" />
        </form>
    );
};

export default SearchTothRecords;