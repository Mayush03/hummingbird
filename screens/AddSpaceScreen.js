import React, { useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import colors from '../utility/colors';
import AppLoading from 'expo-app-loading';
import { useFonts, Righteous_400Regular } from '@expo-google-fonts/righteous';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconButton } from 'react-native-paper';
import Wizard from "react-native-wizard";

// Wizard step components
import Step1 from "../ListSpaceSteps/Step1";
import Step2 from "../ListSpaceSteps/Step2";
import Step3 from "../ListSpaceSteps/Step3";

function AddSpaceScreen({ navigation, route }) {

  //const email = route.params;
  //const emailobj = route.params.email;
  const [model, setModel] = useState({});
  
  //Wizard setup
  const wizard = useRef()
  const [isFirstStep, setIsFirstStep] = useState(true)
  const [isLastStep, setIsLastStep] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const stepList = [
    {
      content: <Step1/>
    },
    {
      content: <Step2/>
    },
    {
      content: <Step3 />
    },
  ]

 

  useEffect(() =>{
    const getUserData = async () => {
       try {
        //Saving cookies...
        const tokenData = await AsyncStorage.getItem('cookie')
        const response = await axios(`http://192.168.1.10/hummingbird/homeScreen.php?email=${tokenData}`);
        setModel(response.data);
        console.log("AddSpaceScreen response data: ")
        console.log(response.data)
       }catch(err){
       console.log("ProfileScreen: " + err);
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
        {/* <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            backgroundColor: colors.white,
            borderBottomColor: "#dedede",
            borderBottomWidth: 1,
          }}>
          <Button disabled={isFirstStep} title="Prev" onPress={() => wizard.current.prev()} />
          <Text>{currentStep + 1}. Step</Text>
          <Button disabled={isLastStep} title="Next" onPress={() => wizard.current.next()} />
        </View> */}
      <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", }}>
        <Wizard
          ref={wizard}
          steps={stepList}
          isFirstStep={val => setIsFirstStep(val)}
          isLastStep={val => setIsLastStep(val)}
          onNext={() => {
            console.log("Next Step Called")
          }}
          onPrev={() => {
            console.log("Previous Step Called")
          }}
          currentStep={({ currentStep, isLastStep, isFirstStep }) => {
            setCurrentStep(currentStep)
          }}
        />
        {/* <View style={{ flexDirection: "row", margin: 18 }}>
          {stepList.map((val, index) => (
            <View
              key={"step-indicator-" + index}
              style={{
                width: 10,
                marginHorizontal: 6,
                height: 10,
                borderRadius: 5,
                backgroundColor: index === currentStep ? "#fc0" : "#000",
              }}
            />
          ))}
        </View> */}
      </View>

      </View>

      <View style={styles.bottomButtonContainer}>
          <Button disabled={isFirstStep} title="Prev" onPress={() => wizard.current.prev()} />
          {/* <Text>{currentStep + 1}. Step</Text> */}
          <Button disabled={isLastStep} title="Next" onPress={() => wizard.current.next()} />
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
  appLogo: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  logotext: {
    color: colors.orange,
    fontFamily: 'Righteous_400Regular',
    fontSize: 25,
    textAlign: "center"
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
    textAlign: "center",
    backgroundColor: colors.blue,
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
  }
});

export default AddSpaceScreen;