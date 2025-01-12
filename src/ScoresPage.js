import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ScoresPage = () => {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userId, setUserId] = useState(''); // Состояние для хранения ID пользователя

    const fetchScores = async () => {
		
		if (window.sessionStorage.getItem('accessToken')) {
			setLoading(true);
			setError('');
			
			
			try {
				console.log(window.sessionStorage.getItem('accessToken'));
				const response = await axios.post('http://localhost:8080/api/scores',
					{"code": window.sessionStorage.getItem('accessToken')});
				setScores(response.data);
				setLoading(false);
			} catch (err) {
				setError('Ошибка при загрузке оценок');
				setLoading(false);
			}
		} else {
			window.location = "//localhost";
		}
    };

	useEffect(() => {
		fetchScores();
	},[])
	
    return (
        <div>
			<a href="http://localhost/shedule">
				<button>Узнать своё рассписание</button>
			</a>
            <h2>Список оценок</h2>
			
            {loading && <div>Загрузка...</div>}
            {error && <div>{error}</div>}

            {scores.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Название предмета</th>
							<th>Имя преподавателя</th>
                            <th>Баллы лекций</th>
                            <th>Баллы практики</th>
                            <th>Баллы экзамена</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.map((score, index) => (
                            <tr key={index}>
                                <td>{score.subjectName}</td>
								<td>{score.teachersName}</td>
                                <td>{score.lectureScore}</td>
                                <td>{score.practiceScore}</td>
                                <td>{score.examScore}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ScoresPage;