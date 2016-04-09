import React from 'react';

class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        	<div>
        		<div>
        			Header
        		</div>
        		{this.props.children}
        		<div>
        			Footer
        		</div>
        	</div>
        );
    }
}

export default MainPage;
