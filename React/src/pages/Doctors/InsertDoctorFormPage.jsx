import '../../assets/styles/global.css'
import '../../assets/styles/DoctorsStyles/StyleInsertDoctor.css'


const InsertDoctorFormPage = () => {
    return(
        <div className="container">
        <h1>Добавить врача</h1>
        <form className="insertdoctor-form">
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
                <button className="Changebtn">Добавить врача</button>
            </div>
        </form>
    </div>
    );
};

export default InsertDoctorFormPage;