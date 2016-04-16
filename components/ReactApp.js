import React from 'react';
import AjaxList from './AjaxList';
import DropZonePlace from './DropZonePlace';
import Fetch from 'fetch.io';

class ReactApp extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      value: 'set',
      images: null,
      loading: false
    };
  }

  componentDidMount(){
    this.loadImagesAjax();
  }


  loadImagesAjax(){
    const url = '/api/uploads/all';
    const myInit = {method: 'Get'}
    this.setState({loading: true});

    fetch(url, myInit).then((response)=>{
      if (response.status >= 200 && response.status < 300) {
        return response;
      }
    }).then((response) => {
      return response.json();
    }).then((data) => {
      this.setState({
          images: data.images,
          loading: false
      });
    });
  }

  loadLastPost(){
    var url = '/api/uploads/getone';
    let img = JSON.parse(JSON.stringify(this.state.images));
    
    var lastPost = img[img.length - 1];
    this.setState({loading: true});

    const request = new Fetch();

    request.get(url)
      .query({
        created_before: lastPost.created
      }).then(res => {
        if (res.status >= 200 && res.status < 300) {
          return res;
        }
      })
      .then(res => {
        console.log('response arrived');
        return res.json();
      }).then(data => {
        let combined = [...this.state.images, ...data.images];
        console.log(combined);
        this.setState({
            images: combined,
            loading: false
        });
      })
      .catch(err => {
        console.log('error: ', err);
        this.setState({loading: false});
      });
  }


  render() {
    return (
      <div id='app' style={styles.container}>
        <div className='uploadzone'>
          <DropZonePlace updateImages={(loadImages) => this.loadImagesAjax()}/>       
        </div>
        <AjaxList loading={this.state.loading} images={this.state.images} loadMore={(loadLastPost) => this.loadLastPost()} />
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  },
  header: {
    flex: '0 1 auto'
  },
  error: {
    color: 'red',
  },

};

export default ReactApp;