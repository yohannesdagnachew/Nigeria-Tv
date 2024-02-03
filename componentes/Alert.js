import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

export default function AlertSignal({pressHandler, marginTop}) {


    return (
        <View style={[styles.alertConatiner, {marginTop: marginTop}]}>
            <Text style={styles.alertTitle}>No Internat</Text>
            <Button onPress={pressHandler} textAlign='center' textColor='white' style={styles.btn}>Try Again</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    alertConatiner: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: 250,
        height: 200,
        borderRadius: 10,
    },
    alertTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black',
    },
    btn: {
        backgroundColor: '#008CBA',
        padding: 10,
        borderRadius: 10,
        textAlign: 'center',
        width: 120,
    }
})


