import '../../assets/styles/global.css'
import '../../assets/styles/MedicalCardStyles/StyleChangeCard.css'

const ChangeCardPage = () => {
    return (
      <div className="container">
        <main>
          <h1>Изменить запись</h1>
          <form className="change-card-form">
            <div className="change-card-form-container">
              <div className="change-card-labels-inputs-container">
                <div className="change-card-labels">
                  <label htmlFor="patientName">Пациент</label>
                  <label htmlFor="doctor">Врач</label>
                  <label htmlFor="datetime-local">Дата</label>
                  <label htmlFor="Toth">Зуб</label>
                </div>
                <div className="change-card-inputs">
                  <input type="text" id="patientName" name="patientName" placeholder="Пациент" />
                  <select name="doctors" id="doctorSelect">
                    <option value=""></option>
                  </select>
                  <input type="datetime-local" className="short" id="date" name="date" />
                  <select name="Teth" className="short" id="TothInput">
                    <option value=""></option>
                  </select>
                </div>
              </div>
              <div className="change-card-buttons">
                <button className="change-card-button">Изменить запись</button>
                <button className="change-card-button">Удалить запись</button>
              </div>
            </div>
          </form>
        </main>
      </div>
    );
};

export default ChangeCardPage;
