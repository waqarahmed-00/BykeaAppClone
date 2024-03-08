import React, { useState, useEffect } from 'react'
import { View, Button, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function PickUp({ navigation }) {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [places, setPlaces] = useState([])
  const [pickup, setPickup] = useState()

  useEffect(() => {

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      Location.watchPositionAsync({
        accuracy: 6,
        distanceInterval: 1,
        timeInterval: 1000
      }, (location) => {
        setLocation(location)
      })

    })();
  }, []);

  const searchPlaces = (text) => {
    // console.log("Text" , text)
    setPickup()
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'fsq38DsZJ6ojaNyPcFjOmd9ozsTRx0mdUpS2DETyzDeZLjI='
      }
    };

    const { latitude, longitude } = location.coords

    fetch(`https://api.foursquare.com/v3/places/search?query=${text}&ll=${latitude},${longitude}&raduis=3000`, options)
      .then((response) => response.json())
      .then((response) => {
        // console.log('response',response)
        setPlaces(response.results)
      })
      .catch((err) => console.error(err));
  }

  const onPlacesSelect = (item) => {
    setPickup(item)
  }


  //Early Return
  if (errorMsg) {
    return <Text>{errorMsg}</Text>
  }

  if (!location) {
    return <Text> Loading... </Text>
  }


  // console.log("Location", location)
  return (
    <View style={styles.container}>
      <Text style={styles.pickup}>PickUP</Text>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder='Search any Location' onChangeText={searchPlaces} />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => searchPlaces()}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {!pickup && (
        <View style={styles.placesContainer}>
          {places.map((item, index) => {
            return <TouchableOpacity key={index} onPress={() => onPlacesSelect(item)}>
              <Text>{item.name}, {item.location.address}</Text>
            </TouchableOpacity>
          })}
        </View>)}

      {pickup &&
        (<View>
          <Text style={styles.selectedPlace}>Your Selected Pickup Location is </Text>
          <Text style={styles.selectedPlace}>{pickup.name}, {pickup.location.address}</Text>
        </View>)}

      <MapView
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0001,
          longitudeDelta: 0.0001
        }}
        style={styles.map}>
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          }}
          title={'Your Location'}
          description={'Orangi Town'}
        />
      </MapView>

      <TouchableOpacity
        disabled={!pickup}
        style={[styles.destinationButton, { alignSelf: 'center' }]}
        onPress={() => {
          navigation.navigate('Destination' , { pickup})
        }}>
        <Text style={styles.buttonText}>Destination</Text>
      </TouchableOpacity>
    </View>

  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '60%',
  },
  pickup: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchButton: {
    backgroundColor: '#F95E63',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  placesContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  selectedPlace: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    textAlign: 'center',
  },
  destinationButton: {
    width: '70%',
    backgroundColor: '#F95E63',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});