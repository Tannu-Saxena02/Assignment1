import { useState }from 'react'
import * as React from 'react';
import { View, Text, StyleSheet, Image,Dimensions,ScrollView,TouchableOpacity} from 'react-native'
import { TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const{height,width} = Dimensions.get('window');
import axios from 'axios';
// import RetailerScreenAccount from './RetailerScreenAccount';
const data = [
    { label: '+91', value: '1' },
    { label: '+1876', value: '2' },

  ];
const RetailerScreen = ({navigation}) => {
 
    const [name,setName]=useState("");
    const [Registerednumber,setRegisterednumber]=useState("");
    const [Retailerid,setRetailerid]=useState("");

    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState(null);
    const[isvaliduser,setisvaliduser]=useState(false);
    const[Regis,setRegis]=useState(false);
    const[Retail,setRetail]=useState(false);
    function  handleNavigation(Screenname)
    { 
        navigation.navigate(Screenname)
        console.log(Screenname);
    }
    // const[namelength,setnamelength]=useState(false);
    const handleSubmit=()=>{
      // console.log("hello")
      if(name=='')
      {
        setisvaliduser(true);
      }
      if(Registerednumber=='')
      {
        setRegis(true);
      }
      if(Retailerid=='')
      {
        setRetail(true);
      }
      if(name!=''){
        setisvaliduser(false);
      }
      if(Registerednumber!='')
      {
        setRegis(false);
      }
      if(Retailerid!='')
      {
        setRetail(false);
      }
     if(isvaliduser==true&&Regis==true&&Retail==true)
      post();
      else
      return false;
        }
        const post = () => {
          console.log("in");
          axios
            .post('https://d1-slp-wp.supremelifeplatform.com/wp-json/api/wbs-link-existing-retailer-mobile', {
              business_name: "Harbour View Football Club",
              business_phone: "917668508432",
              retailer_ccp_number: "",
              retailer_id_type: "", // IGT, AMTOTE, ALTENAR
              retailer_id: "100048",
            })
            .then(function (response) {
              // if (response.data.message != null) {

                // navigation.navigate('RetailerScreenAccount');

                // if (response.data.message.successMessage.length>0)
                // {
                
                // }
              // }
              // handle success
              alert(JSON.stringify(response.data));
              console.log(response.data);
              // console.log(Screen);
            //  navigation.navigate(Screen);

              
            })
            .catch(function (error) {
              // handle error
              console.log("error....")
              alert(error.message);
              console.log(error.message);

            });
        };  
    
    return (
        <View style={{flex:1}}>
            <View  style={style.container}>
            <Image source={require('../Assests/logo.png')} style={{marginTop:'15%',width:'34%',height:height/11,marginLeft:'7%'}}/>
            </View>
            <View style={style.containers}>
             {/* <View style={style.margin}>  */}
             <ScrollView>
            <Image source={require('../Assests/back_button.png')} style={{width:'9%',height:height/21,marginTop:'9%',
        marginLeft:'4%'}}/>
           

            <Text style={style.white1}>Existing Retailer</Text>
            <Text style={style.white}>Please Provide the following details to link</Text>
            <Text style={style.white2}>your account</Text>
            {/* </View>  */}
            
            <TextInput
                mode="outlined"
                label="Business Name*"
                // label="*"
                // placeholder='*'
                outlineColor={isvaliduser?'#FFC600':'white'}
                theme={{
                  colors: {
                      text: "white",
                      placeholder: "white",
                      primary:'white'
                  }
              }}

                left={<TextInput.Icon name={require('../Assests/business_name.png')  } color='white' />}
                style={style.TextInput}
                onChangeText={(text)=>setName(text)} 

                />
              {isvaliduser?
                    <Text style={style.valid}>Business Name cannot be empty</Text>
                    :null
               } 
               {/* {namelength?
                    <Text style={style.valid}>Username must be of min. 6 characters</Text>
                    :null
               }   */}
               <View style={style.forflex}>
             <View style={style.container1}>
     {/* <View style={style.forflex}> */}
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
        //   searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          // renderLeftIcon={() => (
          //   <AntDesign
          //     style={style.icon}
          //     color={isFocus ? 'blue' : 'black'}
          //     name="Safety"
          //     size={20}
          //   />
          // )}
        />
      </View>
            {/* <View style={style.forflex}> */}
            {/* <TextInput
                mode="outlined"
                label="Outlined input"
                theme={theme}
                placeholder="Registered Phone Number"
                style={style.TextInput1}
                
                />    */}
            <TextInput
                mode="outlined"
                label="Registered Phone Number*"
                left={<TextInput.Icon name={require('../Assests/phone.png')  }color='white'  />}
                outlineColor={isvaliduser?'#FFC600':'white'}
                theme={{
                  colors: {
                      text: "white",
                      placeholder: "white",
                      primary:'white'
                  }
              }}
                style={style.TextInput2}
                onChangeText={(text)=>setRegisterednumber(text)} 

                />

                
              
            </View>
            {Regis?
                    <Text style={style.valid1}>Phone number cannot be empty</Text>
                    :null
                  }
          
              <TextInput
                mode="outlined"
                label="CPP Number"
                outlineColor='white'
                theme={{
                  colors: {
                      text: "white",
                      placeholder: "white",
                      primary:'white'
                  }
              }}
                left={<TextInput.Icon name={require('../Assests/hashtag.png')  } color='white' />}
                // placeholder="Type something"
                style={style.TextInput}
             />   
              <TextInput
                mode="outlined"
                label="Retailer ID*"
                outlineColor={isvaliduser?'#FFC600':'white'}
                theme={{
                  colors: {
                      text: "white",
                      placeholder: "white",
                      primary:'white'
                  }
              }}
                left={<TextInput.Icon name={require('../Assests/hashtag.png')  }  color='white'/>}
                // placeholder="Type something"
                style={style.TextInput}
                onChangeText={(text)=>setRetailerid(text)} 

             />
             {Retail?
                    <Text style={style.valid}>Retailer ID cannot be empty</Text>
                    :null
                  } 
            <TouchableOpacity style={style.btn1} onPress={()=>{handleSubmit()}}>
           <View>
            <View style={style.flex}>
            <Image source={require('../Assests/btn_continue.png')} style={{  marginTop:'1%',marginRight:'4%'}}/>

               <Text style={style.txt}>CONTINUE</Text>
               </View>
               </View>
               </TouchableOpacity>
            
              </ScrollView>
            </View>
        </View>
        )

    }

 const theme={
     colors:{
            primary:"white",
            placeholder:'white'
     },
    
     
    }
const style=StyleSheet.create({
       container:{
           height:'30%',
           width:width,
        //    backgroundColor:'pink'
       },
      
       marginUp:{
           marginTop:'5%'
       }
       ,
      
       TextInput:{
        width:'90%',
        // height:80,
        // height:'10%',
        marginTop:'2%',
        backgroundColor:'green',
        // flexDirection:'row',
        alignSelf:'center',
        color:'white',
        underlineColor:'white'
         },
     TextInput1:{
        //  flex:1,
        marginTop:'2%',
        marginRight:'4%',
        width:'15%',
        // height:80,
        backgroundColor:'green',
        // flexDirection:'row',
        alignSelf:'center',
        color:'white',
        underlineColor:'white'
         },
      TextInput2:{ 
      
        width:'66%',
        marginTop:'2%',
        backgroundColor:'green',
        alignSelf:'center',
        marginLeft:'2%',
        color:'white',
        underlineColor:'white'
         },
       containers:{
        height:'70%',
        width:width,
        backgroundColor:'green',
        borderTopRightRadius:50,
        borderTopLeftRadius:50
    },
    margin:{
        marginTop:'9%',
        marginLeft:'4%',
        // backgroundColor:'white',
        height:'20%',
        marginBottom:'3%'
    },

    white1:{
        // marginTop:'9%',
        marginLeft:'4%',
        color:'white',
        fontSize:20,
        marginTop:'4%'
    },
    white2:{
        // marginTop:'9%',
        marginLeft:'4%',
        fontSize:13,
        color:'white',
        // fontWeight:'900'
        // fontWeight: "900",
        marginBottom:'3%'
    },
    flex:{
        flexDirection:'row'
    },
    valid:{
      color:'#FFC600',
      fontSize:15,
      marginTop:'1%',
      marginLeft:20,
      // marginBottom:
  },
  valid1:{
    color:'#FFC600',
    fontSize:15,
    marginTop:'1%',
    marginLeft:'29%',
    // marginBottom:
},
    white:{
        // marginTop:'9%',
        marginLeft:'4%',
        fontSize:13,
        color:'white',
        // fontWeight:'900'
        // fontWeight: "900" ,
        // marginBottom:''
      },
    forflex:{
        flexDirection:'row',
        justifyContent:'center',
        alignSelf:'center'

    },
    btn1:{
        height:'10%',
        width:'90%',
        borderRadius:10,
        backgroundColor:'#FFC600',
        borderRadius: 10,
        marginTop:'5%',
        marginBottom:'10%',
        // marginLeft:'3%',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center'
        // flexDirection:'row',
        // flex:1
    
    },
    txt:{
        paddingTop:5,
            paddingBottom:5,
            fontSize:15,
            color:'green',
            textAlign:'center',
          
    },
    container1: {
        // backgroundColor: 'white',
       width:'22%',
       marginTop:'3%',
    //    marginRight:'2%',
       alignSelf:'center',
        // padding: 16,
      },
      dropdown: {
        //   width:'80%',
        // marginLeft:'2%',
        // marginRight:'2%',
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
        // textcolor:'black'
      },
      placeholderStyle: {
        fontSize: 16,
        color:'white'
      },
      selectedTextStyle: {
        fontSize: 14,
        // color:'white'
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 0,
        // fontSize: 16,
      },
    })    
export default RetailerScreen;
