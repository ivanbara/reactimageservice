import React from 'react';

class MenuComponent extends React.Component {

	constructor(props){
		super(props);
		this.state = { focused : 0 }

	}

	onSelect(index){
		this.setState({focused: index});
	}

	render(){

			return (
            <div>
                <ul>{ this.props.items.map((m, index) => {
	                    var style = '';
	                    if(this.state.focused == index){
	                        style = 'focused';
	                    }
	                    return <li key={index} className={style} onClick={this.onSelect.bind(this, index)}>{m}</li>;
	                		})
              			}

                </ul>
                <p>Selected: {this.props.items[this.state.focused]}</p>
            </div>
      );
	}

}

export default MenuComponent;