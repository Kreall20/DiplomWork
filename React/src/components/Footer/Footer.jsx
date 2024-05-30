import '../../assets/styles/global.css'; 
import './Footer.css'; 
import { Link } from 'react-router-dom';
import logo from '../../assets/images/Иконка.svg';

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
                        <li><Link to="/schedule" className='links'>График работы</Link></li>
                        <li><Link to="/medicalCards" className='links'>Карточки пациентов</Link></li>
                        {userType === "admin" && (
                            <>
                                <li><Link to="/doctors" className='links'>Врачи</Link></li>
                                <li><Link to="/reports" className='links'>Отчеты</Link></li>
                            </>
                            )}
                    </ul> 
                    <div className="buttons">
                        <button className="Loginbtn">Log in</button>
                        <button className="Signinbtn">Sign in</button>
                    </div>
                </div>
            </div>
            <div className="footer-line"></div>
            <div className="container">
                <div className="footerlinks">
                    <span>@2024 Мы любим наших пациентов</span>
                    <div className="social-networks">
                        <span>Follow us: </span>
                        <div className="soc_network"></div>
                        <div className="soc_network"></div>
                        <div className="soc_network"></div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
