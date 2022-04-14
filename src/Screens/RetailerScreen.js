import { useState } from 'react'
import * as React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const { height, width } = Dimensions.get('window');
import axios from 'axios';
const data = [
  { label: '+91', value: '1' },
  { label: '+1876', value: '2' },

];
const RetailerScreen = ({ navigation }) => {

  const [name, setName] = useState("");
  const [response1, Setresponse1] = useState("");
  const [Registerednumber, setRegisterednumber] = useState("");
  const [Retailerid, setRetailerid] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);
  const [isvaliduser, setisvaliduser] = useState(false);
  const [Regis, setRegis] = useState(false);
  const [Retail, setRetail] = useState(false);

  function handleNavigation(Screenname) {
    navigation.navigate(Screenname)
    console.log(Screenname);
  }

  const handleSubmit = () => {
    if (name == '') {
      setisvaliduser(true);
    }
    if (Registerednumber == '') {
      setRegis(true);
    }
    if (Retailerid == '') {
      setRetail(true);
    }
    if (name != '') {
      setisvaliduser(false);
    }
    if (Registerednumber != '') {
      setRegis(false);
    }
    if (Retailerid != '') {
      setRetail(false);
    }
    if (isvaliduser == false && Regis == false && Retail == false && name != '' && Registerednumber != '' && Retailerid != '')
      post();
  }
  const post = async () => {
    console.log("in");
    console.log(Registerednumber);
    console.log(name);
    console.log(Retailerid);
    await axios
      .post('https://d1-slp-wp.supremelifeplatform.com/wp-json/api/wbs-link-existing-retailer-mobile', {
        business_name: name,
        business_phone: "91" + Registerednumber,
        retailer_ccp_number: "",
        retailer_id_type: "",
        retailer_id: Retailerid,
      })
      .then(function (response) {

        if (response.data.message.successMessage == 'SUCCESS') {
          Setresponse1(response.data);
          console.log("response" + JSON.stringify(response.data));
          console.log('hello')
          navigation.navigate('RetailerScreenAccount', response.data

          );
        }
        else if (response.data.message.errorMessage != '')
          alert(response.data.message.errorMessage)
        console.log('hii')
        console.log(response.data);
        console.log("first page")

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
        <Image source={require('../Assests/logo.png')} style={{ marginTop: '15%', width: '34%', height: height / 11, marginLeft: '7%' }} />
      </View>
      <View style={style.containers}>
        <ScrollView>
          <Image source={require('../Assests/back_button.png')} style={{ width: '9%', height: height / 21, marginTop: '9%', marginLeft: '4%' }} />
          <Text style={style.white1}>Existing Retailer</Text>
          <Text style={style.white}>Please Provide the following details to link</Text>
          <Text style={style.white2}>your account</Text>
          <TextInput
            mode="outlined"
            label="Business Name*"
            outlineColor={isvaliduser ? '#FFC600' : 'white'}
            theme={{
              colors: {
                text: "white",
                placeholder: "white",
                primary: 'white'
              }
            }}
            left={<TextInput.Icon name={require('../Assests/business_name.png')} color='white' />}
            style={style.TextInput}
            onChangeText={(text) => setName(text)}
          />
          {isvaliduser ?
            <Text style={style.valid}>Business Name cannot be empty</Text>
            : null
          }

          <View style={style.forflex}>
            <View style={style.container1}>
              <Dropdown
                style={[style.dropdown, isFocus && { borderColor: 'white' }]}
                placeholderStyle={style.placeholderStyle}
                selectedTextStyle={style.selectedTextStyle}
                inputSearchStyle={style.inputSearchStyle}
                iconStyle={style.iconStyle}
                data={data}
                search
                maxHeight={130}
                labelField="label"
                valueField="value"
                placeholder='+91'
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setIsFocus(false);
                }}

              />
            </View>

            <TextInput
              mode="outlined"
              label="Registered Phone Number*"
              left={<TextInput.Icon name={require('../Assests/phone.png')} color='white' />}
              outlineColor={isvaliduser ? '#FFC600' : 'white'}
              theme={{
                colors: {
                  text: "white",
                  placeholder: "white",
                  primary: 'white'
                }
              }}
              keyboardType='numeric'
              style={style.TextInput2}
              onChangeText={(text) => setRegisterednumber(text)}
            />
          </View>
          {Regis ?
            <Text style={style.valid1}>Phone number cannot be empty</Text>
            : null
          }

          <TextInput
            mode="outlined"
            label="CPP Number"
            outlineColor='white'
            theme={{
              colors: {
                text: "white",
                placeholder: "white",
                primary: 'white'
              }
            }}
            left={<TextInput.Icon name={require('../Assests/hashtag.png')} color='white' />}
            style={style.TextInput}
          />
          <TextInput
            mode="outlined"
            label="Retailer ID*"
            outlineColor={isvaliduser ? '#FFC600' : 'white'}
            theme={{
              colors: {
                text: "white",
                placeholder: "white",
                primary: 'white'
              }
            }}
            left={<TextInput.Icon name={require('../Assests/hashtag.png')} color='white' />}
            style={style.TextInput}
            onChangeText={(text) => setRetailerid(text)}

          />
          {Retail ?
            <Text style={style.valid}>Retailer ID cannot be empty</Text>
            : null
          }
          <TouchableOpacity style={style.btn1} onPress={() => { handleSubmit() }}>
            <View>
              <View style={[style.flex, style.center]}>
                <Image source={require('../Assests/btn_continue.png')} style={{ marginTop: '5%', marginRight: '4%', height: '59%', width: '14%' }} />

                <Text style={style.txt}>CONTINUE</Text>
              </View>
            </View>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </View>
  )

}

