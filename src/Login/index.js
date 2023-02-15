import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, TextInput, TouchableOpacity, Alert, ActivityIndicator, Modal, TouchableHighlight, StatusBar, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '../Component/Text';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

let { width, height } = Dimensions.get('window')

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            isHidePw: true,
            isLoading: false,
            modalSuccess: false
        }
    }

    componentDidMount() {
        StatusBar.setBarStyle('light-content')
        if (Platform.OS == 'android') {
            StatusBar.setTranslucent(true)
            StatusBar.setBackgroundColor('transparent')
        }
    }

    Login() {
        if (this.state.email == '') {
            Alert.alert(
                'เข้าสู่ระบบไม่สำเร็จ',
                'กรุณากรอก อีเมล',
                [
                    {
                        text: 'ตกลง'
                    }
                ]
            )
        }
        else if (this.state.password == '') {
            Alert.alert(
                'เข้าสู่ระบบไม่สำเร็จ',
                'กรุณากรอก รหัสผ่าน',
                [
                    {
                        text: 'ตกลง'
                    }
                ]
            )
        }
        else {
            this.setState({
                isLoading: true
            }, () => {
                if (!this.checkEmailandPw()) {
                    Alert.alert(
                        'เข้าสู่ระบบไม่สำเร็จ',
                        'ไม่พบผู้ใช้งานในระบบ กรุณาลองใหม่อีกครั้ง',
                        [
                            {
                                text: 'ตกลง', onPress: () => this.LoginFailed()
                            }
                        ]
                    )
                }
                else {
                    this.LoginSuccessed()
                }
            })
        }
    }

    checkEmailandPw() {
        return (this.state.email == 'test@test.com') && (this.state.password == '12345678')
    }

    LoginSuccessed() {
        this.setState({
            isLoading: false,
            modalSuccess: true
        })
    }

    LoginFailed() {
        this.setState({
            isLoading: false,
            password: ''
        })
    }

    render() {
        return (
            <LinearGradient colors={['#7733ff', '#9966ff', '#bb99ff']} style={styles.container}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.container}>
                        <Text type={'bd'} style={styles.txtHeader}>DemoLogin</Text>

                        <View style={styles.boxInput}>
                            <MaterialIcons name="email" size={26} color="#fff" style={styles.icon} />
                            <TextInput
                                ref={(input) => {
                                    this.email = input
                                }}
                                style={styles.txtInput}
                                placeholder={'อีเมล'}
                                autoCapitalize={'none'}
                                returnKeyType={'next'}
                                keyboardType={'email-address'}
                                placeholderTextColor={'#fff'}
                                underlineColorAndroid="transparent"
                                onChangeText={(email) => { this.setState({ email: email.trim() }) }}
                                value={this.state.email}
                                onSubmitEditing={() => { this.password.focus() }}
                            />
                        </View>

                        <View style={styles.boxInput}>
                            <MaterialIcons name="lock" size={26} color="#fff" style={styles.icon} />
                            <TextInput
                                ref={(input) => {
                                    this.password = input
                                    input?.setNativeProps({
                                        style: {
                                            fontFamily: 'RSU',
                                            fontSize: 20,
                                        }
                                    })
                                }}
                                style={styles.txtInput}
                                placeholder={('รหัสผ่าน')}
                                autoCapitalize={'none'}
                                secureTextEntry={this.state.isHidePw}
                                returnKeyType={'done'}
                                placeholderTextColor={'#fff'}
                                underlineColorAndroid="transparent"
                                onChangeText={(password) => { this.setState({ password: password.trim() }) }}
                                value={this.state.password}
                                textContentType={'oneTimeCode'}
                            />
                            <TouchableOpacity onPressIn={() => this.setState({ isHidePw: false })} onPressOut={() => this.setState({ isHidePw: true })}>
                                <Ionicons name={this.state.isHidePw ? 'eye-off' : 'eye'} size={26} color="#fff" style={styles.icon} />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity activeOpacity={1} style={styles.btnFogetpw}>
                            <Text type={'light'} style={styles.txtForgetpw}>ลืมรหัสผ่าน?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnLogin} onPress={() => this.Login()}>
                            <Text type={'bd'}>เข้าสู่ระบบ</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity activeOpacity={1} style={styles.btnSignin}>
                        <Text style={styles.txtUnderline}>ลงทะเบียนเข้าใช้งาน</Text>
                    </TouchableOpacity>

                    <Text type={'light'} style={styles.txtCreatedby}>Created by. Prapassorn Siriphanurak</Text>

                    {this.modalSuccess()}

                </SafeAreaView>

                {this.state.isLoading ?
                    <View style={styles.viewLoading}>
                        <ActivityIndicator
                            style={styles.ActivityIndicator}
                            color='#fff'
                            size={'large'} />
                    </View> : null}

            </LinearGradient>
        )
    }

    modalSuccess() {
        return (
            <Modal
                visible={this.state.modalSuccess}
                transparent={true}
                onRequestClose={() => this.closeModalSuccess()}
                animationType={'fade'}
                statusBarTranslucent
            >
                <View style={{ ...styles.container, justifyContent: 'center' }}>
                    <TouchableHighlight
                        onPress={() => this.closeModalSuccess()}
                        style={styles.bgCloseModal}>
                        <View />
                    </TouchableHighlight>
                    <View
                        style={styles.boxModalSuccess}>
                        <MaterialIcons name="check-circle" size={60} color="#33cc33" />
                        <Text type={'bd'} style={styles.txtColorGreen}>เข้าสู่ระบบสำเร็จ</Text>
                    </View>
                </View>
            </Modal>
        )
    }

    closeModalSuccess() {
        this.setState({
            modalSuccess: false,
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    txtHeader: {
        fontSize: 35,
        textAlign: 'center',
        marginVertical: 20
    },
    boxInput: {
        width: '90%',
        height: 50,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 5,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    txtInput: {
        fontFamily: 'RSU',
        fontSize: 20,
        padding: 0,
        height: 40,
        color: '#fff',
        flex: 1,
        paddingHorizontal: 5,
    },
    btnLogin: {
        width: 150,
        height: 50,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    icon: {
        width: 28,
        textAlign: 'center'
    },
    btnFogetpw: {
        alignSelf: 'flex-end',
        marginRight: 20
    },
    txtForgetpw: {
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    btnSignin: {
        width: 200,
        height: 50,
        marginVertical: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtUnderline: {
        textDecorationLine: 'underline',
    },
    txtCreatedby: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 20
    },
    viewLoading: {
        position: 'absolute',
        backgroundColor: '#rgba(0,0,0,0.5)',
        width: '100%',
        height: '100%',
        zIndex: 2,
        elevation: 5,
    },
    ActivityIndicator: {
        alignSelf: 'center',
        paddingTop: height / 2
    },
    bgCloseModal: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        opacity: 0.5,
    },
    boxModalSuccess: {
        width: '80%',
        height: 150,
        borderRadius: 10,
        position: 'absolute',
        overflow: 'hidden',
        backgroundColor: '#fff',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtColorGreen: {
        color: '#33cc33'
    }
})