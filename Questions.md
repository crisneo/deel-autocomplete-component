# Questions and Answers

###### 1. What is the difference between Component and PureComponent? Give an example where it might break my app. 

Both Component and PureComponent are base classes we use to create custom components
the difference is that a component that inherits from Component re-renders the component everytime the "setState()" is called 
so it may cause unnecessary re-renders and affect performence.   PureComponents will only re-render if the component's props have changed
PureComponents implement the "shouldComponentUpdate" method.

###### 2. Context + ShouldComponentUpdate might be dangerous. Why is that?

there can be issues when combining these two because shouldComponentUpdate doesn't automatically consider context changes, 
it only compares props and state

###### 3. Describe 3 ways to pass information from a component to its PARENT.
- the child component can receive a function via props from its parent component, this function can save data into state
- using ContextAPI we can handle data from a child that parent will notice
- using Redux we have a global state that can be updated in a child component and parent will notice

###### 4. Give 2 ways to prevent components from re-rendering.

Depending on the scenario, some techniques we may use are:
- Using PureComponents adding logic to shouldComponentUpdate
- in functional components we can memoize the result of a component using React.memo if props haven't changed
- also handling state changes in a good way(change only necessary values and avoid data duplication) help us to prevent unnecessary renders


###### 5. What is a fragment and why do we need it? Give an example where it might break my app.
it is a way to group multiple children elements, using <>..</> or <React.Fragment></React.Fragment> syntax
a fragment can break an app is we don't close the open/close tags correctly e.g. 

	const Eg = () => {
	return (
	<>
		<span>hello world</span>
		{1==1 && <p>some text.</p>}
		{/**/}
	</>
);
}

###### 6. Give 3 examples of the HOC pattern.
HOC's is a pattern that help us to create or composite components based on other components
a) e.g a custom component that has logging capabilities:
	const withLog = (WrappedComponent) => {
	const withLog = (props) => {
	useEffect(() => {
	  console.log('Component mounted/started');

	  return () => {
		console.log('Component unmounted/ended');
	  };
	}, []);

	return <WrappedComponent {...props} />;
	};

	return withLog ;
	};

export default withLogging;

b) using materialUI library withStyles you use:


	import InputLabel from '@mui/material/InputLabel';
	const styles = {
	root: {
	background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
	border: 0,
	},
	};

	const StyledLabel = ({ classes }) => {
	  return <InputLabel className={classes.root}>Styled Label</InputLabel>;
	};
	export default withStyles(styles)(StyledLabel);

c) using react-router:

	const TheComponent = ({ match, location, history }) => {
	return (
	<div>
	  <p>Current Path: {match.path}</p>
	  <p>Current Location: {location.pathname}</p>
	  <button onClick={() => history.push('/new-route')}>
		Go to Route
	  </button>
	</div>
	);
	};

	export default withRouter(TheComponent);

###### 7. What's the difference in handling exceptions in promises, callbacks and async...await?
In Promises,  errors are handled using the .catch() or chaining a rejection handler with .then()
In Callbacks, errors are tipically handled through the first parameter of the callback, usually named as 'err', err is null or undefined is no error is present.
In async/await, we use try...catch block to handle errors suring the execution of awaited promises.

personally I prefer the first and third options when it comes to handling errors, the second can cause 'callback hell'

###### 8. How many arguments does setState take and why is it async.
setState can take two arguments(the second is optional)
the first argument can be the object to save(the most common use) e.g. 

	setState({ count: this.state.count + 1 }) 
	
or it can ba a function  this is useful when the new state depends on the previous state. e.g. 

	setState((prevState, props) => {
	  return { count: prevState.count + props.increment };
	});    
	
setState is async it means it doesn't update the state inmediately.  if we want to execute a code after the state has been update we can use a function as the second argument e.g. 

	this.setState({ count: this.state.count + 1 }, () => {
	  console.log('State updated:', this.state.count);
	});

###### 9. List the steps needed to migrate a Class to Function Component.
The steps I would follow are:
- replace the class component definition with a functional component definition(identifying external props)
- move state and lifecyvle methods: everything from this.state should go to a useState hook.(in one or several values)  , for lifecycle methods(componentDidMount, componentDidUpdate, componentWillMount) move that logic to useEffect hook
- convert class methods to functions
- remove the render method and the content of the component should be the result of the functional component
- remove unused code
- optimize, e.g. use React.memo when possible


###### 10. List a few ways styles can be used with components.
- CSS stylesheets, we can import a css file into our component and use className=""
- Inline Styles, using the style attribute we can pass style objects 
- using libraries like Styled or material ui theming 
- css preprocessing and css modules(but it would be almos the same than option 1)

###### 11.  How to render an HTML string coming from the server.
we can use the attribute dangerouslySetInnerHTML. e.g. 
	import React from 'react';

	function ComponentWithHTML({ htmlString }) {
	  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
	}

	export default ComponentWithHTML;

when using this we should always validate or sanitize the htmlContent otherwise we are exposing the app to XSS attacks. an alternative would be using libraries for doing this like DOMPurify


 

