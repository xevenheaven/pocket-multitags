import React, { Component } from 'react';

class Loader extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<span>Fetching tags...</span>
		);
	}
}

export default Loader;
