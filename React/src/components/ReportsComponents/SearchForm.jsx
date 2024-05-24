import '../../assets/styles/global.css'
import '../../assets/styles/ReportsStyles/StyleReports.css'

const SearchForm = () => {
    return (
      <form className="Searchform" action="">
        <label htmlFor="searchPatient"></label>
        <div className="serchblock">
          <input className="Search" id="searchPatient" type="text" placeholder="Поиск" />
        </div>
      </form>
    );
  };
  
  export default SearchForm;