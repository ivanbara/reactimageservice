import React from 'react';
import CommentBox from './CommentBox';

class ImagePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {image: ''};
        this.fetchImage = this.fetchImage.bind(this);
    }

    componentDidMount(){
    	this.fetchImage();
	  }


    fetchImage(){
    	const url = '/api/uploads/images/getimage/' + this.props.params.image;
	    const myInit = {method: 'Get'}

	    fetch(url, myInit).then((response)=>{
	      if (response.status >= 200 && response.status < 300) {
	        return response;
	      }
	    }).then((response) => {
	      return response.json();
	    }).then((data) => {
	      this.setState({
	          image: data,
	      });
	    });
	    
    }

    render() {
    		let imageName = this.props.params.image;
        return (
        	<div>
	        	<div className='pictureHeading'>
	        	{imageName}
	        	</div>
	        	<div>
	        	<img src={this.state.image.imageURL} className='pagePicture' 
	        		title={imageName}/>
	        	</div>
	        	<div id='commentsTitle'>Comments</div>
	        	<div id='comments'>
	        		<CommentBox image={imageName}/>
	        	</div>
					</div>
        );
    }
}

export default ImagePage;
