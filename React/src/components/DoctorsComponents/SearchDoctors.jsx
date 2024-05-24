import '../../assets/styles/global.css'
import '../../assets/styles/AccountStyles/accountstyle.css'



const SearchDoctors = () => {
    return(
        <form className="Searchform" action="">
          <label htmlFor="searchPatient"></label>
          <div className="searchblock">
            <input className="Search" id="searchPatient" type="text" placeholder="Поиск" />
          </div>
        </form>
    );
};

export default SearchDoctors;