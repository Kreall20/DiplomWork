import '../../assets/styles/global.css'
import '../../assets/styles/DoctorsStyles/StyleDoctors.css'
import DoctorsForm from '../../components/DoctorsComponents/DoctorsForm';
import dentist from "../../assets/images/dentist.png"

const DoctorsPage = () => {
    return(
        <div className="container">
      <main>
      <div className="headername">
                <img src={dentist} className="dentistIcon" alt=""/>
                <h1>Врачи</h1>
            </div>
        <DoctorsForm />
      </main>
    </div>
    );
};

export default DoctorsPage;