require('dotenv').config()
const bodyParser = require('body-parser');
const express = require('express');
const https = require('https');
const path = require('path');

const POCKET_AUTH = '/v3/oauth/authorize';
const POCKET_BASE_URL = 'getpocket.com';
const POCKET_GET = '/v3/get';
const POCKET_REQUEST = '/v3/oauth/request';

const { CONSUMER_KEY } = process.env;
const APP_URL = 'http://localhost:3000';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/request', (req, res) => {
	const options = {
		hostname: POCKET_BASE_URL,
		path: POCKET_REQUEST,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
			'X-Accept': 'application/json'
		}
	};
	const data = JSON.stringify({
		'consumer_key': CONSUMER_KEY,
		'redirect_uri': APP_URL
	});

	const request = https.request(options, response => {
		var code;
		response.on('data', d => {
			code = JSON.parse(d.toString());
		});
		response.on('end', () => {
			res.json(code);
		});
	});

	request.on('error', err => {
		console.log('Error getting request token:', err);
	});
	request.write(data);
	request.end();
});

app.post('/access', (req, res) => {
	const code = req.body.code;
	const options = {
		hostname: POCKET_BASE_URL,
		path: POCKET_AUTH,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
			'X-Accept': 'application/json'
		}
	};
	const data = JSON.stringify({
		'consumer_key': CONSUMER_KEY,
		'code': code
	});

	const request = https.request(options, response => {
		var token;
		response.on('data', d => {
			if (d) {
				token = JSON.parse(d.toString());
			}
		});
		response.on('end', () => {
			res.json(token);
		});
	});

	request.on('error', err => {
		console.log('Error getting access token:', err);
	});
	request.write(data);
	request.end();
});

app.post('/tags', (req, res) => {
	const token = req.body.access_token;
	const options = {
		hostname: POCKET_BASE_URL,
		path: POCKET_GET,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const data = JSON.stringify({
		'consumer_key': CONSUMER_KEY,
		'access_token': token,
		'detailType': 'complete'
	});

	const request = https.request(options, response => {
		var items = '';
		response.on('data', d => {
			if (d) {
				items += d;
			}
		});
		response.on('end', () => {
			var tags = new Set();
			list = JSON.parse(items).list;
			Object.keys(list).forEach(key => {
				var itemTags = list[key].tags;
				if (itemTags) {
					Object.keys(itemTags).forEach(tag => {
						tags.add(tag);
					});
				}
			});
			res.json({tags: [...tags].sort()});
		});
	});

	request.on('error', err => {
		console.log('Error getting tags:', err);
	});
	request.write(data);
	request.end();
});

app.listen(process.env.PORT || 3001, () => {
	console.log('Server started on port 3001');
});
