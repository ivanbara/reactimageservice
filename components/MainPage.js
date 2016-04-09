import React from 'react';

class MainPage extends React.Component {
  
    render() {
        return (
        	<div>
        		<h1>React Router Tutorial</h1>
        		{this.props.children}
        		<div>
        			Footer
        		</div>
        	</div>
        );
    }
}

export default MainPage;
