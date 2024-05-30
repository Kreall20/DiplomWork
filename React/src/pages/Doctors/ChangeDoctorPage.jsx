import '../../assets/styles/global.css'
import '../../assets/styles/DoctorsStyles/StyleChangeDoctor.css'


const ChangeDoctorPage = () => {
    return(
        <div className="container">
            <h1>Изменить данные врача</h1>
            <form className="change-doctor-form">
                <div className="change-doctor-form-container">
                    <div className="change-doctor-labels-inputs-container">
                        <div className="change-doctor-labels">
                            <label htmlFor="fio">ФИО</label>
                            <label htmlFor="login">Логин</label>
                            <label htmlFor="password">Пароль</label>
                        </div>
                        <div className="change-doctor-inputs">
                            <input type="text" id="fio" className="fio" name="fio" placeholder="Фио"/>
                            <input type="text" id="login" name="login" placeholder="Логин"/>
                            <input type="password" id="password" name="password" placeholder="Пароль"/>
                        </div>
                    </div>
                    <button className="change-doctor-button">Изменить данные врача</button>
                </div>
            </form>
        </div>
    );
};

export default ChangeDoctorPage;
