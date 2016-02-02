var React = require('react');
var ReactDOM = require('react-dom');

// =========== ROUTING ================
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route  = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
// this allows to create push state for older browsers so you can 
// modify the way the url look and remove the # tag from this: http://localhost:3000/?#/?_k=8nb1um
// after creating this you'll need to use it inside the <Router> tag
var createBrowserHistory = require('history/lib/createBrowserHistory');
// =================================


/* ======= GOTCHAS =========

	// Remember using className when using CSS classes
	// you need to close self closing tags like this: <input type="submit" /> INSTEAD OF  <input type="submit">
	// Also close tag that reference components: <Header /> Use capitals for components
	// use {} when making comments inside the HTML being return inside a component  
	// tagline is a made up name, you can come up with whatever you want and then get access to it later (video 6)

============================*/



/*======================
	APP COMPONENT
========================*/
var App = React.createClass({
	render : function(){
		return(
			<div className="catch-of-the-day">
				<div className="menu">
					{/* component */}
					<Header tagline="Fresh Seafood Market" />
				</div>
				<Order />
				<Inventory />
			</div>
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
				<h3 classNmae="tagline"><span>{this.props.tagline}</span></h3>
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
	INVENTORY COMPONENT
========================*/
var Inventory = React.createClass({
	render : function(){
		return (
			<p>Inventory</p>
		) 
	}
});




/*======================
	STORE PICKER COMPONENT
========================*/
var StorePicker = React.createClass({
	render : function(){
		return (
			<form className="store-selector">
				<h2>Please Enter a Store</h2>
				<input type="text" ref="storeId" required />
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
		{/* Using the :storeId  allows you to create variables for different paths */}
		<Route path="/store/:storeId" component={App} />
		<Route path="*" component={NotFound} />
	</Router>
)



/*===============================================================
	  RENDER THE ROUTE COMPONENTS TO THE INDEX.HTML #main tag
================================================================*/
ReactDOM.render(routes, document.querySelector('#main')); 













