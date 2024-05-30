import '../../assets/styles/global.css'
import '../../assets/styles/DoctorsStyles/StyleInsertDoctor.css'


const InsertDoctorFormPage = () => {
    return(
        <div className="container">
            <h1>Добавить врача</h1>
            <form className="insert-doctor-form">
                <div className="insert-doctor-form-container">
                    <div className="insert-doctor-labels-inputs-container">
                        <div className="insert-doctor-labels">
                            <label htmlFor="fio">ФИО</label>
                            <label htmlFor="login">Логин</label>
                            <label htmlFor="password">Пароль</label>
                        </div>
                        <div className="insert-doctor-inputs">
                            <input type="text" id="fio" className="fio" name="fio" placeholder="Фио"/>
                            <input type="text" id="login" name="login" placeholder="Логин"/>
                            <input type="password" id="password" name="password" placeholder="Пароль"/>
                        </div>
                    </div>
                    <button className="insert-doctor-button">Добавить врача</button>
                </div>
            </form>
        </div>
    );
};

export default InsertDoctorFormPage;
