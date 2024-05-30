import '../../assets/styles/global.css'
import '../../assets/styles/ScheduleStyles/StyleSchedule.css'
import ScheduleForm from '../../components/ScheduleComponents/ScheduleForm';
import SearchForm from '../../components/ScheduleComponents/SearchSchedule';
import { Link } from 'react-router-dom'; 


const SchedulePage = () => {
    return (
        <div className="container">
        <main>
            <h1>График работы</h1>
            <SearchForm />
            <ScheduleForm />
            <div class="ScheduleButtons">
                    <Link to="/schedule/add">
                        <button className ="FormButtons">Добавить запись</button>
                    </Link>
                    <Link to="/schedule/open">
                        <button className="FormButtons">Открыть запись</button>
                    </Link>
                    <Link to="/schedule/delete">
                        <button className="FormButtons">Удалить запись</button>
                    </Link>
            </div>
        </main>
      </div>
    );
  };


export default SchedulePage;