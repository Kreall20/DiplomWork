import { useState } from 'react'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/styles/global.css'
import ChangeAccount from './pages/Account/ChangeAccountPage.jsx'
import Doctors from './pages/Doctors/DoctorsPage.jsx'
import OpenDoctorFormPage from './pages/Doctors/OpenDoctorFormPage.jsx'
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
import AdminPage from './pages/Account/AdminPage.jsx';
import AccountPage from './pages/Account/AccountPage.jsx';
import InsertDoctorFormPage from './pages/Doctors/InsertDoctorFormPage.jsx';

function App() {
  const usertype = 'admin';
  return (
    <>
    <ThemeProvider>
    <Router >
      <Header userType = {usertype}/>
    <Routes>
              <Route path="/" element={<AccountPage />} />
              <Route path="/login" element={<AccountPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/changeaccount" element={<ChangeAccount />} />

              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/schedule/add" element={<InsertScheduleRecordPage />} />
              <Route path="/schedule/open" element={<OpenScheduleRecordPage />} />

              <Route path="/medicalCards" element={<MedicalCardsPage />} />
              <Route path="/medicalCards/add-card" element= {<CreateCardPage />} />
              <Route path="/medicalCards/open-card" element={<TothCardPage />} />
              <Route path="/medicalCards/card/add-record" element={<InsertCardRecordPage />} />
              <Route path="/medicalCards/card/open-records" element={<TothRecordsPage />} />
              <Route path="/medicalCards/card/open-record" element={<ChangeCardPage />} />
              <Route path="/medicalCard/card/change-record" element={<ChangeCardPage />} />

              <Route path="/doctors" element={<DoctorsPage />} />
              <Route path= "/doctors/add" element = {<InsertDoctorFormPage />} />
              <Route path="/doctors/open" element={<OpenDoctorFormPage />} />
              <Route path="/doctors/schedule" element={<SchedulePage />} />

              <Route path="/reports" element={<ReportsPage />} />

      </Routes>

      <Footer userType = {usertype}/>
      </Router>
      </ThemeProvider>
    </>
  )
}

export default App
