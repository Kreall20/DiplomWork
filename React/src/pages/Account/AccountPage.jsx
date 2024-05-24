import '../../assets/styles/global.css'
import '../../assets/styles/AccountStyles/accountstyle.css'

const AccountPage = () => {
    return(
        <div className="container">
            <h1>Вход</h1>
        <form className="login-form">
            <div className="form-container">
                <div className="form-group first">
                    <label htmlFor="username">Логин</label>
                    <input type="text" id="username" name="username" placeholder="Введите ваш логин"/>
                </div>
                <div className="form-group second">
                    <label htmlFor="password">Пароль</label>
                    <input type="password" id="password" name="password" placeholder="Введите ваш пароль"/>
                </div>
                <div className="remember-me">
                    <input type="checkbox" id="remember"/>
                    <label htmlFor="remember">Запомни меня</label>
                </div>
                <div className="buttons">
                    <button className="Loginbtn">Log in</button>
                    <button className="Signinbtn">Sign in</button>
                </div>
            </div>
        </form>
    </div>
    );
};

export default AccountPage;
