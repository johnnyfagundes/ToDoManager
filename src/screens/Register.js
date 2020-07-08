import React, { Component } from 'react';
import {
    SafeAreaView, KeyboardAvoidingView, View, Image, TextInput, Button, Text,
    StyleSheet, Alert
} from 'react-native';

import { createUserOnFirebaseAsync } from '../services/FirebaseApi';

const img = require('../assets/person.png');

export default class Register extends Component {

    static navigationOptions = {
        title: 'Register'
    };

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            email: this.props.email,
            password: ''
        };
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView style={styles.container}
                    behavior='padding'>
                    <View style={styles.topView}>
                        <Image style={styles.img}
                            source={img} />
                        <Text style={styles.title}>New user</Text>
                    </View>
                    <View style={styles.bottomView}>
                        <TextInput style={styles.input}
                            placeholder='Email'
                            keyboardType={'email-address'}
                            autoCapitalize='none'
                            onChangeText={email => this.setState({ email })} />
                        <TextInput style={styles.input}
                            placeholder='Password'
                            secureTextEntry={true}
                            onChangeText={password => this.setState({ password })} />
                        <Button title='Register User'
                            onPress={() => this._createUserAsync()} />
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }


    async _createUserAsync() {
        try {
            const user = await createUserOnFirebaseAsync(this.state.email,
                this.state.password);
            Alert.alert("User Created",
                `User ${user.email} has succesfuly been created!`,
                [{
                    text: 'Ok', onPress: () => {
                        this.props.navigation.goBack();
                    }
                }]);
        } catch (error) {
            Alert.alert('Create User Failed!', error.message);
        }
    }
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#F3F2F0',
    },
    topView: {
        flex: 0.20,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 25,
        justifyContent: 'center',
    },
    img: {
        width: 70,
        height: 70
    },
    title: {
        color: "grey",
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        // marginLeft: 20
    },
    bottomView: {
        flex: 1,
        flexDirection: 'column',
        paddingRight: 20,
        paddingLeft: 20
    },
    input: {
        marginBottom: 20
    }
});