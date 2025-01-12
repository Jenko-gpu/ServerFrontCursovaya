import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SchedulePage = () => {
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentWeek, setCurrentWeek] = useState(new Date());

    const getStartOfWeek = (date) => {
        const d = new Date(date);
		var day = d.getDay(),
		diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
		return new Date(d.setDate(diff));
    };

    const getEndOfWeek = (date) => {
        const d = getStartOfWeek(date);
		d.setDate(d.getDate() + 6);
		return d;
    };

    const fetchSchedule = async (weekStart, weekEnd) => {
		if (window.sessionStorage.getItem('accessToken')) {
			try {
				const response = await axios.post('http://localhost:8080/api/shedule', {
					code: window.sessionStorage.getItem('accessToken'), 
					dayFrom: weekStart.toISOString().split('T')[0], // формат YYYY-MM-DD
					dayTo: weekEnd.toISOString().split('T')[0], // формат YYYY-MM-DD
				});
				setSchedule(response.data);
				console.log(response.data);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		} else {
			window.location = "//localhost";
		}
		
    };

    useEffect(() => {
        const weekStart = getStartOfWeek(currentWeek);
        const weekEnd = getEndOfWeek(currentWeek);
        fetchSchedule(weekStart, weekEnd);
    }, [currentWeek]);

    const handleNextWeek = () => {
        setCurrentWeek(new Date(currentWeek.setDate(currentWeek.getDate() + 7)));
    };

    const handlePreviousWeek = () => {
        setCurrentWeek(new Date(currentWeek.setDate(currentWeek.getDate() - 7)));
    };

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error.message}</div>;

    // Группируем расписание по дням
    const groupedSchedule = schedule.reduce((acc, item) => {
        const date = new Date(item.date).toDateString(); // Получаем строку даты
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(item);
        return acc;
    }, {});

    // Сортируем дни и внутри них по времени начала
    const sortedDays = Object.keys(groupedSchedule).sort((a, b) => new Date(a) - new Date(b));
    sortedDays.forEach(day => {
        groupedSchedule[day].sort((a, b) => new Date(`1970-01-01T${a.startTime}:00`) - new Date(`1970-01-01T${b.startTime}:00`));
    });

    return (
        <div>
			<a href="http://localhost/scores">
				<button>Узнать свои баллы</button>
			</a>
            <button onClick={handlePreviousWeek}>Предыдущая неделя</button>
            <button onClick={handleNextWeek}>Следующая неделя</button>
            <div>
                {sortedDays.map((day) => (
                    <div key={day}>
                        <h3>{day}</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Предмет</th>
                                    <th>Дата</th>
                                    <th>Начало</th>
                                    <th>Конец</th>
                                    <th>Имя преподавателя</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupedSchedule[day].map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.subjectName}</td>
                                        <td>{item.date}</td>
                                        <td>{item.startTime}</td>
                                        <td>{item.endTime}</td>
                                        <td>{item.teachersName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SchedulePage;