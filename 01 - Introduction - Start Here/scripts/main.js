var React = require('react');
var ReactDOM = require('react-dom');

// =========== ROUTING ================
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route  = ReactRouter.Route;
var Navigation = ReactRouter.Navigation; //mixin
// Provides a mixin that allows you to change the url
var History = ReactRouter.History; //mixin

/* this allows to create push state for older browsers so you can 
 modify the way the url look and remove the # tag from this: http://localhost:3000/?#/?_k=8nb1um
 after creating this you'll need to use it inside the <Router> tag */
var createBrowserHistory = require('history/lib/createBrowserHistory');



// =========== HELPERS ================
// format price and other helper functions
var h = require('./helpers.js');


/* ++++++++++++++++++++++++++++++++++++++++++++++++ GOTCHAS & TIPS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 

	- Remember using className when using CSS classes
	- you need to close self closing tags like this: <input type="submit" /> INSTEAD OF  <input type="submit">
	- Also close tag that reference components: <Header /> Use capitals for components and close it with />
	- use {} when making comments inside the HTML being return inside a component  
	- tagline is a made up name, you can come up with whatever you want and then get access to it later (video 6)
	- If you have multiple HTML elements to be return they must be enclosed on <div></div>
	- using {...this.props} is a way to pass all available methods inside a parent component down to its children

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */



/*======================
	APP COMPONENT
========================*/
var App = React.createClass({
	// The state (part of the React life cycle) lives in the App component
	getInitialState : function(){
		return{
			fishes : {},
			order : {}
		}
	},
	/* we need a method to add the fish to the App - but can't do it from within the AddFishForm 
	this method would need to be pass from App down to Inventory down to AddFishForm */
	addFish : function(fish){
		var timestamp = (new Date()).getTime();

		// update the state object
		this.state.fishes['fish-' + timestamp] = fish;

		/* set the state. You have to specifically put which state are you changing for performance reasons
		 so don't pass the whole state like this.state be specific  */
		this.setState({ fishes : this.state.fishes });
	},
	// load sample object containing fish data (sample-fishes.js)
	loadSamples : function(){
		this.setState({
			fishes : require('./sample-fishes')
		});
	},
	renderFish : function(key){
		// Whenever you render an element in React
		// React needs a unique key to be able to track a specific element and updated it, leaving the rest untouched
		return <Fish key={key} index={key} details={this.state.fishes[key]} />
	},
	render : function(){
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					{/* component */}
					<Header tagline="Fresh Seafood Market" />
					{/* Displays the list of sample fishes */}
					<ul className="list-of-fishes">
						{Object.keys(this.state.fishes).map(this.renderFish)}
					</ul>
				</div>
				{/* order component */}
				<Order />

				{/* The addFish method is being passed to inventory so it can be accesses by the AddFishForm component as well as the load samples data from  (sample-fishes.js) */}
				<Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
			</div>
		)
	}
});




/*======================
	  FISH COMPONENT
========================*/
var Fish = React.createClass({
	render: function(){
		var details = this.props.details;
		return(
			<li className="menu-fish">
				<img src={details.image} alt="" />
				<h3 className="fish-name">
					{details.name}
					<span className="price">{h.formatPrice(details.price)}</span>
				</h3>
				<p>{details.desc}</p>
				<small className="status">{details.status}</small>
			</li>
		)
	}
});



/*======================
	  HEADER COMPONENT
========================*/
var Header = React.createClass({
	render : function(){
		return (
			<header className="top">
				<h1>Catch
					<span className="ofThe">
						<span className="of">of</span>
				 		<span className="the">the</span>
				 	</span>	
				 Day</h1>
				<h3 className="tagline"><span>{this.props.tagline}</span></h3>
			</header>
		) 
	}
});




/*======================
	   ORDER COMPONENT
======================== */
var Order = React.createClass({
	render : function(){
		return (
			<p>Order</p>
		) 
	}
});



