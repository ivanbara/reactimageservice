import React from 'react';

class AwesomeComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {likesCount : 0};
		this.onLike = this.onLike.bind(this);
		this.style = 'mammothimg desaturate';
	}

	onLike(){
		let newLikesCount = this.state.likesCount + 1;
		this.setState({likesCount: newLikesCount});
		this.style = 'mammothimg';
	}

	render(){
		return (
			<div className='mammothdiv'>
				{this.props.adj} : <span>{this.state.likesCount}</span>
				<div onClick={this.onLike} className='imgdiv'>
					<img src={this.props.img} className={this.state.likesCount > 0 ? 'mammothimg' : 'mammothimg desaturate'}/>
				</div>
			</div>
		);
	}

}

export default AwesomeComponent;