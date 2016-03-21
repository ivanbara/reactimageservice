import React from 'react';

var style = {
  background: 'red'
};



class DropZonePlace extends React.Component{

	constructor(props){
		super(props);
		this.state = {
      imagePreviewUrl: '',
      status: (<p>Click or drop files here to upload...</p>),
      style: {}
    };
    this.uploadFile = '';
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
     
	}

	handleSubmit(e) {
    e.preventDefault();
    if (!this.uploadFile) {
    	return;
    }
    var data = new FormData();
		data.append('recfile', this.uploadFile);
		data.append('user', 'guestUser');

		fetch('http://localhost:3000/api/uploads/upload/', {
		  method: 'post',
		  body: data
			}).then((res) => {
					this.setState({
	        	status: (<p>Uploading...</p>)
	      	});
					return res.json();
			}).then((val) =>{
					if(val.message == 'ok'){
						this.setState({
	        		status: (<p id='checkMark'><i className="fa fa-check"></i></p>)
	      		});
						console.log(val);
					};
		});
      this.uploadFile = '';
		this.setState({
        imagePreviewUrl: ''
    });
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    
    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result,
        style: {background: ''}
      });
      this.uploadFile = file;
    }

    reader.readAsDataURL(file)
  }

  onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
        style: {background: '#c5e0ff', border: 'solid 3px black'}
    });
  }

  onDragLeave(e) {
    e.preventDefault();
    this.setState({
        style: {background: '', border: 'dashed'}
    });
  }


        		
	render(){
		let {imagePreviewUrl} = this.state;
    let imagePreview = this.state.status;
    if (imagePreviewUrl) {
      imagePreview = (<img src={imagePreviewUrl} className='dropPreview'/>);
    }
		return (
          <div
            onDragOver={this.onDragOver}
            onDragLeave={this.onDragLeave}
          >
						<div className='dropZone' id="upload-file-container" style={this.state.style}>{imagePreview}
							<input type='file' name='file-upload' onChange={this.handleImageChange} />
						</div>
        		<a href="" onClick={this.handleSubmit} className="icon-button cloudicon">
              <i className="fa fa-cloud-upload"></i><span></span>
            </a>
          </div>
      );
	}
}

DropZonePlace.propTypes = {
  onDrop: React.PropTypes.func,
  onDragOver: React.PropTypes.func,
  onDragLeave: React.PropTypes.func,
};


export default DropZonePlace;