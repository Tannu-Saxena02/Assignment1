import React ,{ useState }from 'react'
import { View, Text, StyleSheet, Image,Dimensions,ScrollView,TouchableOpacity} from 'react-native'
import { TextInput } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const{height,width} = Dimensions.get('window');
import axios from 'axios';

const RetailerScreenAccount= ({navigation}) => {
    const [name,setName]=useState("");
    const [Password,setPassword]=useState("");
    const [ConfirmPassword,setConfirmPassword]=useState("");

    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [passwordVisibility1, setPasswordVisibility1] = useState(false);
    const[isvaliduser,setisvaliduser]=useState(false);
    const[isvaliduser1,setisvaliduser1]=useState(false);
    const[isvaliduser2,setisvaliduser2]=useState(false);
    const[pass,setpass]=useState(false);
    const[namelength,setnamelength]=useState(false);

    const handleSubmit=()=>{
      // console.log("hello")
      if(name=='')
      {
        setisvaliduser(true);
      }
      if(Password=='')
      setisvaliduser1(true);
      if(ConfirmPassword=='')
      setisvaliduser2(true);

       if(name!=''){
        setisvaliduser(false);
      }
       if(Password!=''){
        setisvaliduser1(false);
      }
       if(ConfirmPassword!=''){
        setisvaliduser2(false);
      }
  
        }
       const handlePass=()=>{
         if(Password!=ConfirmPassword&&Password!="")
          setpass(true);
          else
          setpass(false)

       } 
      const handlesubmits=()=>{
         if(name.length<6&&name!=='')
      setnamelength(true)
      else
      setnamelength(false)
      }
    const handlePassword = () => {
        if (passwordVisibility) {
        //   setPasswordVisibility(false);
        console.log("hello")
          setPasswordVisibility(!passwordVisibility);
        } 
        else if (passwordVisibility==false) {
        //   setRightIcon('eye');
          setPasswordVisibility(!passwordVisibility);
        }
      };
      const handlePassword1 = () => {
        if (passwordVisibility1) {
        //   setPasswordVisibility(false);
        console.log("hello")
          setPasswordVisibility1(!passwordVisibility1);
        } else if (passwordVisibility1==false) {
        //   setRightIcon('eye');
          setPasswordVisibility1(!passwordVisibility1);
        }
      };
      const post = () => {
        axios
          .post('https://d1-slp-wp.supremelifeplatform.com/api/existing-account-verification-mobile', {
            "mobile": "919569057580",
            "username": "Aryan26" ,
            "password":"99887766"
          })
          .then(function (response) {
            // handle success
            alert(JSON.stringify(response.data));
            console.log("success.....");
         
          //  navigation.navigate(Screen);

            // navigation.navigate(RetailerScreenAccount);
          })
          .catch(function (error) {
            // handle error
            console.log("error....")
            alert(error.message);
            console.log(error.message);

          });
      };  
  
    return (
        <View >
        <View  style={style.container}>
        <Image source={require('../Assests/logo.png')} style={{marginTop:'15%',width:'34%',height:height/11,
      marginLeft:'7%'}}/>
        </View>

        <View style={style.containers}>
             {/* <View style={style.margin}>  */}
             <ScrollView>
             <TouchableOpacity  onPress={() => navigation.goBack()}>
            <Image source={require('../Assests/back_button.png')} style={{width:'9%',height:height/21,marginTop:'9%',
        marginLeft:'4%'}} />
        </TouchableOpacity> 
           

            <Text style={style.white1}>Account Details</Text>
            <Text style={style.white2}>Please enter the following Details</Text>
       
            <TextInput
                mode="outlined"
                label="Username"
                outlineColor={isvaliduser?'#FFC600':'white'}
                theme={{
                  colors: {
                      text: "white",
                      placeholder: "white",
                      primary:'white'
                  }
              }}
                left={<TextInput.Icon name={require('../Assests/avatar.png')  } color='white' />}
                style={style.TextInput}
                onChangeText={(text)=>setName(text)} 
                />
                  {isvaliduser?
                    <Text style={style.valid}>Username cannot be empty</Text>
                    :null
                  }
                  {namelength?
                    <Text style={style.valid}>Username must be of min. 6 characters</Text>
                    :null
                  }
                  <TextInput
                mode="outlined"
                label="Password"
                outlineColor={isvaliduser?'#FFC600':'white'}
                theme={{
                  colors: {
                      text: "white",
                      placeholder: "white",
                      primary:'white'
                  }
              }}
                // placeholder="Type something" 
                right={<TextInput.Icon  name={passwordVisibility?require('../Assests/password_visible.png'):require('../Assests/password_hide.png')  } color='white'  onPress={()=>handlePassword()}/> }
                left={<TextInput.Icon name={require('../Assests/lock_icon.png')  } color='white' />}
                style={style.TextInput}
                secureTextEntry={!passwordVisibility}
                onChangeText={(text)=>setPassword(text)} 
                
                />
                {isvaliduser1?
                    <Text style={style.valid}>Password cannot be empty</Text>
                    :null
                  }
                  {pass?
                    <Text style={style.valid}>Password does not match</Text>
                    :null
                  }
                  <TextInput
                mode="outlined"
                label="Confirm Password"
                outlineColor={isvaliduser2?'#FFC600':'white'}
                theme={{
                  colors: {
                      text: "white",
                      placeholder: "white",
                      primary:'white'
                  }
              }}
                right={<TextInput.Icon  name={passwordVisibility1?require('../Assests/password_visible.png'):require('../Assests/password_hide.png')  } color='white'  onPress={()=>handlePassword1()}/> }
                left={<TextInput.Icon name={require('../Assests/lock_icon.png')  } color='white' />}
                style={style.TextInput}
                secureTextEntry={!passwordVisibility1}
                onChangeText={(text)=>setConfirmPassword(text)} 
                />
                {isvaliduser2?
                    <Text style={style.valid}>Password cannot be empty  </Text>
                    :null
                  }
                  {pass?
                    <Text style={style.valid}>Please try a stronger Password</Text>
                    :null
                  }
                <TouchableOpacity style={style.btn1} onPress={()=>{handleSubmit();handlesubmits();handlePass(); post()}} >
                <View >
            <View style={style.flex}>
            <Image source={require('../Assests/btn_continue.png')} style={{  marginTop:'9%',marginRight:'4%'}}/>

               <Text style={style.txt}>CONTINUE</Text>
               </View>
               
               </View>
               </TouchableOpacity>
               </ScrollView>
           </View>
        </View>
        )

    }
    // const theme={
    //     colors:{
    //            text:"white",
    //            primary:'white',
    //           // label:'white',
    //            placeholder:'white'
    //     },
    //     }
const style=StyleSheet.create({
    container:{
        height:'30%',
        width:width,
        // backgroundColor:'pink'
    },
    containers:{
        height:'70%',
        width:width,
        backgroundColor:'green',
        borderTopRightRadius:50,
        borderTopLeftRadius:50
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
    white:{
        // marginTop:'9%',
        marginLeft:'4%',
        fontSize:13,
        color:'white',
        // fontWeight:'900'
        fontWeight: "900" ,
        // marginBottom:''
      },
     
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
         btn1:{
            height:'9%',
            width:'90%',
            backgroundColor:'#FFC600',
            borderRadius: 15,
            marginTop:'5%',
            marginBottom:'5%',
            // marginLeft:'3%',
            justifyContent:'center',
            alignItems:'center',
            alignSelf:'center'
            // flexDirection:'row',
            // flex:1
        
        },
        txt:{
            paddingTop:12,
            // paddingBottom:20,
                paddingBottom:10,
                fontSize:15,
                color:'green',
                textAlign:'center',
              
        }, 
        valid:{
          color:'#FFC600',
          fontSize:15,
          marginTop:'1%',
          marginLeft:20,
          // marginBottom:
      }, 
        flex:{
            flexDirection:'row'
        },   
})    
export default RetailerScreenAccount;