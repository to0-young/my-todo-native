import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

function Spinner() {
    return (
        <View style={styles.spinnerContainer}>
            <ActivityIndicator size="large" color="#000000" />
        </View>
    );
}

const styles = StyleSheet.create({
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Spinner
