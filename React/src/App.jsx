import { useState } from 'react'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/styles/global.css'
import Account from './pages/Account/AccountPage.jsx'
import ChangeAccount from './pages/Account/ChangeAccountPage.jsx'
import Doctors from './pages/Doctors/DoctorsPage.jsx'
import OpenDoctorForm from './pages/Doctors/OpenDoctorFormPage.jsx'
import ChangeDoctorForm from './pages/Doctors/ChangeDoctorPage.jsx'
import InsertDoctorForm from './pages/Doctors/InsertDoctorFormPage.jsx'
import ChangeCardPage from './pages/MedicalCard/ChangeCardPage.jsx'
import CreateCardPage from './pages/MedicalCard/CreateCardPage.jsx'
import InsertCardRecordPage from './pages/MedicalCard/InsertCardRecordPage.jsx'
import MedicalCardsPage from './pages/MedicalCard/MedicalCardsPage.jsx'
import OpenTothRecordPage from './pages/MedicalCard/OpenTothRecord.jsx'
import TothCardPage from './pages/MedicalCard/TothCardPage.jsx'
import TothRecordsPage from './pages/MedicalCard/TothRecordsPage.jsx'
import ScheduleNotification from './components/NotificationsComponents/ScheduleNotification.jsx'
import Confirmation from './components/NotificationsComponents/Сonfirmation.jsx'
import ReportsPage from './pages/Reports/ReportsPage.jsx'
import ChangeScheduleRecordPage from './pages/Schedule/ChangeScheduleRecordPage.jsx'
import InsertScheduleRecordPage from './pages/Schedule/InsertScheduleRecordPage.jsx'
import OpenScheduleRecordPage from './pages/Schedule/OpenScheduleRecordPage.jsx'
import SchedulePage from './pages/Schedule/SchedulePage.jsx'
import { ThemeProvider } from './providers/ThemeProvider.jsx';
import DoctorsPage from './pages/Doctors/DoctorsPage.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ThemeProvider>
    <Router>
      <Header />

      {/* <SchedulePage /> */}
      {/* {/* <Account />   */}
      {/* <ChangeAccount />  */}

      {/* <Doctors /> */}
      {/* <OpenDoctorForm />
      <InsertDoctorForm />
      <ChangeDoctorForm />

      <ChangeCardPage />
      <CreateCardPage />
      <InsertCardRecordPage /> */}

      {/* <MedicalCardsPage /> */}

      {/* <OpenTothRecordPage />
      <TothCardPage />
      <TothRecordsPage />

      <ScheduleNotification />
      <Confirmation /> */}
      {/* Разобраться с размером */}

      {/* <ReportsPage />  */}
      {/* Разобраться с формой */}
      
      {/* <ChangeScheduleRecordPage />
      <InsertScheduleRecordPage />
      <OpenScheduleRecordPage />
      <SchedulePage /> */}

      {/* <OpenTothRecordPage /> */}

      <Routes>
          <Route path="/" element={<SchedulePage />} />
          <Route path="/medicalCards" element={<MedicalCardsPage />} />


          <Route path="/schedule" element={<SchedulePage />} />


          <Route path="/doctors" element={<DoctorsPage />} />
          {/* <Route path="/doctors/insertDoctor" element={<InsertDoctorFormPage/>} /> */}
          {/* <Route path="/doctors/openDoctor" element={<OpenDoctorFormPage />} />
          <Route path="/doctors/schedule" element={<SchedulePage />} /> */}

          <Route path="/reports" element={<ReportsPage />} />

        </Routes>

      <Footer />
      </Router>
      </ThemeProvider>
    </>
  )
}

export default App
