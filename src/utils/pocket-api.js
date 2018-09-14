const APP_URL = 'http://localhost:3000';
const POCKET_LOGIN = 'https://getpocket.com/auth/authorize';

function authorizeLogin(code) {
	const params = `?request_token=${code}&redirect_uri=${APP_URL}`;
	window.open(`${POCKET_LOGIN}${params}`);
}

function getRequestToken() {
	return fetch(`/request`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
	})
	.then(response => response.json())
	.then(json => json.code);
}

function getAccessToken(code) {
	const data = JSON.stringify({code: code});
	return fetch('/access', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: data
	})
	.then(response => response.json())
	.then(json => json.access_token);
}

function getTags(token) {
	const data = JSON.stringify({access_token: token});
	return fetch('/tags', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: data
	})
	.then(response => response.json())
	.then(json => json.tags);
}

export { getRequestToken, getAccessToken, getTags, authorizeLogin };
