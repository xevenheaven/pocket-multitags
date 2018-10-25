import React, { Component } from 'react';
import Tag from './components/Tag';
import {
	authorizeLogin,
	getAccessToken,
	getRequestToken,
	getTags,
} from './utils/pocket-api.js';

import logo from './logo.png';
import './App.css';

class App extends Component {
	constructor() {
		super();

		this.state = {
			tags: []
		};

		this.clickTag = this.clickTag.bind(this);
	}

	componentDidMount() {
		var loadTags = (token) => {
			getTags(token).then(tags => {
				debugger;
				this.setState({tags: tags});
			});
		};

		// TODO integrate with some db
		if (!localStorage.getItem('reqToken')) {
			getRequestToken().then(code => {
				localStorage.setItem('reqToken', code);
				authorizeLogin(code);
			});
		} else {
			if (!localStorage.getItem('accToken')) {
				getAccessToken(localStorage.getItem('reqToken')).then(access_token => {
					localStorage.setItem('accToken', access_token);
					loadTags(access_token);
				});
			} else {
				loadTags(localStorage.getItem('accToken'));
			}
		}
	}

	clickTag(name) {
		console.log(name);
	}

	render() {
		const tags = this.state.tags.map(tagname =>
			<Tag key={tagname} name={tagname} clickTag={this.clickTag}></Tag>
		);

		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<div className="App-title">Pocket: Multitags Filter</div>
				</header>
				<div className="Section">
					<div className="tags">{tags}</div>
				</div>
			</div>
		);
	}
}

export default App;
