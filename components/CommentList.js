import React from 'react';
import Comment from './Comment';

class CommentList extends React.Component {
    constructor(props) {
        super(props);
    }	

    
    render() {
    		let commentNodes = '';
    		if (!this.props.data){
    		commentNodes = this.props.data.map(comment => {
		      return (
		        <Comment author={comment.author} key={comment.id}>
		          {comment.text}
		        </Comment>
		      );
		    });
    		} else 
		    	{commentNodes = <p>No Comments yet. Get First Post!</p>};
		    
        return (
        	<div>Comments:
        		<div>
        			{commentNodes}
        		</div>	
        	</div>
        );
    }
}

export default CommentList;
