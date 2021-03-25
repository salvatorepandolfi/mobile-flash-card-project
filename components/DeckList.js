import React, {Component} from "react";
import {Text} from "react-native";
import {connect} from "react-redux";


class DeckList extends Component {
    render() {
        const {decks} = this.props
        return <Text>{JSON.stringify(decks)}</Text>
    }
}

const mapStateToProps = ({decks}) => {
    return {decks}
}
export default connect(mapStateToProps)(DeckList)
