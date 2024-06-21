import '../../assets/styles/global.css'
import '../../assets/styles/ScheduleStyles/StyleSchedule.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';



const SearchForm = () => {

const [doctors, setDoctors] = useState([]);
    
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('https://localhost:7284/doctors');
                setDoctors(response.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, []);

    return (
      <form className="Searchform" action="">
          <div className="searchblock">
          <label htmlFor="sortdesasc" className='label'>Сортировать по</label>
          <select name="sortdesasc" id="">
              <option value="ascending">возрастанию</option>
              <option value="descending">убыванию</option>
            </select>
          <select className = "searchselect" name="fieldsort" id="">
                <option value="patient">Имени Пациента</option>
                <option value="doctor">Имени Врача</option>
                <option value="date">Даты</option>
            </select>
            <input className = "searchdate" type="datetime-local" />
            <select className = "searchselect" name="doctors" id="">
            <option value="" disabled selected>Выберите врача</option>
                    {doctors.map(doctor => (
                        <option key={doctor.id} value={doctor.id}>{doctor.firstName} {doctor.lastName}</option>
                    ))}
            </select>
            <input className="Search" id="searchPatient" type="text" placeholder="Поиск" />
            <button>Поиск</button>
          </div>
      </form>
    );
  };
  
  export default SearchForm;