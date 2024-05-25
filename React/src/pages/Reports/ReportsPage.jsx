import '../../assets/styles/global.css'
import '../../assets/styles/ReportsStyles/StyleReports.css'
import DateReportForm from '../../components/ReportsComponents/DateReport';
import ScheduleForm from '../../components/ReportsComponents/ScheduleForm';
import SearchForm from '../../components/ReportsComponents/SearchForm';

const ReportsPage = () => {
    return (
      <div className="container">
        <main>
          <h1>Отчеты</h1>
          <SearchForm />
          <ScheduleForm />
          <DateReportForm />
          <div className="ReportButtons">
            <button className="ReportButton">Печать</button>
          </div>
        </main>
      </div>
    );
  };
  
  export default ReportsPage;