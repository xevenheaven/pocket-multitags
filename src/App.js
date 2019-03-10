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
			filtering: false,
			selectedTags: [],
			tags: []
		};

		this.refs = React.createRef();

		this.clickTag = this.clickTag.bind(this);
		this.clickFilter = this.clickFilter.bind(this);
		this.clickClear = this.clickClear.bind(this);
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
		this.setState(prevState => ({
			selectedTags: [...prevState.selectedTags, name]
		}));
	}

	clickFilter() {
		console.log("Filtering...")
		this.setState({filtering: true});
	}

	clickClear() {
		console.log("Clearing filters...")
		this.state.selectedTags.forEach(tag => {
			this.refs[tag].setState({active: false});
		});
		this.setState({
			filtering: false,
			selectedTags: []
		});
	}

	render() {
		let content = [];
		if (this.state.fetching) {
			content.push(
				<div key="Section" className="Section"><Loader></Loader></div>
			);
		} else {
			const tags = this.state.tags.map(tagname =>
				<Tag key={tagname} name={tagname} ref={tagname} clickTag={this.clickTag}></Tag>
			);
			content.push(
				<div key="Sidebar" className="Sidebar">
					<div className="Tags">{tags}</div>
					<Filter clickFilter={this.clickFilter} clickClear={this.clickClear}></Filter>
				</div>
			);

			if (!this.state.filtering) {
				content.push(
					<div key="Main" className="Main">
						<span className="Text">Select tags to filter...</span>
					</div>
				);
			} else if (this.state.filtering && this.state.selectedTags.length > 0) {
				content.push(
					<div key="Main" className="Main">
						<span className="Text">Currently filtering...</span>
					</div>
				);
			} else {

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
