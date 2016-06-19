import React from 'react';


class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {author: '', text: ''};
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
     		this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
           
    }

    handleAuthorChange(e){
    	this.setState({author: e.target.value});
    }

		handleTextChange(e){
			this.setState({text: e.target.value});
    }

    handleSubmit(e){
    	e.preventDefault();
    	let author = this.state.author.trim();
    	let text = this.state.text.trim();
	    if (!text || !author) {
	      return;
	    }
	    this.props.onCommentSubmit({author: author, text: text});
	    this.setState({author: '', text: ''});
    }


    render() {
        return (
        	<form className="commentForm" onSubmit={this.handleSubmit}>
        		<input className='commentInput' type="text" placeholder="Your name" value={this.state.author} onChange={this.handleAuthorChange}/>
        		<textarea rows={5} className='commentInput' type="text" placeholder="Leave a comment..." value={this.state.text} onChange={this.handleTextChange}/>
        		<button className='postButton' type="submit" value="Post">Post</button>
      		</form>
        );
    }
}

export default CommentForm;
