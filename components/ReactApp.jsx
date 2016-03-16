import React from 'react';
import AwesomeComponent from './AwesomeComponent';
import SearchExampleComponent from './SearchExampleComponent';


class ReactApp extends React.Component {
  constructor(props) {
    super(props);
    const placeholder = {
      try: 'removing some whitespace',
      or: 'add valid JSON',
      then: ['then', 'click', 'format'],
      hi: 'mom!!!'
    };
    
    this.state = {
      value: JSON.stringify(placeholder, null, 4),
      txtClass: styles.textArea
    };
  }

  render() {
    return (
      <div id='app' style={styles.container}>
        <div className='navbar'>
          <h1 style={styles.header}>Isomorphimg</h1>
        </div>
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