/*======================
ADD FISH FORM COMPONENT
======================== */
var AddFishForm = React.createClass({
	// !!! THE STATE DOESN'T LIVE IN THIS ADDFISHFORM BUT IN THE APP COMPONENT !!!!!!!
	createFish : function(event){
		// 1. stop default event on form
		event.preventDefault();

		/* 2. We want to be able to update the data bewteen the inventory the order and the menu
		we need a way to reference that data create an object and assign the data from the inventory form 
		this object can be access by the variable you used */
		var fish = {
			name   : this.refs.name.value,
			price  : this.refs.price.value,
			status : this.refs.status.value,
			desc   : this.refs.desc.value,
			image  : this.refs.image.value
		}
		console.log(fish);

		//  3. Add the fish object to the App State
		this.props.addFish(fish); 

		// resets the form after entering values
		this.refs.fishForm.reset();
	},
	render : function(){
		return(
			<form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
				<input type="text" ref="name" placeholder="Fish Name" />
				<input type="text" ref="price" placeholder="Fish Price" />
				<select ref="status">
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea type="text" ref="desc" placeholder="Desc">
				</textarea>
				<input type="text" ref="image" placeholder="URL to image" />
				<button type="submit">+ Add Item</button>
			</form>
		)
	}
});




/*======================
	INVENTORY COMPONENT
========================*/
var Inventory = React.createClass({
	render : function(){
		return (
			<div>
				<h1>Inventory</h1>

				{/* ++++++++++++++++++ ADDFISHFORM COMPONENT SHARING METHOD PASSED TO INVENTORY IN THE APP COMPONENT line 68 ++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
					{/* Using what is called props to share this kind of methods using ... ensure that all methods passed to Inventory
					are also accessible to other components inside of it */}
					<AddFishForm {...this.props} />
					{/* Notice the loadSamples method is notbeing accessed from within the inventory but within the App component */}
					<button onClick={this.props.loadSamples}>Load Sample Fishes</button>
			</div>	
		) 
	}
});




/*======================
	STORE PICKER COMPONENT
========================*/
var StorePicker = React.createClass({
	// This mixins allows the pushState to work, you can see [History] being use as mixin from line 11
	mixins : [History],
	goToStore : function(event){
		event.preventDefault();
		/* Get the data from the input, we eventually want the URL to be whatever the value in that input is 
		we would be using the refs to refer to the ref value assigned to the input below (ref="storeId")
		in order to change the URL we need a package called History*/
		var storeId = this.refs.storeId.value;
		this.history.pushState(null, '/store/' + storeId);
		console.log(storeId);

	},
	render : function(){
		return (
			<form className="store-selector" onSubmit={this.goToStore}>
				<h2>Please Enter a Store</h2>
			{/* Use defaultValue instead of value this is using the getFunName from the hepers.js file that 
			was imported by the var h = require('./helpers.js');    */}
				<input type="text" ref="storeId" defaultValue={h.getFunName()} required />
				<input type="submit" />
			</form>
		) 
	}
});



/*================================
	NOT FOUND COMPONENT PAGE 404
==================================*/
var NotFound = React.createClass({
	render : function(){
		return <h1>Not Found</h1>
	}
});




/*======================
	    ROUTES
========================*/
var routes = (
	<Router history={createBrowserHistory()}>
		{/* passing the name of the two main "pages" StorePicker (login) and the App (remaining components)  */} 
		<Route path="/" component={StorePicker} />  
		{/* Using the :storeId  allows you to create variables for different paths see the StorePicker component
		to see the reference to the mixin History */}
		<Route path="/store/:storeId" component={App} />
		<Route path="*" component={NotFound} />
	</Router>
)




/*===============================================================
	  RENDER THE ROUTE COMPONENTS TO THE INDEX.HTML #main tag. 
	  The routes variable contains the actual components: 
	  component={StorePicker}
	  component={App}
	  they render accordingly to each path.
================================================================*/
ReactDOM.render(routes, document.querySelector('#main')); 















