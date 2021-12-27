import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import colors from '../utility/colors';
import AppLoading from 'expo-app-loading';
import { useFonts, Righteous_400Regular } from '@expo-google-fonts/righteous';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconButton } from 'react-native-paper';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import AwesomeAlert from 'react-native-awesome-alerts';

// import Toast from 'react-native-toast-message';

function Step9({ route }) {

  const navigation = useNavigation();

  const {
    accomodation, 
    gender, 
    alcohol, 
    nearby, 
    metro, 
    geyser, 
    internet, 
    maid, 
    parking, 
    lift, 
    electricity, 
    airconditioner,
    details,
    tenants,
    restroomItem,
    address,
    rent,
    fixedDeposite,
    video
  } = route.params;

  console.log("Accomodation " + accomodation)
  console.log("Gender " + gender)
  console.log("Alcohol " + alcohol)
  console.log("Nearby " + nearby)
  console.log("Metro " + metro)
  console.log("Geyser " + geyser)
  console.log("Internet " + internet)
  console.log("Maid " + maid)
  console.log("Parking " + parking)
  console.log("Lift " + lift)
  console.log("Electricity " + electricity)
  console.log("Airconditioner " + airconditioner)
  console.log("Details " + details)
  console.log("Tenants " + tenants)
  console.log("restroom " + restroomItem)
  console.log("Address " + address)
  console.log("rent: " + rent)
  console.log("fixedDeposite: " + fixedDeposite)

   // const email = route.params;
  // const emailobj = route.params.email;
 // const [story, setStory] = useState([]);
  
  //Toggle Alert pop-up
  const [showAlert, setShowAlert] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false); 

  const videoUrl = route?.params?.video;
  console.log("Step9 screen video url: " + videoUrl);

  // useEffect(() =>{
  //   const getUserData = async () => {
  //      try {
  //       //Saving cookies...
  //       const tokenData = await AsyncStorage.getItem('cookie')
  //       const response = await axios(`http://192.168.1.10/hummingbird/homeScreen.php?email=${tokenData}`);
  //       setStory(response.data);
  //       console.log("Step9 response data: ")
  //       console.log(response.data)
  //      }catch(err){
  //      console.log("Step9 error: " + err);
  //      }
  //   };
  //   getUserData()
  //   }, []);

    useEffect(()=>{
      const listProperty = async()=>{
        //Getting cookies values for email and uqid of current login user...
        const tokenData = await AsyncStorage.getItem('cookie')
        const cookieValues = await axios(`http://192.168.1.10/hummingbird/homeScreen.php?email=${tokenData}`);
        
        axios.post("http://192.168.1.10/hummingbird/uploadSpace.php", JSON.stringify({
            accomodation: accomodation,
            gender: gender,
            alcohol: alcohol,
            nearby: nearby,
            metro: metro,
            geyser: geyser,
            internet: internet,
            maid: maid,
            parking: parking,
            lift: lift,
            electricity: electricity,
            airconditioner: airconditioner,
            details: details,
            tenants: tenants,
            restroomItem: restroomItem,
            address: address,
            rent: rent,
            fixedDeposite: fixedDeposite,
            uri: video,
            email: cookieValues.data[0].email,
            uqid: cookieValues.data[0].uqid,
       })).then((response)=>{
         console.log(response.data);
         setIsSubmit(false);
         //Navigate user to home after valid register
         if(response.data == "Property added successfully"){
            setShowAlert(true);
         }
         if(response.data == "Please select accomodation type"){
          setvisibleToastFullname(true);
        }
         if(response.data == "Please select tenant type"){
          setvisibleEmailDuplicate(true);
         }
         if(response.data == "Alcohol error..."){
          setvisibleToastEmail(true);
         }
         if(response.data == "Nearby error..."){
          setvisibleToastEmail(true);
         }
         if(response.data == "Metro error..."){
          setvisibleToastEmail(true);
         }
         if(response.data == "Alcohol error..."){
          setvisibleToastEmail(true);
         }
         if(response.data == "Details cannot be blank"){
          setvisibleToastEmail(true);
         }
         if(response.data == "Please type tenants numbers"){
          setvisibleToastEmail(true);
         }
         if(response.data == "restroomItem error..."){
          setvisibleToastEmail(true);
         }
         if(response.data == "Address cannot be blank"){
          setvisibleToastEmail(true);
         }
         if(response.data == "Please enter rent amount"){
          setvisibleToastEmail(true);
         }
         if(response.data == "Please enter fixed deposite amount"){
          setvisibleToastEmail(true);
         }
       }).catch((error)=>{
         console.log(error);
       });
      }
      if(isSubmit) listProperty();
    }, [isSubmit])

    //Hiding Alert pop-up after frw seconds
    setTimeout(()=> 
    setShowAlert(false),
    // navigation.navigate("Home"),
    3000);


  let [fontsLoaded] = useFonts({ Righteous_400Regular });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <SafeAreaView style={styles.container}>
       <StatusBar style={styles.statusBar} backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.mainContainer}>

      {/* Back button */}
        <View style={styles.screenHeader}>
        <IconButton 
        icon={require('../../hummingbird/assets/app_images/back.png')}
        color={colors.black}
        size={23}
        rippleColor="rgba(248, 249, 249)"
        onPress={() => navigation.goBack()}
        />
      <Text style={styles.screenName}>List Your Space</Text>
      </View>
      {/* Header code ends */}

      <View style={styles.formContainer}> 
        {/* <View style={styles.SelectDropdownContainer}> */}
        {/* <TouchableWithoutFeedback onPress={()=> navigation.navigate("Recorder")}> 
            <Text>Record a short video of your space</Text>
          </TouchableWithoutFeedback> */}
          
          {videoUrl && (<View><Video
           style={{width: "90%", height: "85%", borderRadius: 5, marginLeft: "5%", marginTop: -2}}
           rate={1.8}
           shouldPlay
           source={{ uri: videoUrl}}
           useNativeControls
           resizeMode="cover"
           isLooping
          />
          <TouchableWithoutFeedback style={styles.postButton} 
             onPress={() => setIsSubmit(true)}>
            <Text style={styles.postButtonText}>Post property</Text>
          </TouchableWithoutFeedback>
          </View>
          )
          }

        {/* </View> */}

        <MaterialCommunityIcons 
            name="record-circle" 
            size={80} 
            color={colors.darkgray}
            style={{textAlign: "center", marginTop: "55%"}}
            />

        <TouchableWithoutFeedback 
        onPress={()=> navigation.navigate("Recorder",{
          accomodation: accomodation,
          gender: gender,
          alcohol: alcohol,
          nearby: nearby,
          metro: metro,
          geyser: geyser,
          internet: internet,
          maid: maid,
          parking: parking,
          lift: lift,
          electricity: electricity,
          airconditioner: airconditioner,
          details: details,
          tenants: tenants,
          restroomItem: restroomItem,
          address: address,
          rent: rent,
          fixedDeposite: fixedDeposite,
          uri: video
        } 
        )} 
        style={styles.nextButton}>
          <Text style={styles.nextButtonText}>
            Record a short video of your space</Text>
        </TouchableWithoutFeedback>

      </View>

             
      <AwesomeAlert
    show={showAlert}
    showProgress={false}
    title="👋"
    titleStyle={{fontSize: 25}}
    message="Property has been listed successfully"
    messageStyle={{
      fontFamily: "SourceSansPro_400Regular", 
      fontSize: 16, 
      color: colors.black, 
      textAlign: "center",
      marginTop: 10,
    }}
    closeOnTouchOutside={false}
    closeOnHardwareBackPress={false}
    contentContainerStyle={{minHeight: 142}}
  />

      </View>

    </SafeAreaView>
  );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight
  },
  statusBar: {
    height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
  },
  mainContainer: {
    flex: 1,
    width: 100,
    height: 100,
    minWidth: '100%',
    minHeight: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    backgroundColor: colors.white
  },
  buttonContainer: {
    flex: 1,
    width: 100,
    height: 100,
    minWidth: '100%',
    backgroundColor: colors.darkgray
  }, 
  screenName:{ 
    marginTop: "3.4%",
    fontFamily: "SourceSansPro_400Regular", 
    fontSize:17,
    fontWeight: "normal",
    margin: "22%",
  },
  shadow:{
    shadowColor: colors.shadow,
    shadowOffset: {
      width:0,
      height:10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  screenHeader: {
    flexDirection: 'row',
  },
  formContainer: {
    width: "100%",
    minHeight: 480,
    maxHeight: "80%",
    marginTop: "20%",
    position: "absolute",
    flexDirection: 'column',
    backgroundColor: colors.white,
  },
  formDataHeader: {
    fontWeight: "bold",
    fontFamily: "SourceSansPro_400Regular", 
    fontSize: 20,
    marginLeft: "18%",
  },
  bottomButtonContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: colors.white,
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
    position: 'absolute',
    bottom:60,
    left:0,
  },
screenTitleName: {
  marginTop: "3%",
  paddingLeft: 20,
  fontFamily: "SourceSansPro_400Regular", 
  fontSize:15,
  fontWeight: "normal",
  color: colors.black,
  maxWidth: "95%",
  marginBottom: "0%",
  textAlign: "left"
},
  screenNameHeader: {
    marginTop: "3%",
    paddingLeft: 20,
    fontFamily: "SourceSansPro_400Regular", 
    fontSize:15,
    fontWeight: "bold",
    color: colors.black,
    maxWidth: "95%",
    marginBottom: "1%",
    textAlign: "left"
  },
  screenNameMeta:{
    marginTop: "0%",
    paddingLeft: 20,
    fontFamily: "SourceSansPro_400Regular", 
    fontSize:14,
    fontWeight: "normal",
    color: colors.grayblack,
    maxWidth: "90%"
  },
  screenImage: {
    width: "70%",
  },
  SelectDropdownContainer: {
   padding: 20,
   width: "100%",
   borderBottomColor: colors.lightgray,
    borderBottomWidth: 1,
  },
  selectOption: {
    marginTop: "0%",
    textAlign: "center",
    borderRadius: 5,
    width: "95%",
    fontFamily: "SourceSansPro_400Regular",
  },
  dropDownOption: {
    position: "relative",
    backgroundColor: colors.lightgray,
    borderRadius: 5,
    borderColor: colors.transparent,
  },
  nextButton: {
    margin: 20,
    backgroundColor: colors.orange,
    width: "89%",
    padding: 18,
    borderRadius: 7,
    marginTop: "72%"
  },
  nextButtonText: {
    textAlign: "center",
    color: colors.white,
    fontSize: 15,
    fontFamily: "SourceSansPro_400Regular",
  },
  postButton: {
    margin: 20,
    backgroundColor: colors.orange,
    width: "89%",
    padding: 18,
    borderRadius: 7,
    marginTop: "5%"
  },
  postButtonText: {
    textAlign: "center",
    color: colors.white,
    fontSize: 15,
    fontFamily: "SourceSansPro_400Regular",
  }
});

export default Step9;