import '../../assets/styles/global.css'
import '../../assets/styles/ReportsStyles/StyleReports.css'

const SearchForm = () => {
    return (
      <form className="Searchform" action="">
        <label htmlFor="searchField"></label>
        <div className="searchblock">
          <input className = "searchdate" type="datetime-local" />
          <select className = "searchselect" name="doctors" id="">
              <option value="" disabled selected>Врач</option>
          </select>
          <input className="Search" id="searchPatient" type="text" placeholder="Поиск" />
          <button>Поиск</button>
        </div>
      </form>
    );
  };
  
  export default SearchForm;