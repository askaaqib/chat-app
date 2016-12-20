export const setApi = () => {

	switch(window.location.hostname) {
		//local environment
		case 'localhost': 
			return 'http://localhost:3000';
		//production environment
		case 'jor-chata.s3-website-us-west-1.amazonaws.com': 
			return 'http://ec2-54-183-234-7.us-west-1.compute.amazonaws.com'
		default: 
			return null; 
	}
};