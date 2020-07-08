import React, { Component } from 'react';
import {
    SafeAreaView, KeyboardAvoidingView, View, Image, TextInput, Button, Text,
    StyleSheet, Alert
} from 'react-native';
import { signInOnFirebaseAsync } from '../services/FirebaseApi';
import { StackActions, NavigationActions } from 'react-navigation';

const img = require('../assets/toToLogo.png');

export default class Login extends Component {

    static navigationOptions = {
        header: null
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
                        <Image style={styles.img} source={img} />
                        <Text style={styles.title}>To Do Manager</Text>
                    </View>
                    <View style={styles.bottomView}>
                        <TextInput style={styles.input}
                            value={this.state.email}
                            placeholder='Email'
                            keyboardType={'email-address'}
                            autoCapitalize='none'
                            onChangeText={(text) => this.setState({ email: text })} />
                        <TextInput style={styles.input}
                            placeholder='Password'
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({ password })} />

                        <Button title='Sign In'
                            onPress={() => this._signInAsync()} />

                        <View style={styles.textConteiner}>
                            <Text style={{color: "#cecece"}}>Not a member? Let's </Text>
                            <Text style={styles.textRegister}
                                onPress={() => {
                                    const { navigate } = this.props.navigation;
                                    navigate('pageRegister');
                                }} >
                                Register
                            </Text>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }

    async _signInAsync() {
        try {
            const user = await signInOnFirebaseAsync(this.state.email,
                this.state.password);
            const resetNavigation = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({
                    routeName:
                        'pageTasksList'
                })]
            });
            this.props.navigation.dispatch(resetNavigation);
        } catch (error) {
            Alert.alert("Login Failed", error.message);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#3498db',
        // alignItems: 'center',
        justifyContent: 'center',
    },
    topView: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 40
    },
    img: {
        width: 140,
        height: 80
    },
    bottomView: {
        flexDirection: 'column',
        paddingRight: 20,
        paddingLeft: 20,
    },
    input: {
        marginBottom: 10,
        paddingLeft: 5,
        backgroundColor: 'rgba(255,255,255,0.2)',
        height: 40,
        color: '#FFF',
        borderRadius: 5
    },
    textConteiner: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    buttonContainer: {
        backgroundColor: '#2980B9',
        paddingVertical: 15,
        marginTop: 10,
        borderRadius: 5
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF'
    },
    textBottom: {
        color: 'rgba(255,255,255,0.7)'
    },
    textRegister: {
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#FFFFFF'
    }
});

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: 'column'
//     },
//     topView: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 50
//     },
//     img: {
//         width: 140,
//         height: 80
//     },
//     bottomView: {
//         flexDirection: 'column',
//         paddingRight: 20,
//         paddingLeft: 20
//     },
//     input: {
//         marginBottom: 20
//     },
//     textConteiner: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         marginTop: 20
//     },
//     textRegister: {
//         fontWeight: 'bold'
//     }
// });