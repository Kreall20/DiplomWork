import '../../assets/styles/global.css'
import '../../assets/styles/AccountStyles/changeaccount.css'
import Profile from "../../assets/images/Profile.png";


const ChangeAccountPage = () => {
    return(
        <div class="container">
            <div className="headername">
                <img src={Profile} className="ProfileIcon" alt=""/>
                <h1>Изменить аккаунт</h1>
            </div>
        <form class="changeaccount-form">
            <div class="form-container">
            <div className="form-group">
                    <label htmlFor="username">ФИО</label>
                    <input type="text" id="username" class="FIO" name="username" placeholder="Фио"/>
                </div>
            <div className="form-group">
                    <label htmlFor="username">Логин</label>
                    <input type="text" id="username" name="username" placeholder="Введите ваш логин"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль</label>
                    <input type="password" id="password" name="password" placeholder="Введите ваш пароль"/>
                </div>
                {/* <div class="labelsinputs-container">
                    <div class="labels">
                        <label htmlFor="username">ФИО</label>
                        <label htmlFor="username">Логин</label>
                        <label htmlFor="username">Пароль</label>
                    </div>
                    <div class="inputs">
                        <input type="text" id="username" class="FIO" name="username" placeholder="Фио"/>
                        <input type="text" id="username" name="username" placeholder="Логин"/>
                        <input type="password" id="username" name="username" placeholder="Пароль"/>
                    </div>
                </div> */}
                <button class="Changebtn">Изменить данные</button>
            </div>
        </form>
    </div>
    );
};

export default ChangeAccountPage;