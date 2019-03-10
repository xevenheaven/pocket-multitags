import React, { Component } from 'react';
import './Tag.css';

class Tag extends Component {
	constructor() {
		super();

		this.clickTagHandler = this.clickTagHandler.bind(this);
	}

	clickTagHandler() {
		this.props.clickTag(this.props.name);
	}

	render() {
		return (
			<span className="Tag" onClick={this.clickTagHandler}>{this.props.name}</span>
		);
	}
}

export default Tag;
