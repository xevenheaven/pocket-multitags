import React, { Component } from 'react';
import './Tag.css';

class Tag extends Component {
	constructor() {
		super();

		this.state = {
			active: false
		};

		this.clickTagHandler = this.clickTagHandler.bind(this);
	}

	toggleClass() {
		this.setState(prevState => ({
			active: !prevState.active
		}));
	}

	clickTagHandler() {
		this.toggleClass();
		this.props.clickTag(this.props.name);
	}

	render() {
		return (
			<span className={this.state.active ? "Tag Selected" : "Tag"} onClick={this.clickTagHandler}>
				{this.props.name}
			</span>
		);
	}
}

export default Tag;
