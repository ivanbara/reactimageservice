import React from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';


class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {comments: []};
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  loadCommentsAjax(){
      let url = '/api/uploads/comments/' + this.props.image;
      let myInit = {method: 'Get'}
      fetch(url, myInit).then((response)=>{
        if (response.status >= 200 && response.status < 300) {
          return response;
        }
      }).then((response) => {
        return response.json();
      }).then((data) => {
        this.setState({
            comments: data.comments
        });
      });
  }


  handleCommentSubmit(comment){
      let url = '/api/uploads/comments/' + this.props.image;
      let data = new FormData();
      data.append('comments', JSON.stringify(comment));
      fetch(url, {
        method: 'post',
        body: data
          }).then((res) => { 
              return res.json();
          }).then((val) =>{
              if(val.message == 'ok'){
                  this.loadCommentsAjax();
              };
          });
  }

  componentDidMount(){
      this.loadCommentsAjax();
  }

  render() {
      return(
      	<div className='commentBox'>
              <CommentList data={this.state.comments} />
              <CommentForm image={this.props.image} onCommentSubmit={this.handleCommentSubmit} />
          </div>
      	
      ); 

  }
}

export default CommentBox;
