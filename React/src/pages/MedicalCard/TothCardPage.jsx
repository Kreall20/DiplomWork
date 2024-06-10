import '../../assets/styles/global.css'
import '../../assets/styles/MedicalCardStyles/StyleTeth.css'
import CardItems from '../../assets/images/CardItems.png'
import Teth from '../../assets/images/Teth.svg'
import { Link } from 'react-router-dom'

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};


const ToothCardPage = () => {
    return(
        <main>
            <div className="headername">
                <img src={CardItems} className="CardItemsIcon" alt=""/>
                <h1>Карточка Пациента</h1>
            </div>
            <form className="Searchform" action="">
                <label htmlFor="searchPatient"></label>
                <div className="searchblock">
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
            <div className="TothButtons">
                <Link to="/medicalCards/card/add-record"><button className="TothButton" onClick={scrollToTop}>Добавить запись</button></Link>
                <Link to="/medicalCards/card/open-records"><button className="TothButton" onClick={scrollToTop}>Открыть записи</button></Link>
                <Link to="/medicalCards/print"><button className="TothButton">Печать</button></Link>
                <Link to="/medicalCards/delete-card"><button className="TothButton">Удалить</button></Link>
            </div>
        </main>
    );
};

export default ToothCardPage;
