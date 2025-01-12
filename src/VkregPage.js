import React, { useState } from 'react';
import * as VKID from '@vkid/sdk';

const VkregPage = () => {
	
	
	
	const params = new URLSearchParams(document.location.search);
	const apiVk = params.get('code');
	const state = params.get('state');
	const deviceId = params.get('device_id');
	
	const [username, setUsername] = useState('');
	
	const handleLogin = async () => {
		if (window.sessionStorage.getItem("apiAccess")) {
			if (window.sessionStorage.getItem("accessToken")){
				console.log('fine');
			} else {
				
				try {
					let data;
					const dataToSend = JSON.stringify({
							"code": apiVk,
							"deviceId": deviceId,
							"state": state,
							"apiAccess": window.sessionStorage.getItem("apiAccess")
							});
					const response = await fetch(`http://localhost:8080/api/auth/login`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json', 
						},
						body: dataToSend
						//'Access-Control-Allow-Origin': '*',
					}); 
					data = await response.json();
					
					if (data['code']){
						window.sessionStorage.setItem('accessToken', data['code']);
						window.sessionStorage.setItem('userName', data['name']);
					} else {
						console.error("failed to login");
					}
					
				} catch (error) {
					console.error('Ошибка при получении данных:', error);
				};
			}
		} else {
			window.location = "//localhost";
		}
  };
componentDidMount: handleLogin();


  return (
    <div onLoad="handleLogin();">
		<a href="http://localhost/scores">
			<button>Узнать свои баллы</button>
		</a>
		<a href="http://localhost/shedule">
			<button>Узнать своё рассписание</button>
		</a>
    </div>
  );
};

export default VkregPage;