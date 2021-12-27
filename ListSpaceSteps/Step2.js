import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import colors from '../utility/colors';
import AppLoading from 'expo-app-loading';
import { useFonts, Righteous_400Regular } from '@expo-google-fonts/righteous';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useWindowDimensions } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { IconButton } from 'react-native-paper';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

function Step2({ navigation, route }) {

   //Calling accomodaiton and gender values from Step1...
  //  const accomodation = route.params;
  //  const accommodationItem = route.params.accomodation;

  //  const gender = route.params;
  //  const genderItem = route.params.gender;

   const {accomodation, gender} = route.params;

   console.log("Accomodation " + accomodation)
   console.log("Gender " + gender)

  const [story, setStory] = useState([]);
  const [alcoholItem, setalcoholItem] = useState([]);
  const { height, width } = useWindowDimensions();

  const alcohol = ["I am comfortable", "Not allowed"];

  useEffect(() =>{
    const getUserData = async () => {
       try {
        //Saving cookies...
        const tokenData = await AsyncStorage.getItem('cookie')
        const response = await axios(`http://192.168.1.10/hummingbird/homeScreen.php?email=${tokenData}`);
        setStory(response.data);
        console.log("Step2 response data: ")
        console.log(response.data)
       }catch(err){
       console.log("Step2 error: " + err);
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
      Select suitable options that your ideal tenants should hold...
        </Text>
        {/* First set of question */}
        <Text style={styles.screenNameHeader}>Smoking & Alchol comsumpitions</Text>
        <Text style={styles.screenNameMeta}>Select, either you or your tenants are comfortable sharing smokes, drinks</Text>
        <View style={styles.SelectDropdownContainer}>
        <SelectDropdown
	         data={alcohol}
           defaultButtonText="Select one"
           buttonStyle={styles.selectOption}
           dropdownStyle={styles.dropDownOption}
	         onSelect={(alcoholItem, index) => {
             setalcoholItem(alcoholItem)
		          console.log(alcoholItem, index)
	         }}
	         buttonTextAfterSelection={(selectedItem, index) => {
		         return selectedItem
	         }}
	         rowTextForSelection={(item, index) => {
		         return item
	         }}
        />
        </View>

        <TouchableWithoutFeedback 
        disabled={alcoholItem.length < 1}
        onPress={()=> navigation.navigate("Step3", {
          alcohol: alcoholItem,
          accomodation: accomodation,
          gender: gender
        })} 
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
    marginTop: "85%"
  },
  nextButtonText: {
    textAlign: "center",
    color: colors.white,
    fontSize: 20,
    fontFamily: "SourceSansPro_400Regular",
  }
});

export default Step2;