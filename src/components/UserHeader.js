import React from 'react';
import {connect}  from 'react-redux';
import {fetchUser} from '../actions';

class UserHeader extends React.Component {
    componentDidMount(){
        // this.props.fetchUser(this.props.userId);
    }
    render(){
        const {user } = this.props;
        if(!user){
            return <div>not found</div>;
        }
        return <div className="header">{user.name}</div>
    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log(state);
    return {
        user: state.users.find(user => user.id === ownProps.userId)
    }
}

export default connect(mapStateToProps, {fetchUser})(UserHeader);