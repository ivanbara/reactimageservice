import React from 'react';
import { Link } from 'react-router';

class MainPage extends React.Component {

    componentDidMount(){
        window.localStorage.clear();
    }

    render() {
        return (
        	<div className='wrapper'>
        		<div className='header'>
                    <div className='titleDiv'>
                        <Link to={'/'} className='title'> 
                            IsomorphImg
                        </Link>
                    </div>
                    <div className='navbar'>

                    </div>
                </div>
        		{this.props.children}
        		<div className='footer'>
        			Isomorphimg  -  all rights reserved
        		</div>
        	</div>
        );
    }
}

export default MainPage;

