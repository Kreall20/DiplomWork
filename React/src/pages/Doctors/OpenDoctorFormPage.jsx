import '../../assets/styles/global.css';
import '../../assets/styles/DoctorsStyles/StyleOpenDoctor.css';

const OpenDoctorFormPage = () => {
    return(
        <div className="container">
            <h1>Врач</h1>
            <form className="open-doctor-form">
                <div className="open-doctor-form-container">
                    <div className="open-doctor-labels-inputs-container">
                        <div className="open-doctor-labels">
                            <label htmlFor="fio">ФИО</label>
                            <label htmlFor="login">Логин</label>
                            <label htmlFor="password">Пароль</label>
                            <label htmlFor="Phone">Телефон</label>
                        </div>
                        <div className="open-doctor-inputs">
                            <input type="text" id="fio" className="fio" name="fio" placeholder="ФИО"/>
                            <input type="text" id="login" name="login" placeholder="Логин"/>
                            <input type="password" id="password" name="password" placeholder="Пароль"/>
                            <input type="text" id='phone' name='phone' placeholder='Номер телефона' />
                        </div>
                    </div>
                    <div className="open-doctor-buttons">
                        <button className="open-doctor-button">Изменить</button>
                        <button className="open-doctor-button">Удалить</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default OpenDoctorFormPage;
