import '../../assets/styles/global.css'
import '../../assets/styles/DoctorsStyles/StyleDoctors.css'
import SearchDoctors from '../../components/DoctorsComponents/SearchDoctors';
import DoctorsForm from '../../components/DoctorsComponents/DoctorsForm';


const DoctorsPage = () => {
    return(
        <div className="container">
      <main>
        <h1>Врачи</h1>
        <SearchDoctors />
        <DoctorsForm />
      </main>
    </div>
    );
};

export default DoctorsPage;