import '../../assets/styles/global.css'; 
import './Footer.css'; 
import { Link } from 'react-router-dom';
import logo from '../../assets/images/Иконка.svg';
import youtubeicon from "../../assets/images/youtube.png"
import telegramicon from "../../assets/images/telegram.png"
import instagramicon from "../../assets/images/instagram.png"


const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const Footer = ({userType}) => {
    return (
        <footer>
            <div className="container">
                <div className="footer-elements">
                    <div className="icon">
                        <img src = {logo} alt=""/>
                        <div className="title">центр стомат<span>о</span>логии</div>
                    </div> 
                    <ul className="ul-buttons">
                        <li><Link to="/" className='links'>Главная</Link></li>
                        <li><Link to="/schedule" className='links' onClick={scrollToTop}>График работы</Link></li>
                        <li><Link to="/medicalCards" className='links' onClick={scrollToTop}>Карточки пациентов</Link></li>
                        {userType === "admin" && (
                            <>
                                <li><Link to="/doctors" className='links' onClick={scrollToTop}>Врачи</Link></li>
                                <li><Link to="/reports" className='links' onClick={scrollToTop}>Отчеты</Link></li>
                            </>
                            )}
                    </ul> 
                    <div className="buttons">
                    <Link to="/login">
                    <button className="Loginbtn" onClick={scrollToTop}>Log in</button>
                    </Link>
                    </div>
                </div>
            </div>
            <div className="footer-line"></div>
            <div className="container">
                <div className="footerlinks">
                    <span>@2024 Мы любим наших пациентов</span>
                    <div className="social-networks">
                        <span>Follow us: </span>
                        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                            <img src={youtubeicon} alt="" className="soc_network" />
                        </a>
                        <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
                            <img src={telegramicon} alt="" className="soc_network" />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <img src={instagramicon} alt="" className="soc_network" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
