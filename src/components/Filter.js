import React, { Component } from 'react';
import './Filter.css';

class Filter extends Component {
	constructor() {
		super();

		this.filterHandler = this.filterHandler.bind(this);
		this.clearHandler = this.clearHandler.bind(this);
	}

	filterHandler() {
		this.props.clickFilter();
	}

	clearHandler() {
		this.props.clickClear();
	}

	render() {
		return (
			<div>
				<div className="Button Filter" onClick={this.filterHandler}>Filter</div>
				<div className="Button Clear" onClick={this.clearHandler}>Clear</div>
			</div>
		);
	}
}

export default Filter;
