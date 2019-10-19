import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import MapView from 'react-native-maps';
import {PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';



export default class App extends Component {

  state = {
    isLoading: true,
    coords: {

    }
  }
  componentDidMount(){
    this.requestCameraPermission()
    Geolocation.getCurrentPosition(info => {

      this.setState({
        coords: info.coords,
        isLoading:false,
      })

    
    });
    
 
  }
  async  requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Location Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  

  
  render() {
    // const {latitude, longitude} = this.state.coords
    console.log('aho ya saara', this.state.coords)
    return (
      <View style={{flex: 1}}>
        {
          (this.state.isLoading)? 
          
            <ActivityIndicator size="small" color="#00ff00" />

          : <MapView
          style={styles.map}
          initialRegion={{
            latitude: this.state.coords.latitude,
            longitude: this.state.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        }
      </View>
     
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
