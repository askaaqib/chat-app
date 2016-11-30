export const setApi = () => {

	switch(window.location.hostname) {
		case 'localhost': 
			return 'http://localhost:3000';
		default: 
			return null; 
	}
};