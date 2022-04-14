import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native'
import { TextInput } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CountDown from 'react-native-countdown-component';
import axios from 'axios';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
const { height, width } = Dimensions.get('window');

const CELL_COUNT = 6;
const RetailerVerify = ({ route, navigation }) => {
  const [timerCount, setTimer] = useState("");
  const [show, setShow] = useState(false);
  const [color, setColor] = useState('white')
  function settimercount() {
    setTimer(10);
  }
  function button() {
    setShow(true);
    setColor('grey');

    let interval = setInterval(() => {
      setTimer(lastTimerCount => {
        lastTimerCount <= 1 && clearInterval(interval)
        if (lastTimerCount == 1) {
          setShow(false);
          setColor('white')
        }

        console.log(lastTimerCount);
        return lastTimerCount - 1
        console.log('hello');
      })
    }, 1000)


    return () => clearInterval(interval)

  }
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [name, setName] = useState("");
  const invalidOtp = () => {
    if (value == '')
      alert('Please enter valid OTP');
    else
      post();
  }
  const post = () => {
    console.log(value);
    console.log('in')
    axios
      .post('https://d1-slp-wp.supremelifeplatform.com/wp-json/api/retailer-verify-otp-mobile', {
        "temp_id": "route.params.temp_id",
        "mobile": "route.params.res1",
        "otp": value
      })
      .then(function (response) {
        if (value == '' && response.data.message.errorMessage == 'Invalid Request' && response.data.message.errorCode == 'Required fields missing in request')
          alert('invalid OTP');
        if (response.data.message.successMessage == 'User created successfully') {
          alert("User created successfully");
          navigation.navigate('RetailerScreen');
        }
        else if (response.data.message.errorMessage != '')
          alert(response.data.message.errorMessage)
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log("error....")
        alert(error.message);
        console.log(error.message);

      });
  };
  const postResend = () => {
    console.log('in')
    axios
      .post('https://d1-slp-wp.supremelifeplatform.com/wp-json/api/existing-account-verification-mobile', {
        "id": route.params.id,
        "mobile": route.params.res1,
        "username": route.params.name,
        "password": route.params.password
      })
      .then(function (response) {
        if (response.data.message.successMessage == 'OTP has been sent successfully') {
          alert("OTP has been sent successfully");
        }
        else if (response.data.message.errorMessage != '')
          alert(response.data.message.errorMessage)
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log("error....")
        alert(error.message);
        console.log(error.message);

      });
  };


  return (
    <View style={{ flex: 1 }}>
      <View style={style.container}>
        <Image source={require('../Assests/logo.png')} style={{
          marginTop: '15%', width: '34%', height: height / 11,
          marginLeft: '7%'
        }} />
      </View>

      <View style={style.containers}>
        <ScrollView>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../Assests/back_button.png')} style={{
              width: '9%', height: height / 21, marginTop: '9%',
              marginLeft: '4%'
            }} />
          </TouchableOpacity>
          <Text style={style.white1}>OTP Verification</Text>
          <Text style={style.white2}>Please enter OTP that you have received on</Text>
          <Text style={style.white2}>your registered mobile number</Text>
          <SafeAreaView style={style.root}>
            <CodeField
              ref={ref}
              {...props}

              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={style.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <Text
                  key={index}
                  style={[style.cell, isFocused && style.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          </SafeAreaView>

          {show ?
            <Text style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', color: 'white', fontSize: 20 }}>Resend code in {timerCount} Seconds</Text> : null}
          <TouchableOpacity style={style.btn1} onPress={() => { invalidOtp() }} >
            <View >
              <View style={style.flex}>
                <Image source={require('../Assests/btn_continue.png')} style={{ marginTop: '4%', marginRight: '4%' }} />
                <Text style={style.txt}>CONTINUE</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity disabled={show} style={show ? style.btn22 : style.btn2} onPress={() => { postResend(); button(); settimercount(); }}>
            <View>
              <View style={style.flex}>
                <Image source={require('../Assests/btn_resend_otp.png')} style={{ marginTop: '1%', marginRight: '4%' }} tintColor={color} />
                <Text style={show ? style.txt11 : style.txt1}>RESEND</Text>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  )

}
const style = StyleSheet.create({
  container: {
    height: '30%',
    width: width,
  },
  containers: {
    height: '70%',
    width: width,
    backgroundColor: 'green',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50
  },
  box: {
    width: '15%',
    height: '100%',
    borderWidth: 2,
    borderColor: 'white',
    marginLeft: '1%'
  },
  white1: {
    marginLeft: '4%',
    color: 'white',
    fontSize: 25,
    marginTop: '4%'
  },
  white2: {
    marginLeft: '4%',
    fontSize: 16,
    color: 'white',
  },
  btn1: {
    height: '8%',
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#FFC600',
    borderRadius: 10,
    marginTop: '18%',
    marginBottom: '1%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'

  },
  btn2: {
    height: '8%',
    width: '90%',
    borderRadius: 10,
    borderRadius: 10,
    marginTop: '2%',
    marginBottom: '50%',
    borderColor: 'white',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'

  },
  btn22: {
    height: '8%',
    width: '90%',
    borderRadius: 10,
    borderRadius: 10,
    marginTop: '2%',
    marginBottom: '50%',
    borderColor: 'grey',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  txt: {
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 15,
    color: 'green',
    textAlign: 'center',

  },
  txt1: {
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 15,
    color: 'white',
    textAlign: 'center',

  },
  txt11: {
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 15,
    color: 'grey',
    textAlign: 'center',

  },
  flex: {
    flexDirection: 'row'
  },
  root: {
    flex: 1,
    padding: 20
  },
  codeFieldRoot: {
    marginTop: 20
  },
  cell: {
    width: 50,
    height: 60,
    lineHeight: 50,
    backgroundColor: 'green',
    fontSize: 24,
    borderWidth: 2,
    borderColor: 'white',
    textAlign: 'center',
    color: 'white'
  },
  focusCell: {
    borderColor: 'white',
  },
})
export default RetailerVerify