import React, { useState } from 'react';
import '../../assets/styles/global.css';
import '../../assets/styles/ScheduleStyles/StyleScheduleInsertRecord.css';

const InsertScheduleRecordPage = () => {
    const [dates, setDates] = useState(['']);

    const handleAddDate = () => {
        setDates([...dates, '']);
    };

    const handleDateChange = (index, value) => {
        const newDates = [...dates];
        newDates[index] = value;
        setDates(newDates);
    };

    const handleRemoveDate = (index) => {
        const newDates = dates.filter((_, i) => i !== index);
        setDates(newDates);
    };

    return (
        <div className="container">
            <main>
                <h1>Добавить запись</h1>
                <form className="InsertScheduleRecord-form">
                    <div className="form-container">
                        <div className="labelsinputs-container">
                            <div className="InsertScheduleRecord-labels">
                                <label htmlFor="patientName">Пациент</label>
                                <label htmlFor="doctor">Врач</label>
                            </div>
                            <div className="InsertScheduleRecord-inputs">
                                <input type="text" id="patientName" name="patientName" placeholder="Пациент" />
                                <select name="doctors" id="">
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>
                        <div className="datelist-container">
                            <label htmlFor="datetime-local">Дата</label>
                            <div className="datelist">
                                <div id="dateFields">
                                    {dates.map((date, index) => (
                                        <div key={index} className="date-field">
                                            <input
                                                type="datetime-local"
                                                className="short"
                                                name="date"
                                                value={date}
                                                onChange={(e) => handleDateChange(index, e.target.value)}
                                            />
                                            <button type="button" onClick={() => handleRemoveDate(index)}>
                                                -
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button type="button" onClick={handleAddDate}>
                                    +
                                </button>
                            </div>
                        </div>
                        <button className="InserRecordButton">Добавить запись</button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default InsertScheduleRecordPage;