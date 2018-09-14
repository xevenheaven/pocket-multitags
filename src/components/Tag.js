import React, { Component } from 'react';

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
			<span className="tag" onClick={this.clickTagHandler}>{this.props.name}</span>
		);
	}
}

export default Tag;
