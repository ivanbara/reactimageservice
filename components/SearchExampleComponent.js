import React from 'react';

class SearchExampleComponent extends React.Component{

	constructor(props){
		super(props);
		this.state = {searchString: ''};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e){
		this.setState({searchString: e.target.value});
	}

	render(){
		
		var libraries = this.props.items;
		var searchString = this.state.searchString.trim().toLowerCase();

		if(searchString.length > 0){
          libraries = libraries.filter((l) => {
              return l.name.toLowerCase().match( searchString );
          });
    }
    return(
			<div>
				<input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Type here" />
				<ul> 
					{ libraries.map((l) => {
						return <li key={l.name}>{l.name} <a href={l.url}>{l.url}</a></li>
					}) }
				</ul>
			</div>
		);
	}


}

export default SearchExampleComponent;

