import React from "react";
import Header from '../../components/Header/Header'
import Doctors from "../Doctors/DoctorsPage";
import Footer from "../../components/Footer/Footer";


const DoctorPage = () => {
    return(
        <>
            <Header/>
            <Doctors/>
            <Footer/>

        </>
    );
};


export default DoctorPage;