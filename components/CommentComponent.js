import React from 'react';

class CommentComponent extends React.Component{
	constructor(props){
		super(props);
		this.state = {comment: ''}
	}

	render(){
		return (
          <div>
						<div className='comment'>
							<img src='' className='commentAvatar'/>
							<div className='commentOutput'>{this.props.comment}</div>
						</div>
          </div>
      );
	}

}




export default CommentComponent;