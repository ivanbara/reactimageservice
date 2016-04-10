import React from 'react';

class ImagePage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
        	<div>
	        	<div>
	        	{this.props.params.image.split(".")[0]}
	        	</div>
	        	<div>
	        	<img src={'/uploads/' + this.props.params.image} className='picture' 
	        		title={this.props.params.image.split(".")[0]}/>
	        	</div>
					</div>
        	        	

        );
    }
}

export default ImagePage;
