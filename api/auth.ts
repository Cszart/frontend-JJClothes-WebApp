import axios from 'axios';

export const post_auth_login = async (data: {
	email: string;
	password: string;
}): Promise<any> => {
	const login_response = await axios.post(
		`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
		data
	);
	return login_response;
};
