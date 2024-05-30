import '../../assets/styles/global.css'
import '../../assets/styles/ReportsStyles/StyleReports.css'

const ReportForm = () => {
  return (
    <div className="ReportList">
      <form className="ReportForm" action="">
        <div className="ReportItem longer">
          <label htmlFor="patient_name">Пациент</label>
          <input type="text" id="patient_name" name="patient_name" />
        </div>
        <div className="ReportItem longer">
          <label htmlFor="doctor_name">Врач</label>
          <input type="text" id="doctor_name" name="doctor_name" />
        </div>
        <div className="ReportItem">
          <label htmlFor="appointment_date">Время</label>
          <input type="datetime-local" id="appointment_date" name="appointment_date" />
        </div>
        <div className="ReportItem payment">
          <label htmlFor="payment">Оплата</label>
          <input type="text" id="payment" name="payment" />
        </div>
        <div className="ReportItem check">
          <label htmlFor="appointment_completed">Прием окончен</label>
          <input type="checkbox" id="appointment_completed" name="appointment_completed" />
        </div>
      </form>
    </div>
  );
};
  
export default ReportForm;