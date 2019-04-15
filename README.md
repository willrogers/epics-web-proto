# epics-web-proto


### Overview

epics-web-proto is a prototype EPICS display manager that runs in a browser.
It communicates over websockets to a server that interacts with the control
system itself. It is based on React and Redux.

It can be packaged into a native application using Electron.

The goal is a control system web-application capable of displaying 
screens similar to existing applications, but with the following benefits: 
portability, platform agnosticism, scalability, no user installation, 
and server-side updating.

### Use Cases

Some proposed use cases:

* UI available on phones and tablets
* Remote access to control system interfaces
* Machine status screens
* Public engagement


### Setup

#### Using node server

From the command line, enter the commands:

    npm install
    npm start

Navigate to http://localhost:3000/ in your browser


#### Demo electron app

From the command line, run:

    npx electron .


### Testing

To install the test dependencies:

    npm install --dev
    npm test

You can run the tests on every change:

    npm run test:watch


### Dependencies

App:

* [React](https://reactjs.org/): Facebook's component-based UI library.
* [Redux](https://redux.js.org/): A state management library.

Development:

* Webpack: Config located in 'webpack.config.js'
* Babel: Config located in '.babelrc'

Testing:

* Jest: Config located in 'jest.conf.js'
* Eslint: Config located in './.eslintrc.js'
* Enzyme: Set up in 'setupTests.js'


### Architecture

React is an efficient way of updating web pages using its now-famous virtual
DOM. It allows you to structure pages in terms of components, which are easy
to reason about, test and re-use.

Flux: A design pattern created by Facebook. Key idea is unidirectional flow of 
data, allowing for easy debugging as there is a clear chain of actions leading 
to any error. We use ideas from Flux, but stop short of externalising all
component state into a global store.

Redux: Redux is an implementation of Flux. This introduces the idea of a 
single, global store to hold your state. Reducers are used to return new data, 
based on the old data along with a new request to change it. This allows us to 
keep an immutable store.


See also https://devbutze.com/p/306.