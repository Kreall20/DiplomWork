import '../../assets/styles/global.css'
import '../../assets/styles/NotificationsStyles/StyleNotifications.css'

const Confirmation = () => {
    return(
        <div className="Acception">
            <h3>Вы Уверены ?</h3>
            <div class="AcceptionButtons">
                <button>Да</button>
                <button>Отмена</button>
            </div>
        </div>
    );
};

export default Confirmation;