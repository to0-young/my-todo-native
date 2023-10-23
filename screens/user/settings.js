import React from 'react';
import {View} from "react-native";
import {connect} from "react-redux";
import actionCreator from "../store/action-creator";

function Settings(props) {
  return (
    <View>
      <text>
        Coming soon...
      </text>
    </View>
  );
}

const ConnectedSettings = connect(null, actionCreator)(Settings);
export default ConnectedSettings;
