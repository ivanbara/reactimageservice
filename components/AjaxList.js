import React from 'react';
import { Link } from 'react-router';

class AjaxList extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
			let pictures = '';
			if (this.props.images) {
				pictures = this.props.images.map((p) => {
          return <Link to={'images/' + p.imageName} key={p.imageName}> 
          				<img src={p.imageURL} className='picture' title={p.imageName}/>
          			</Link>;
      	});	
			}
      

      if(!pictures){
          pictures = <p className="pictures">Loading images...</p>;
      }

      return (
          <div>
              <h1>Image Gallery</h1>
              <div className="pictures"> {pictures} </div>
          </div>
      );
	}
}

export default AjaxList;