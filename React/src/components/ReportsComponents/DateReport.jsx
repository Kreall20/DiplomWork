import '../../assets/styles/global.css'
import '../../assets/styles/ReportsStyles/StyleReports.css'

const DateReportForm = () => {
    return (
      <form action="" className="dateReport">
        <div className="date">
          <div className="onedate">
            <label htmlFor="">Дата</label>
            <input type="date" name="" id="" />
          </div>
          <div className="twodate">
            <div className="firstdate">
              <label htmlFor="">От</label>
              <input className="diff" type="date" name="" id="" />
            </div>
            <div className="seconddate">
              <label htmlFor="">До</label>
              <input className="diff" type="date" name="" id="" />
            </div>
          </div>
        </div>
      </form>
    );
  };
  
  export default DateReportForm;