import '../../assets/styles/global.css'
import '../../assets/styles/NotificationsStyles/StyleNotifications.css'

const ScheduleNotification = () => {
    return(
        <div className="container">
            <div className="Notification">
                <div className="labelContainer">
                    <label htmlFor="">Сейчас на записи</label>
                    <label htmlFor="">Следующий в очереди</label>
                </div>
                <div className="inputContainer">
                    <input type="text" />
                    <div className="nextPatient">
                        <input type="text" />
                        <input type="date" name="" id="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScheduleNotification;