import React from 'react';

class AjaxList extends React.Component {

	constructor(props){
		super(props);
		this.state = {pictures: []};
	}

	
	componentDidMount(){
		var url = 'https://api.instagram.com/v1/media/popular?client_id=' + this.props.apiKey + '&callback=?';
		
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = () => {
			if (xhr.readyState == 4 && xhr.status == 200){
				console.log('ready');
				var pictures = result.data.map((p) => {
                return { 
                    id: p.id, 
                    url: p.link, 
                    src: p.images.low_resolution.url, 
                    title: p.caption ? p.caption.text : '', 
                    favorite: false 
                };
        });
				this.setState({ pictures: pictures });
			}
		};
		xhr.open('GET', url, true);
		xhr.send();

		// var myInit = {method: 'Get'}
		// fetch(url, myInit).then((response) => {
		// 	return response.json();
		// }).then((data) => {
		// 	this.state.list = data;
		// 	this.setState(this.state);
		// });
	}

	render(){
      var pictures = this.state.pictures.map((p) => {
          return <Picture id={p.id} src={p.src} title={p.title} />
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