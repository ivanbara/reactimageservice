import React from 'react';
import CommentBox from './CommentBox';

class ImagePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
    		const imageName = this.props.params.image.split(".")[0];
        return (
        	<div>
	        	<div>
	        	{this.props.params.image.split(".")[0]}
	        	</div>
	        	<div>
	        	<img src={'/uploads/' + this.props.params.image} className='picture' 
	        		title={imageName}/>
	        	</div>
	        	<div id='comments'>
	        		<CommentBox image={imageName}/>
	        	</div>
					</div>
        );
    }
}

export default ImagePage;
