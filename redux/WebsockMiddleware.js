//Import the connection-y stuff
//We will keep the websocket in here, If we pick out a websocket-y
//action then we will handle the logic in here, and pass the return
//back to action creator, to send to the store. If we don't recognise
//the actionType here (in this case, we will be looking at the return from
// an action that has previously gone through this middleware.)
// hen we will pass it on to the standard reducer fr


// const websockMiddleware = store => next => action {
//
// }


const websockMiddleware = function(middlewareAPI){
    return function(next){
        return next(action);
    }
};


export default websockMiddleware()
