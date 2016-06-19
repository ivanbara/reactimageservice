import React from 'react';
import AjaxList from './AjaxList';
import DropZonePlace from './DropZonePlace';
import Fetch from 'fetch.io';

function storageAvailable(type) {
    try {
        let storage = window[type];
        let x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return false;
    }
}

class ReactApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 'set',
      images: [],
      loading: false
    };

  }

  componentDidMount(){
    let img = null;
    if (storageAvailable('localStorage')) {
      img = JSON.parse(window.localStorage.getItem('images') || null);
    }
    
    if (img) {
      this.setState({
            images: img
        });
    } else {
      this.loadLastPost();
    }
  }

  componentWillUnmount(){
    if (storageAvailable('localStorage')) {
      window.localStorage.setItem('images', JSON.stringify(this.state.images));
    }
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
    let url = '/api/uploads/getone';
    let img = JSON.parse(JSON.stringify(this.state.images));
    let lastPost = 'all';

    if (img.length > 0) {
      lastPost = img[img.length - 1]; 
      lastPost = lastPost.created; 
    }
    this.setState({loading: true});

    const request = new Fetch();

    request.get(url)
      .query({
        created_before: lastPost
      }).then(res => {
        if (res.status >= 200 && res.status < 300) {
          return res;
        }
      })
      .then(res => {
        return res.json();
      }).then(data => {
        let combined = [...this.state.images, ...data.images];
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
    alignItems: 'center'
  },
};

export default ReactApp;