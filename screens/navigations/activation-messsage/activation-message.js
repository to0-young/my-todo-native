import React from 'react'
import { View, Text,  StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import actionCreator from '../../store/action-creator'
import {logoutRequest} from "../../reusable/requests/session/sessionRequest";

const ActivationMessage = (props) => {


    const onExit = async () => {
        const res = await logoutRequest();
        const json = await res.json();

        if (res.ok) {
            props.deleteSessionSuccess();
        }

        return json;
    };

    return (
        <View style={styles.activationMessage}>
            <View style={styles.activationMessageForm}>
                <Text style={styles.confirmYourAccount}>Confirm your account</Text>

                <TouchableOpacity onPress={onExit}  tyle={styles.exitBtn}>
                    <Text style={styles.exitText}>EXIT</Text>
                </TouchableOpacity>

                <Text style={styles.confirm}>
                    Once confirmed, this email will be uniquely associated with your Todo account.
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    activationMessage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activationMessageForm: {
        alignItems: 'center',
    },
    exitBtn: {
        alignItems: 'center',
        width: 100,
    },
    exitText: {
        left: 1,
        color: '#fff',
        backgroundColor: '#010b1e',
        borderRadius: 20,
        fontSize: 20,
        padding: 15,
    },

    confirm: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 18,
    },
    confirmYourAccount: {
        color: '#50e10b',
        fontSize: 25,
        margin: 10,
        fontWeight: 'bold',
    },
});

const ConnectedActivationMessage = connect(null, actionCreator)(ActivationMessage);
export default ConnectedActivationMessage;



