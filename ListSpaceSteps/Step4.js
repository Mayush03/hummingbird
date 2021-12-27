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
import { Checkbox } from 'react-native-paper';

function Step4({ navigation, route }) {

  // const email = route.params;
  // const emailobj = route.params.email;

  const {accomodation, gender, alcohol, nearby, metro} = route.params;

  console.log("Accomodation " + accomodation)
  console.log("Gender " + gender)
  console.log("Alcohol " + alcohol)
  console.log("Nearby " + nearby)
  console.log("Metro " + metro)

  const [story, setStory] = useState([]);
  
  const [geyser, setGeyser] = useState(false);
  const [internet, setInternet] = useState(false);
  const [maid, setMaid] = useState(false);
  const [parking, setParking] = useState(false);
  const [lift, setLift] = useState(false);
  const [electricity, setElectricity] = useState(false);
  const [airconditioner, setAirconditioner] = useState(false);

  useEffect(() =>{
    const getUserData = async () => {
       try {
        //Saving cookies...
        const tokenData = await AsyncStorage.getItem('cookie')
        const response = await axios(`http://192.168.1.10/hummingbird/homeScreen.php?email=${tokenData}`);
        setStory(response.data);
        console.log("Step4 response data: ")
        console.log(response.data)
       }catch(err){
       console.log("Step4 error: " + err);
       }
    };
    getUserData()
    }, []);

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
      <Text style={styles.screenTitleName}>
          Select the amenities that are already avaialble at your place...
      </Text>
        {/* First set of question */}
        <Text style={styles.screenNameHeader}>Select pre-owned amenities</Text>
        <View style={styles.SelectDropdownContainer}>
        <Checkbox.Item label="Geyser" position="leading" 
          //  color={colors.orange}
           labelStyle={{textAlign: "left"}}
           status={geyser ? 'checked' : 'unchecked'} 
           onPress={() => { setGeyser(!geyser); console.log("Geyser -> " + !geyser) }}/>

        <Checkbox.Item label="Wifi-Internet" position="leading" 
          //  color={colors.orange}
           labelStyle={{textAlign: "left"}}
           status={internet ? 'checked' : 'unchecked'}
           onPress={() => { setInternet(!internet); console.log("Internet -> " + !internet) }}/>

        <Checkbox.Item label="Maid / Cook" position="leading" 
          //  color={colors.orange}
           labelStyle={{textAlign: "left"}}
           status={maid ? 'checked' : 'unchecked'}
           onPress={() => { setMaid(!maid); console.log("Maid -> " + !maid) }}/>

        <Checkbox.Item label="Parking space" position="leading" 
          //  color={colors.orange}
           labelStyle={{textAlign: "left"}}
           status={parking ? 'checked' : 'unchecked'}
           onPress={() => { setParking(!parking); console.log("Parking -> " + !parking) }}/>

        <Checkbox.Item label="Lift elevator" position="leading" 
          //  color={colors.orange}
           labelStyle={{textAlign: "left"}}
           status={lift ? 'checked' : 'unchecked'}
           onPress={() => { setLift(!lift); console.log("Lift -> " + !lift) }}/>

        <Checkbox.Item label="Electricity backup" position="leading" 
          //  color={colors.orange}
           labelStyle={{textAlign: "left"}}
           status={electricity ? 'checked' : 'unchecked'}
           onPress={() => { setElectricity(!electricity); console.log("Electricity -> " + !electricity) }}/>

          <Checkbox.Item label="Air conditioner" position="leading" 
          //  color={colors.orange}
           labelStyle={{textAlign: "left"}}
           status={airconditioner ? 'checked' : 'unchecked'}
           onPress={() => { setAirconditioner(!airconditioner); console.log("Aircondition -> " + !airconditioner) }}/>
        </View>

        <TouchableWithoutFeedback 
        onPress={()=> navigation.navigate("Step5",{
          alcohol: alcohol,
          accomodation: accomodation,
          gender: gender,
          nearby: nearby,
          metro: metro,
          geyser: geyser,
          internet: internet,
          maid: maid,
          parking: parking,
          lift: lift,
          electricity: electricity,
          airconditioner: airconditioner
        } 
        )} 
        style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableWithoutFeedback>

      </View>

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
  marginBottom: "7%",
  textAlign: "left"
},
  screenNameHeader: {
    marginTop: "0%",
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
  radioButtonContainer: {
    padding: 30,
    marginTop: "25%",
  },
  radioGroupStyle: {
    fontSize: 2,
    color: colors.white,
    // flexDirection: 'row',
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
    padding: 15,
    borderRadius: 7,
    marginTop: "10%"
  },
  nextButtonText: {
    textAlign: "center",
    color: colors.white,
    fontSize: 20,
    fontFamily: "SourceSansPro_400Regular",
  }
});

export default Step4;