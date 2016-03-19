import React from 'react';


class DropZonePlace extends React.Component{

	constructor(props){
		super(props);
		this.state = {
      file: '',
      imagePreviewUrl: '',
      status: 'Click to upload images...'
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

	}

	handleSubmit(e) {
    e.preventDefault();
    if (!this.state.file) {
    	return;
    }
    var data = new FormData();
		data.append('recfile', this.state.file);
		data.append('user', 'hubot');

		fetch('http://localhost:3000/api/uploads/upload/', {
		  method: 'post',
		  body: data
		}).then((res) => {
				this.setState({
        	status: 'Uploading...'
      	});
				return res.json();
		}).then((val) =>{
				if(val.message == 'ok'){
					this.setState({
        		status: 'Uploaded!'
      		});
					console.log(val);
				};
		});

		this.setState({
        file: '',
        imagePreviewUrl: ''
    });
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  //<button type="submit" onClick={this.handleSubmit} ></button>
        		
	render(){
		let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    let previewText = (<p>{this.state.status}</p>);
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} className='dropPreview'/>);
      previewText = null;
    }
		return (
          <div>
						<div className='dropZone' id="upload-file-container">{$imagePreview} {previewText}
							<input type='file' name='file-upload' onChange={this.handleImageChange} />
						</div>
            <form onSubmit={this.handleSubmit} encType="multipart/form-data" className='uploadForm'>
          		
        		</form>

        		<a href="" onClick={this.handleSubmit} className="icon-button pinterest"><i className="fa fa-cloud-upload"></i><span></span></a>
						
          </div>
      );
	}
	

}


export default DropZonePlace;