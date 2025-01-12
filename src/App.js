import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import VkregPage from './VkregPage';
import RandomId from './FirstPage';
import ScoresPage from './ScoresPage';
import ShedulePage from './ShedulePage';

const App = () => {
 const getCurrentPage = () => {
    const path = window.location.pathname; // Получение текущего пути URL

    switch (path) {
		case '/vkreg':
			return <VkregPage />;
		case '/shedule':
			return <ShedulePage />;
		case '/scores':
			return <ScoresPage />;
		default:
			return <RandomId />;
    }
	
  };
	
	useEffect( () => {
		if (window.sessionStorage.getItem('userName')) {
			const element = document.getElementById('userField');
			element.innerHTML = "Пользователь: " + window.sessionStorage.getItem('userName');;
		}	
	}, [])
	
  return (
    <div>
		<h1 id='userField'>Добро пожаловать!</h1>
		{getCurrentPage()} {/* Отображение текущей страницы */}
    </div>
  );
};

export default App;