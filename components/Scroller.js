import React from 'react';

const SCROLL_TIMEOUT = 200;
const CHECK_INTERVAL = SCROLL_TIMEOUT / 2;

function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}


class Scroller extends React.Component {
    constructor(props) {
      super(props);
      
      this.onScrollEnd = this.onScrollEnd.bind(this);
     	this.onScrollStart = this.onScrollStart.bind(this);
     	this.onScroll = this.onScroll.bind(this);
      this.checkScroll = this.checkScroll.bind(this);
      
      this.state = {scrolling: false};
      this.scrolling = false;
      this.checkInterval = setInterval(this.checkScroll, CHECK_INTERVAL);
    }

    printTest(){
    	let maxScroll = getDocHeight() - screen.height;
	    let percentage = maxScroll > 0 ? (document.body.scrollTop / maxScroll) : 0;

	    console.log('scroltop',document.body.scrollTop);

	    console.log('maxScroll', maxScroll);
	    console.log('percentage', percentage);

	    console.log('docHeight', getDocHeight());
	    console.log('screen height', screen.height);
    }
	  
	  componentDidMount(){
			window.addEventListener('scroll', this.onScroll, false);   
    }

    componentWillUnmount(){
    	window.removeEventListener('scroll', this.onScroll, false);
    	clearInterval(this.checkInterval);
    }

    checkScroll(){
    	if (Date.now() - this.lastScrollTime > SCROLL_TIMEOUT && this.scrolling) {
        this.scrolling = false;
        this.onScrollEnd();
      }
    }

    onScrollStart(){
      this.setState({scrolling: true});
      console.log('scroll start');
    }

    onScrollEnd(){
      this.setState({scrolling: false});
    	console.log('scroll END');
    }

    onScroll(){
    	if (!this.scrolling) {
        this.scrolling = true;
        this.onScrollStart();
      }
      this.lastScrollTime = Date.now();
    }


    render(){
      return <div style={{lineHeight: 500, height: 1000}}>Hello {this.props.name}! Scrolling? {this.state.scrolling ? 'yes' : 'no'}</div>;
    }
}

export default Scroller;
