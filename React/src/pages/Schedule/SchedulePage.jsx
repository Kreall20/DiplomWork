import '../../assets/styles/global.css'
import '../../assets/styles/ScheduleStyles/StyleSchedule.css'
import ScheduleForm from '../../components/ScheduleComponents/ScheduleForm';
import SearchForm from '../../components/ScheduleComponents/SearchSchedule';
import { Link } from 'react-router-dom'; 
import ScheduleIcon from "../../assets/images/Schedule.png"


const SchedulePage = () => {
    return (
        <div className="container">
        <main>
            <div className="headername">
                <img src={ScheduleIcon} className="PartitionIcon" alt=""/>
                <h1>Карточка Пациента</h1>
            </div>
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