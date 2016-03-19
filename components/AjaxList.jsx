import React from 'react';

class AjaxList extends React.Component {

	constructor(props){
		super(props);
		this.state = {pictures: []};
	}

	
	componentDidMount(){
		var url = this.props.url;
		var myInit = {method: 'Get'}
		fetch(url, myInit).then((response)=>{
			if (response.status >= 200 && response.status < 300) {
    		return response;
    	}
		}).then((response) => {
			return response.json();
		}).then((data) => {
			this.setState({
        	pictures: data.images
      });

		});
	}

	render(){
      var pictures = this.state.pictures.map((p) => {
          return <img src={p.imageURL} key={p.imageName} className='picture' title={p.imageName}/>;
      });

      if(!pictures.length){
          pictures = <p className="pictures">Loading images..</p>;
      }

      return (
          <div>
              <h1>Server pics</h1>
              <div className="pictures"> {pictures} </div>
          </div>
      );
	}
}

export default AjaxList;