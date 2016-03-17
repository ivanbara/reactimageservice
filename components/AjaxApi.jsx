import React from 'react';

class AjaxApi extends React.Component {

	constructor(props){
		super(props);
		this.state = {apidata: {}};
	}

	
	componentDidMount(){
		var url = 'https://api.github.com/users/caspyin';
		var myInit = {method: 'Get'}
		fetch(url, myInit).then((response)=>{
			if (response.status >= 200 && response.status < 300) {
    		return response;
    	}
		}).then((response) => {
			return response.json();
		}).then((data) => {
			console.log(data);
			this.state.apidata = data;
			this.setState(this.state);
		});
	}

	render(){
      var api = <div className='picture'>login: 
      {this.state.apidata.login}, 
      name:{this.state.apidata.name} </div>;

      

      return (
          <div>
              <h1>Github data</h1>
              <div className="pictures"> {api} </div>
          </div>
      );
	}
}

export default AjaxApi;