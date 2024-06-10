import '../../assets/styles/global.css'
import '../../assets/styles/ReportsStyles/StyleReports.css'
import DateReportForm from '../../components/ReportsComponents/DateReport';
import ReportForm from '../../components/ReportsComponents/ReportForm';
import SearchForm from '../../components/ReportsComponents/SearchForm';
import Report from "../../assets/images/Report.png"

const ReportsPage = () => {
    return (
      <div className="container">
        <main>
        <div className="headername">
                <img src={Report} className="Report" alt=""/>
                <h1>Отчеты</h1>
            </div>
          <SearchForm />
          <ReportForm />
          <DateReportForm />
          <div className="ReportButtons">
            <button className="ReportButton">Печать</button>
          </div>
        </main>
      </div>
    );
  };
  
  export default ReportsPage;