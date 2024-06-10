// import '../../assets/styles/global.css';
import React, { useContext } from "react";
import { ThemeContext } from '../../providers/ThemeProvider';
import { Link } from 'react-router-dom';
import './Header.css'; 
import logo from '../../assets/images/Иконка.svg'; 
import sunIcon from '../../assets/images/light-theme.png'; 
import moonIcon from '../../assets/images/dark-theme.png'; 


const Header = ({ userType }) => {

    const [theme, setTheme] = useContext(ThemeContext);

  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const isAuth  = true;

    return(
<header>
<div className="container">
            <div className="logo"></div>
            <div className="header-elements">
                <div className="icon">
                    <img src={logo} alt=""/>
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
                    {isAuth === false ? (
                        <Link to="/login">
                            <button className="Loginbtn">Log in</button>
                        </Link>
                        ) : (
                        <Link to="/changeaccount">
                            <button className="Loginbtn">Изменить</button>
                        </Link>
                        )
                    }
                <Link to="/login">
                    <button className="Logoutbtn">Log out</button>
                    </Link>
                <button className="theme-button" 
                    onClick={changeTheme}>
                    <img src=
                    {theme === "light" ? moonIcon : sunIcon} 
                    alt="theme-icon"
                    className="theme-icon"/>
                </button>
            </div>
            </div>
            </div>
        </header>
    );
};

export default Header;