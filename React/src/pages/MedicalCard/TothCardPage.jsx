import '../../assets/styles/global.css'
import '../../assets/styles/MedicalCardStyles/StyleTeth.css'
import Toth from '../../assets/images/Toth.svg'
import Teth from '../../assets/images/Teth.svg'
import { Link } from 'react-router-dom'

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
            <Link to="/medicalCards/card/add-record"><button class="CardsButton">Добавить запись</button></Link>
            <Link to="/medicalCards/card/open-records"><button class="CardsButton">Открыть записи</button></Link>
            <Link to="/medicalCards/print"><button class="CardsButton">Печать</button></Link>
            <Link to="/medicalCards/delete-card"><button class="CardsButton">Удалить</button></Link>
        </div>
    </main>
    );
};

export default TothCardPage;