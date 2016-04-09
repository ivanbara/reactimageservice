import React from 'react';

class AjaxList extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
			let pictures = '';
			if (this.props.images) {
				pictures = this.props.images.map((p) => {
          return <a href={'http://localhost:3000/api/uploads/images/' + p.imageName.split(".")[0]} key={p.imageName}>
          				<img src={p.imageURL} className='picture' title={p.imageName}/>
          			</a>;
      	});	
			}
      

      if(!pictures){
          pictures = <p className="pictures">Loading images...</p>;
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