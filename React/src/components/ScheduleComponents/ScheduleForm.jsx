import '../../assets/styles/global.css'
import '../../assets/styles/ScheduleStyles/StyleSchedule.css'

const ScheduleForm = () => {
    return (
      <div className="ScheduleList">
        <form className="Scheduleform" action="">
          <div className="ScheduleItem longer">
            <label htmlFor="patient_name">Пациент</label>
            <input type="text" id="patient_name" name="patient_name" />
          </div>
          <div className="ScheduleItem longer">
            <label htmlFor="doctor_name">Врач</label>
            <input  type="text" id="doctor_name" name="doctor_name" />
          </div>
          <div className="ScheduleItem">
            <label htmlFor="appointment_date">Время</label>
            <input type="datetime-local" id="appointment_date" name="appointment_date" />
          </div>
          <div className="ScheduleItem">
            <label htmlFor="appointment_completed">Прием окончен</label>
            <input type="checkbox" id="appointment_completed" name="appointment_completed" />
          </div>
        </form>
      </div>
    );
  };
  
  export default ScheduleForm;