import React from 'react';

class AjaxList extends React.Component {

	constructor(props){
		super(props);
		this.state = {pictures: []};
	}

	
	componentDidMount(){
		var url = 'https://api.instagram.com/v1/media/popular?client_id=' + this.props.apiKey + '&callback=?';
		url = '/bears';
		var myInit = {method: 'Get'}
		fetch(url, myInit).then((response)=>{
			if (response.status >= 200 && response.status < 300) {
    		return response;
    	}
		}).then((response) => {
			return response.json();
		}).then((data) => {
			this.state.pictures = data.data;
			this.setState(this.state);
		});
	}

	render(){
      var pictures = this.state.pictures.map((p) => {
          return <img src= {p.src} key={p.id} className='picture'/>;
      });

      if(!pictures.length){
          pictures = <p>Loading images..</p>;
      }

      return (
          <div>
              <h1>Popular Instagram pics</h1>
              <div className="pictures"> {pictures} </div>
          </div>
      );
	}
}

export default AjaxList;