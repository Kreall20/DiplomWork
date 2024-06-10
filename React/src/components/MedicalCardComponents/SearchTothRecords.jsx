const SearchTothRecords = () => {
    return(
        <form className="Searchform" action="">
            <label htmlFor="searchToth"></label>
            <div className="searchblock">
                <input className="Search" id="searchPatient" type="text" placeholder="Поиск" />
            </div>
        </form>
    );
};

export default SearchTothRecords;