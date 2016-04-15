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

      this.stylem = {lineHeight: 50, height: 100};
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
    	let doc = document.documentElement;
    	let top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
	    let viewPortHeight = window.innerHeight;
	    let bodyHeight = document.body.scrollHeight;
			
			// If at bottom
			if ( (bodyHeight - top) == viewPortHeight) {
				console.log('---------------Loading More Stuff-----------------');
	    	this.props.loadMore();
			}
	    
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
      return (<div style={this.stylem}>First Div</div>);
    }
}

export default Scroller;
