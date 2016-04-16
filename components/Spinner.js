import React from 'react';

class Spinner extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Spinner';
    }
    render() {
        return (
        	<div className="spinner">
		        <div className="bounce1"></div>
		        <div className="bounce2"></div>
		        <div className="bounce3"></div>
		      </div>
        	);
    }
}

export default Spinner;
