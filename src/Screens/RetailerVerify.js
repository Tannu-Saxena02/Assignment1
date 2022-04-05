import React ,{ useState }from 'react'
import { View, Text, StyleSheet, Image,Dimensions} from 'react-native'
import { TextInput } from 'react-native-paper';
const{height,width} = Dimensions.get('window');


const RetailerVerify = () => {
    const [name,setName]=useState("");
    return (
        <View>
            <View  style={style.container}>
            <Image source={require('../Assests/logo.png')} style={{marginTop:'15%',width:'34%',height:height/11,
             marginLeft:'7%'}}/>
        </View> 
        <View style={style.containers}>
             {/* <View style={style.margin}>  */}
            <Image source={require('../Assests/back_button.png')} style={{width:'9%',height:height/21,marginTop:'9%',
            marginLeft:'4%'}} />
            <Text style={style.white1}>OTP Verification</Text>
            <Text style={style.white2}>Please enter OTP that you have received on</Text>
            <Text style={style.white2}>your registered mobile number</Text>
            <View style={style.btn1}>
            <View style={style.flex}>
            <Image source={require('../Assests/btn_continue.png')} style={{  marginTop:'1%',marginRight:'4%'}}/>
             <Text style={style.txt}>CONTINUE</Text>
               </View>
               </View>
            <View style={style.btn2}>
            <View style={style.flex}>
            <Image source={require('../Assests/btn_continue.png')} style={{  marginTop:'1%',marginRight:'4%'}}/>
             <Text style={style.txt}>CONTINUE</Text>
               </View>
               </View>  
        </View>
        
           
        </View>
        )

    }
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
            fontSize:25,
            marginTop:'4%'
        },
        white2:{
            // marginTop:'9%',
            marginLeft:'4%',
            fontSize:16,
            color:'white',
            // fontWeight:'900'
            // fontWeight: "900",
            // marginBottom:'3%'
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
        flex:{
            flexDirection:'row'
        },
    })    
    export default RetailerVerify