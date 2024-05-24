import '../../assets/styles/global.css'
import '../../assets/styles/DoctorsStyles/StyleOpenDoctor.css'


const OpenDoctorFormPage = () => {
    return(
        <div className="container">
        <h1>Врач</h1>
        <form className="opendoctor-form">
            <div className="form-container">
                <div className="labelsinputs-container">
                    <div className="labels">
                        <label htmlFor="username">ФИО</label>
                        <label htmlFor="username">Логин</label>
                        <label htmlFor="username">Пароль</label>
                    </div>
                    <div className="inputs">
                        <input type="text" id="username" className="FIO" name="username" placeholder="Фио"/>
                        <input type="text" id="username" name="username" placeholder="Логин"/>
                        <input type="password" id="username" name="username" placeholder="Пароль"/>
                    </div>
                </div>
                <div className="OpenDoctorButtons">
                    <button className="OpenDoctorButton">Изменить</button>
                    <button className="OpenDoctorButton">Удалить</button>
                </div>
            </div>
        </form>
        </div>
    );
};

export default OpenDoctorFormPage;

