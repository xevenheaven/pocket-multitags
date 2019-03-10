import React, { Component } from 'react';
import './Filter.css';

class Filter extends Component {
	constructor() {
		super();

		this.filterHandler = this.filterHandler.bind(this);
	}

	filterHandler() {
		this.props.clickFilter();
	}

	render() {
		return (
			<div className="Filter" onClick={this.filterHandler}>Filter</div>
		);
	}
}

export default Filter;
