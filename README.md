# EpicsWebProto


### Overview

A simple web page to display an EPICS PV using the Redux design pattern,
expressed in ReactJS. It will show a single PV as text, in a div element.


### Setup

From the command line, enter the commands:

    npm install
    npm start

Navigate to http://localhost:3000/ in your browser

### Testing

To install the test dependencies:

	npm install --dev
	npm test

You can run the tests on every change:

	npm run test:watch

### Dependencies

App:

* React
* Redux: This is largely a pattern, but provides the store functions.

Development:

* Webpack: Config located in 'webpack.config.js'
* Babel: Config located in '.babelrc'

Testing:

* Jest: Config located in 'jest.conf.js'
* Eslint: Config located in './.eslintrc.js'
* Enzyme: Set up in 'setupTests.js'


### Architecture

Flux: A design pattern created by Facebook. Key idea is unidirectional flow of data, allowing for easy debugging as there is a clear chain of actions leading to any error.

Redux: This introduces the idea of a single, global store to hold your state. Reducers are used to return new data, based on the old data along with a new request to change it. This allows us to keep an immutable store. Couples with Flux

React: This is a UI framework that allows us to update specific elements of a web page with particular efficiency.
A version of the DOM is kept in memory (the 'virtual dom'), which allows React to update only
the parts of the DOM that really need to change.


### CONTENTS:

1.	INTRODUCTION & INSTALLATION
2.	RUN-TIME ENVIRONMENT
3.	CLIENT VIEW & STATE MANAGEMENT
4.	SERVER
5.	TESTING
6.	UTILITIES
7.	CONCEPT GLOSSARY
8.	CONFIGURATION


