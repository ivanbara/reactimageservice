import React from 'react';

class CommentInputComponent extends React.Component{
	constructor(props){
		super(props);
		this.state = {inputField: ''}
	}


	render(){
		return (
          <div>
						<div className='commentInput'>
							<img src='' className='commentAvatar'/>
							<div className='commentInputField'></div>
						</div>
          </div>
      );
	}
}




export default CommentInputComponent;