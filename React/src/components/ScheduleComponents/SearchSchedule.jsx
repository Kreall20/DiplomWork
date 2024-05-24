import '../../assets/styles/global.css'
import '../../assets/styles/ScheduleStyles/StyleSchedule.css'

const SearchForm = () => {
    return (
      <form className="Searchform" action="">
        <label htmlFor="searchPatient"></label>
        <div className="serchblock">
          <input className="Search" id="searchPatient" type="text" placeholder="Поиск" />
        </div>
        {/* нужно попробовать добавить лупу */}
      </form>
    );
  };
  
  export default SearchForm;