1. INTRODUCTION & INSTALLATION:



    About the Project:

		EpicsWebProto
		A prototype to explore and demonstrate a gui for reading and writing to EPICS process variables, via a web browser. The final goal being a control system web-application capable of displaying screens similar to the currently utilised Control System Studio and Extensible Display Manager. In effect a control system app with the following benefits; portability, platform agnosticism, scalability, no user installation, and server-side updating.

		Use Cases
		Some proposed use cases, that may or may not end up being feasible depending on the final decided functionality and security measures:
			Control system on tablets
			Remote access (subject to approval)
			Machine status screens
			Public engagement

		Installation & Start up (Linux)
			This application requires the latest verion of Node js to be installed on the users machine.

				1. Ensure your server is running. If using Malcolm, navigate to the directory where you have Malcolm saved ./pymalcolm and enter the following command:

						./malcolm/imalcolm.py malcolm/modules/demo/MULTI-PV.yaml

				2. Using the command line, navigate to the directory where you have the application stored.

				3. Enter the command:

						npm install && npm start

				4. Navigate to http://localhost:3000/ in your browser



	2. RUN-TIME ENVIRONMENT:

		- Node.js
			We are using Node.js for our RTE, Node.js allows us to use JavaScript for server-side scripting (dynamic content). Uses an event-driven architecture which allows for high throughput and scalability. Driven by a directive to use JavaScript as the sole language of a web application, both client & server side. Libraries are imported as packages, we use the default package manager - NPM


		- Node Package Manager(NPM)
			This handles the importation and management of JavaScript modules that the core application is dependent on, whether it is for run-time, testing, view, linting etc. Examples react, babel, webpack, sinon. Often extra packages are needed to resolve conflicts between two separate dependencies.


		- Babel
			This is a preprocessor, a tool that transpiles our modern JavaScript code into a more backwards-compatible-friendly legacy version of JavaScript. Allowing usto use the newer, more experiemental JavaScript features presented to us with ES6 without the browser version compatibility issues.


		- WebPack
			This is our module bundler, it takes all of the files in our application and the sections of imported modules that they rely upon, and bundles it into a single file: bundle.js. This is more efficient for the browser to use. The main desirable feature is its ability to 'Code Split', in that it separates our code into chunks that are loaded on demand, further increasing efficiency and improving load times for large applications. This affords additional scalability.




	3. CLIENT VIEW & STATE MANAGEMENT:

		- React
			React is a JavaScript library that provides the view framework.

			Tthe main attraction of React is scalability. It uses a diffing algorithm on a virtual DOM stored in local memory. This allows for many updateable components, or widgets, to be on screen at once, receiving targeted updates. This makes it suitable for a control system screen, which can require background, meta-information to supply the various values that end up being shown on a screen.

			We use a component hierarchy with 'smart' containers at the top level, the container listens to changes in the store and requests the updated values in response. When the container updates its state using this information from the store, the children components have access to this state through props, a React feature that allows us to filter information downward through a hierarchy. The child component then handles the specific presentation logic for the visualisation of an aspect of machine control.

		- Redux
			Redux is a design pattern for web applications, it promotes uni-directional flow as the key-concept. It is heavily based on and extends flux, but we shall refer to it solely as Redux

			The starting point of the Flux flow is an Action. It is a simple JSON containing a decription of its purpose, and the data required to effect that purpose. It is can be created on user interacton, or receipt of data from a server. This action is sent to our reducer & store. The reducer takes the action and the current state of the store, and returns a new state to the store. This new state reflects the original state, with the changes described in the action applied, forming the new current state of the store.

			Our React components are hooked into the store and listen for changes, upon which it requests an update via an event handler callback.

			This uni-directional flow keeps code simple and easier to read, and also provides a clear trace of behaviour, enabling easier identification of errors in source code. At full scale, our app may have hundreds of variables in active at once, this ease of navigation will help us keep the data flow tidy.




	4. SERVER:

		- Server Agnosticism
			The application is being developed to foster easy interfacing with a number of different servers, below we discuss our specific implementation.


		- Malcolm
			A server for talking EPICS, surfaces this information via a  websocket port, that we connect to. Its main purpose is to provide re-usable code for similar scans across beamlines/experiments. Written in Python, talks to EPICS IOCs via channel access.

		- EPICS / IOCs
			A network of hardware and software that makes up the control system, where Input/Output Controllers (IOCs) talks to the machine/beamline hardware. These IOCs are on a network that users can connect to directly, or by positioning a server such as Malcolm between the IOC and the user. This server can then be interacted with directly or by creating an app, such as this one.

			Machine hardware ---> IOC ---> Malcolm ---> EpicsWebProto ---> user

		- WebSockets
			We use a WebSocket connection to gather information from, and present information to, Malcolm. WebSockets open a full-duplex dialogue between server and client, eliminating the need for constant requests and response packages. This is useful for us as we want to subscribe to potentially many process variables concurrently, which we can do with a WebSocket by making use of its multiplex capability.




	5. TESTING

		Karma
			Our test-runner. It takes our test suite and runs it in a number of different browsers by spawning and using a web server. We load our tests into karma, which then runs them in node, checking against numerous environments.

		Mocha
			A test framework, we use this a base for our other libraries to plugin to. It provides the basic testing syntax of [describe] and [it].

		Enzyme
			This is a React specific testing toolkit, it provides methods such as shallow and mount. Both methods mount your component to a fake DOM for testing, Shallow will only mount the selected component, whereas Mount will mount will mount the children/subcomponents

		Chai
			Chai is an assertion library that allows us to run checks during tests. We state the desired working case, Chai runs this check, throwing an error if our test does not pass the check.

		Sinon
			Sinon is a toolset that provides different types of test double, such as mocks, stubs, spies etc. This is useful to emulate the server and store, and record method calls to and from them.




	6. UTILITIES

		- WebStorm
			WebStorm is a JavaScript IDE that has a number of useful features, such as real-time lint evaluation, method and function usage tracking, dependency diagram generation, etc.


		- ESLint
			A code-style evaluation tool, configurable to enforce our own style rules. Warns of improper use of syntax, such as improper imports, unused variables, errant console logs and so on.


		- Git & GitHub
			A version-control tool providing access and management repositories, and it's online user-interface. This allows us to rollback from failed changes, and protect against data loss due to hardware failure.


		- CodeClimate
			Integrates ESLint into GitHub, runs linting checks on pull requests, setting a coding style standard for our master branch.


		- Travis
			This integrates our testing framework into GitHub, running our test suite on any pull requests. This also dictates that we have all tests passing before a merge into master is made.




	7. CONCEPT GLOSSARY

		REACT

			Component
				A unit of React code, usually represents one aspect of the interface design, for example TimerComponent, or GaugeComponent.

			State
				The internal data of a component. When set as a parent component, the update is reflected in props, for use by child components

			Props
				Received from a parent component, it contains information passed from parent to child. For example from a parent component that is hooked to a store, to a child component that wants to display that store data.

			Document Object Model (DOM) & Virtual DOM
				The DOM is a file structure that denotes the hierarchy present in a HTML document, describing where in that structure individual elements belong. The virtual

			DOM Diffing
				We describe the changes that we want with React, which produces a Virtual DOM to represent that. React then performs a diff on the Virtual DOM and the real DOM, the differences it detects are then directly to the specific relevant nodes. This is efficient as it avoids traversing the DOM hierarchy for every change you want to make.

			Mounting/Unmounting
				React makes a single HTML element which it mounts to the DOM, the React components then mount to this top level element. Mounting and unmounting can be used as an event to trigger actions such as connecting, subscribing, unsubcribing, etc. It is used similarly to constructor logic for initialisation, by utilising the Component Lifecycle

			Component Lifecycle
				Consists of:
					willMount
						initialisation/connection
					didMount
						initialisation/connection
					willReceiveProps
						state management
					shouldUpdate
						state management
					willUpdate
						state management
					didUpdate
						state management/clean-up
					render
						final
					willUnmount
						clean-up/disconnection

		WEBSOCKET
			Multiplex
				The act of utilising multiple bi-directional communication threads using a single WebSocket, effectively emulating additional WebSockets.

		MALCOLM
			Block
			Property
			Path
			ID
			Typeid
				The type of action you want to perform with Malcolm, ie a Put/Get/Subscribe etc.

			Channel Access
				The method by which EPICS IOCs facilitate interaction between users and the machine hardware.

		REDUX
			Reducer
				A pure function in that it returns a single output for any given input. In our case, it takes an action describing a change in state, as well as the state held in the store, and returns from that a new state object describing the udpated store.

			Immutable Store
				We never modify any property in the store, instead we create a new store each time we want to update it.



	7. CONFIGURATION

		rc files
			eslint
			codeclimate
			babel
		package.json
			NPM package dependencies
		webpack.config
			What syntax to transpile to
		karma.config
			Hooking NPM into our test runner




////////////////////////////////
