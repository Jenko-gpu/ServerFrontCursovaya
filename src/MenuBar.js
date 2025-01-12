import React, { useState, useEffect } from 'react';


const MenuBar = () => {
  const [randomId, setRandomId] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
	
	const login = async () => {
		setError(null); // Сброс ошибки перед новым запросом
		var check = window.sessionStorage.getItem('vkApi'); //getCookie('vkApi');
		//console.log(getCookie('apiAccess'));
		if (check == undefined){
			let data;
			try {
				const response = await fetch(`http://localhost:8080/api/auth/reg`);
				data = await response.json();
				console.log(data);
				setResponseData(data);
				window.sessionStorage.setItem('apiAccess', data['apiAccess']);// setCookie('apiAccess', data['apiAccess'], 1);
			} catch (error) {
			  console.error('Ошибка при получении данных:', error);
			  setError('Ошибка при получении данных: ' + error.message);
			};
		
			if (data['codeChallenge']) {
				VKID.Config.init({
				app: "52681983",
				redirectUrl: 'http://localhost/vkreg',
				state: 'state',
				codeVerifier: data['codeChallenge'],
				scope: 'phone email',
				});
				console.log(data['codeChallenge']);
				
				const oneTap = new VKID.OneTap();
				
				const container = document.getElementById('VkIdSdkOneTap');
				
				oneTap.login();
				
				if (container) {
				 oneTap
					.render({ container })
					.on(VKID.WidgetEvents.ERROR, console.error);
				} else {
					console.log('errore');
				}
			}
				  
		}
	};
	
	useEffect(() => {
		login();
	}, [])
	
	return (
		<div>
		  <h1>Случайный ID</h1>
		  <div id='VkIdSdkOneTap'></div>
		  {responseData && <p>Ответ от сервера: {responseData['codeChallenge']}</p>}
		  {error && <p style={{ color: 'red' }}>{error}</p>} {/* Отображение ошибки */}
		  
		</div>
	  );
	};

export default MenuBar;

