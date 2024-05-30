const SearchTothRecords = () => {
    return(
        <form className="Searchform" action="">
            <label htmlFor="searchToth"></label>
            {/* <div className="serchblock"> */}
                <input className="Search" id="searchPatient" type="text" placeholder="Поиск" />
        </form>
    );
};

export default SearchTothRecords;