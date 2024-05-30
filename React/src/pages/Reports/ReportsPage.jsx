import '../../assets/styles/global.css'
import '../../assets/styles/ReportsStyles/StyleReports.css'
import DateReportForm from '../../components/ReportsComponents/DateReport';
import ReportForm from '../../components/ReportsComponents/ReportForm';
import SearchForm from '../../components/ReportsComponents/SearchForm';

const ReportsPage = () => {
    return (
      <div className="container">
        <main>
          <h1>Отчеты</h1>
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