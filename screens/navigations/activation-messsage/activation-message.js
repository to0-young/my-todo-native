import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import actionCreator from '../../store/action-creator';
import { useNavigation } from '@react-navigation/native';

const ActivationMessage = (props) => {
    const navigation = useNavigation();

    const onExit = async () => {
        const res = await fetch('http://192.168.1.101:3000/api/v1/sessions', {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        });
        const json = await res.json();
        if (res.ok) {
            props.deleteSessionSuccess();
            navigation.navigate('Signin');
        }
        return json;
    };

    return (
        <View style={styles.activationMessage}>
            <View style={styles.activationMessageForm}>
                <Text>Confirm your account</Text>

                <Button onPress={onExit} title="Exit" color="info" />

                <Text>Once confirmed, this email will be uniquely associated with your Todo account.</Text>
            </View>
        </View>
    );
};

const ConnectedActivationMessage = connect(null, actionCreator)(ActivationMessage);
export default ConnectedActivationMessage;

const styles = StyleSheet.create({
    activationMessage: {
        flex: 1,
    },
    activationMessageForm: {
        alignItems: 'center',
    },
});
