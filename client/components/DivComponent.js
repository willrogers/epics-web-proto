import React from 'react';


export class DivComponent extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(<div> {this.props.EPICSValue} </div>);
    }

}