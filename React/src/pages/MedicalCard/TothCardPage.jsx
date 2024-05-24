import '../../assets/styles/global.css'
import '../../assets/styles/MedicalCardStyles/StyleTeth.css'
import Toth from '../../assets/images/Toth.svg'
import Teth from '../../assets/images/Teth.svg'


const TothCardPage = () => {
    return(
        <main>
        <div className="headername">
            <img src={Toth} className="Toth" alt=""/>
            <h1>Карточка Пациента</h1>
        </div>
        <form className="Searchform" action="">
            <label htmlFor="searchPatient"></label>
            <div className="serchblock">
                <input className="Search" id="searchPatient" type="text" placeholder="Поиск" />
            </div>
        </form>
        <div className="TethList">
            <div className="pictureTeth">
                <img src= {Teth} className="reverse" alt=""/>
                <img src= {Teth} alt=""/>
            </div>
        <form className="TethForm" action="">
            <div className="TethFormItem">
                <label htmlFor="Teth">Зуб</label>
                <select name="Teth" id="">
                    <option value=""></option>
                </select>
            </div>
        </form>
        </div>
        <div className="CardsButtons">
            <button className="CardsButton">Добавить запись</button>
            <button className="CardsButton">Открыть записи</button>
            <button className="CardsButton">Печать</button>
            <button className="CardsButton">Удалить</button>
        </div>
    </main>
    );
};

export default TothCardPage;