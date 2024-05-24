// import '../../assets/styles/global.css';
import React, { useContext } from "react";
import { ThemeContext } from '../../providers/ThemeProvider';
import './Header.css'; 
import logo from '../../assets/images/Иконка.svg'; 
import sunIcon from '../../assets/images/light-theme.png'; 
import moonIcon from '../../assets/images/dark-theme.png'; 


const Header = () => {

    const [theme, setTheme] = useContext(ThemeContext);

  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };


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
                <li>Главная</li>
                <li>Графки работы</li>
                <li>Карточки пациентов</li>
                <li>Врачи</li>
                <li>Отчеты</li>
            </ul>  
            <div className="buttons">
                <button className="Loginbtn">Log in</button>
                <button className="Signinbtn">Sign in</button>
                <button className="Logoutbtn">Log out</button>
                <button className="theme-button" onClick={changeTheme}>
                    <img src={theme === "light" ? moonIcon : sunIcon} alt="theme-icon" className="theme-icon"/>
                </button>
            </div>
            </div>
            </div>
        </header>
    );
};

export default Header;