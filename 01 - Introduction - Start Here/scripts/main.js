var React = require('react');
var ReactDOM = require('react-dom');


/*
   Store picker
*/

var StorePicker = React.createClass({
	render : function(){
		return (
			// Remember using className when using CSS classes
			<form className="store-selector">
				<h2>Please Enter a Store</h2>
				<input type="text" ref="storeId" required />
				<input type="submit" />
			</form>
		) 
	}
});

ReactDOM.render(<StorePicker/>, document.querySelector('#main')); 