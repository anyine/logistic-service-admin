import React from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {toggle} from '../actions/toggleMenu';

//将状态写入属性
function mapStateToProps(state) {
    return {
        collapsed: state.collapsed
    }
}

//将动作写入属性
function mapDispatchToProps(dispatch) {
    return bindActionCreators(toggle, dispatch)
}

class App extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);