const theme = {
  colors: {
    primary: "white",
    placeholder: 'white'
  },


}
const style = StyleSheet.create({
  container: {
    height: '30%',
    width: width,
  },

  marginUp: {
    marginTop: '5%'
  }
  ,
  center: {
    justifyContent: 'center'
  },
  TextInput: {
    width: '90%',
    marginTop: '2%',
    backgroundColor: 'green',
    // flexDirection:'row',
    alignSelf: 'center',
    color: 'white',
    underlineColor: 'white'
  },
  TextInput1: {
    marginTop: '2%',
    marginRight: '4%',
    width: '15%',
    backgroundColor: 'green',
    alignSelf: 'center',
    color: 'white',
    underlineColor: 'white'
  },
  TextInput2: {

    width: '66%',
    marginTop: '2%',
    backgroundColor: 'green',
    alignSelf: 'center',
    marginLeft: '2%',
    color: 'white',
    underlineColor: 'white'
  },
  containers: {
    height: '70%',
    width: width,
    backgroundColor: 'green',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50
  },
  margin: {
    marginTop: '9%',
    marginLeft: '4%',
    height: '20%',
    marginBottom: '3%'
  },

  white1: {
    marginLeft: '4%',
    color: 'white',
    fontSize: 24,
    marginTop: '4%'
  },
  white2: {
    marginLeft: '4%',
    fontSize: 16,
    color: 'white',
    marginBottom: '3%'
  },
  flex: {
    flexDirection: 'row'
  },
  valid: {
    color: '#FFC600',
    fontSize: 15,
    marginTop: '1%',
    marginLeft: 20,
  },
  valid1: {
    color: '#FFC600',
    fontSize: 15,
    marginTop: '1%',
    marginLeft: '29%',
  },
  white: {
    marginLeft: '4%',
    fontSize: 16,
    color: 'white',
  },
  forflex: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center'

  },
  btn1: {
    height: '10%',
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#FFC600',
    borderRadius: 10,
    marginTop: '5%',
    marginBottom: '10%',
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
  container1: {
    width: '22%',
    marginTop: '3%',
    alignSelf: 'center',
  },
  dropdown: {
    height: 56,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'white'
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 0,
  },
})
export default RetailerScreen;
