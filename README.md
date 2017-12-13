#EpicsWebProto


###Overview

A simple web page to display an EPICS PV using the Redux design pattern, expressed in ReactJS. It will show a single PV as text, in a div element.


###Setup

From the command line, enter the commands: 

    npm install
    npm start

Navigate to http://localhost:3000/ in your browser


###Dependencies

App:

* React
* Redux: Not sure what this provides as it is mostly pattern
* Flux: Provides the dispatcher functionality

Development:

* Webpack: Config located in './webpack.config.js'
* Babel: Config located in './.babelrc'

Testing:

* Karma: Config located in './karma.conf.js'
* Mocha
* Chai
* Eslint: Config located in './.eslintrc'
* Sinon
* Enzyme


###Architecture

Flux: A design pattern created by Facebook. Key idea is unidirectional flow of data, allowing for easy debugging as there is a clear chain of actions leading to any error.

Redux: This introduces the idea of a single, global store to hold your state. Reducers are used to return new data, based on the old data along with a new request to change it. This allows us to keep an immutable store. Couples with Flux

React: This is a UI framework that allows us to update specific elements of a web page with particular efficiency. 
A version of the DOM is kept in memory (the 'virtual dom'), which allows React to update only
the parts of the DOM that really need to change. 
