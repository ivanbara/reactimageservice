import React from 'react';

class MainPage extends React.Component {
  
    render() {
        return (
        	<div>
        		<h1>Isomorphimg</h1>
        		<div className='navbar'>
        		navbar
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
