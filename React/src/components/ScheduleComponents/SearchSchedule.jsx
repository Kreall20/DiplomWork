import '../../assets/styles/global.css'
import '../../assets/styles/ScheduleStyles/StyleSchedule.css'

const SearchForm = () => {
    return (
      <form className="Searchform" action="">
          <div className="searchblock">
          <label htmlFor="sortdesasc" className='label'>Сортировать по</label>
          <select name="sortdesasc" id="">
              <option value="ascending">возрастанию</option>
              <option value="descending">убыванию</option>
            </select>
          <select className = "searchselect" name="fieldsort" id="">
                <option value="patient">Имени Пациента</option>
                <option value="doctor">Имени Врача</option>
                <option value="date">Даты</option>
            </select>
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