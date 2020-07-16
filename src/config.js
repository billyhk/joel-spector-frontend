// export const APIURL =
// 					'http://ec2-3-92-162-254.compute-1.amazonaws.com:8080';

export const APIURL =
					window.location.hostname === 'localhost'
						? 'http://localhost:8080'
						: 'http://ec2-3-89-148-52.compute-1.amazonaws.com:8080';
