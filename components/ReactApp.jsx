import React from 'react';
import AwesomeComponent from './AwesomeComponent';
import AjaxList from './AjaxList';
import DropZonePlace from './DropZonePlace';



class ReactApp extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      value: 'set'
    };
  }
  // <AjaxList apiKey='642176ece1e7445e99244cec26f4de1f' />
  render() {
    return (
      <div id='app' style={styles.container}>
        <div className='navbar'>
          <h1 style={styles.header}>Isomorphimg</h1>
        </div>
        <div className='uploadzone'>
          <DropZonePlace />       
        </div>
        <AjaxList url='/api/uploads/all' />
        <AwesomeComponent img='./img/mammoth_happy.png' adj='Like'/>
        <div className='imageContainer'>
          images
        </div>
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