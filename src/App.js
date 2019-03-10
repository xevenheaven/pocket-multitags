import React, { Component } from 'react';

import Filter from './components/Filter';
import Loader from './components/Loader';
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
			fetching: true,
			hasSelected: false,
			tags: []
		};

		this.clickTag = this.clickTag.bind(this);
		this.clickFilter = this.clickFilter.bind(this);
	}

	componentDidMount() {
		var loadTags = (token) => {
			getTags(token).then(tags => {
				debugger;
				this.setState({fetching: false, tags: tags});
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

	clickFilter() {
		console.log("Filtering...")
	}

	render() {
		let content = [];
		if (this.state.fetching) {
			content.push(
				<div className="Section"><Loader></Loader></div>
			);
		} else {
			const tags = this.state.tags.map(tagname =>
				<Tag key={tagname} name={tagname} clickTag={this.clickTag}></Tag>
			);
			content.push(
				<div className="Sidebar">
					<div className="Tags">{tags}</div>
					<Filter clickFilter={this.clickFilter}></Filter>
				</div>
			);

			if (this.state.hasSelected) {

			} else {
				content.push(
					<div className="Main">
						<span className="Text">Select tags to begin...</span>
					</div>
				);
			}
		}

		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<div className="App-title">Pocket: Multitags Filter</div>
				</header>
				<div className="Content">{content}</div>
			</div>
		);
	}
}

export default App;
