import '../../assets/styles/global.css'
import '../../assets/styles/ScheduleStyles/StyleSchedule.css'
import ScheduleForm from '../../components/ScheduleComponents/ScheduleForm';
import SearchForm from '../../components/ScheduleComponents/SearchSchedule';


const SchedulePage = () => {
    return (
        <div className="container">
        <main>
            <h1>График работы</h1>
            <SearchForm />
            <ScheduleForm />
            <div class="ScheduleButtons">
                <button class="FormButtons">Добавить запись</button>
                <button class="FormButtons">Открыть запись</button>
                <button class="FormButtons">Удалить запись</button>
            </div>
        </main>
      </div>
    );
  };


export default SchedulePage;