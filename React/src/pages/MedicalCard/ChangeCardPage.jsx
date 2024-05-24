import '../../assets/styles/global.css'
import '../../assets/styles/MedicalCardStyles/StyleChangeCard.css'



const ChangeCardPage = () => {
    return (
      <div className="container">
        <main>
          <h1>Изменить запись</h1>
          <form className="ChangeCard-form">
            <div className="form-container">
              <div className="labelsinputs-container">
                <div className="labels">
                  <label htmlFor="patientName">Пациент</label>
                  <label htmlFor="doctor">Врач</label>
                  <label htmlFor="datetime-local">Дата</label>
                  <label htmlFor="Toth">Зуб</label>
                </div>
                <div className="inputs">
                  <input type="text" id="patientName" name="patientName" placeholder="Пациент" />
                  <select name="doctors" id="">
                    <option value=""></option>
                  </select>
                  <input type="datetime-local" className="short" id="date" name="date" />
                  <select name="Teth" className="short" id="TothInput">
                    <option value=""></option>
                  </select>
                </div>
              </div>
              <div className="ChangeScheduleRecordbuttons">
                <button className="ChangeScheduleRecordbutton">Изменить запись</button>
                <button className="ChangeScheduleRecordbutton">Удалить запись</button>
              </div>
            </div>
          </form>
        </main>
      </div>
    );
  };
  
  export default ChangeCardPage;