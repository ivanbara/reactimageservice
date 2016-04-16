import React from 'react';

class MainPage extends React.Component {

    render() {
        return (
        	<div className='wrapper'>
        		<div className='header'>
                    <div className='title'>
                        IsomorphImg
                    </div>
                    <div className='navbar'>
                        navbar
                    </div>
                </div>
        		{this.props.children}
        		<div className='footer'>
        			Footer
        		</div>
        	</div>
        );
    }
}

export default MainPage;
