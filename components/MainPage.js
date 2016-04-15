import React from 'react';
import Scroller from './Scroller';

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
                    <Scroller />
        		</div>
        	</div>
        );
    }
}

export default MainPage;
