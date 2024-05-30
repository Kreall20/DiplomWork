import '../../assets/styles/global.css'
import '../../assets/styles/AccountStyles/accountstyle.css'



const SearchDoctors = () => {
  return(
      <form className="search-form" action="">
        <label htmlFor="searchDoctor"></label>
        <div className="search-block">
          <input className="search" id="searchDoctor" type="text" placeholder="Поиск" />
        </div>
      </form>
  );
};

export default SearchDoctors;