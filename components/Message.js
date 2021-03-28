import React, {Component} from 'react'
import {Snackbar} from "react-native-paper"
import {connect} from "react-redux"
import {hideMessage} from "../actions/message";

class Message extends Component {
    closeSnackBar = () => {
        this.props.close()
    }

    render() {
        const {message} = this.props;
        return (
            <Snackbar
                visible={message.open}
                onDismiss={this.closeSnackBar}
                action={{
                    label: 'Close',
                    onPress: this.closeSnackBar
                }}
                duration={2000}>
                {message.text}
            </Snackbar>
        )
    }
}

const mapStateToProps = ({message}) => {
    return {message}
}
const mapDispatchToProps = (dispatch) => {
    return {
        close: () => {
            dispatch(hideMessage())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Message)
