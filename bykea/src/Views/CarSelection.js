import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons


export default function CarSelection({ route }) {
    const { pickup, destination } = route.params

    const fares = {
        bike: 50,
        rickshaw: 80,
        car: 100
    }

    const calculateFare = (vehicle) => {
        const { latitude: pickupLat, longitude: pickupLong } = pickup.geocodes.main
        const { latitude: destinationLat, longitude: destinationLong } = destination.geocodes.main

        const distance = calcCrow(pickupLat, pickupLong, destinationLat, destinationLong)

        const fare = fares[vehicle] * distance
        alert("RS: " + fare.toFixed(2))
    }

    function calcCrow(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = toRad(lat2 - lat1);
        var dLon = toRad(lon2 - lon1);
        var lat1 = toRad(lat1);
        var lat2 = toRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }

    // Converts numeric degrees to radians
    function toRad(Value) {
        return Value * Math.PI / 180;
    }


    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Car Selection</Text>

            <View style={styles.locationContainer}>
                <Text style={styles.locationTitle}>Your Selected Pickup Location is</Text>
                <Text style={styles.locationText}>{pickup.name} , {pickup.location.address}</Text>
            </View>

            <View style={styles.locationContainer}>
                <Text style={styles.locationTitle}>Your Selected Destination Location is</Text>
                <Text style={styles.locationText}>{destination.name} , {destination.location.address}</Text>
            </View>

            <View style={styles.iconContainer}>
                <View style={styles.iconBox}>
                    <MaterialIcons name="directions-bike" size={50} color="white" />
                    <Text onPress={() => calculateFare('bike')} style={styles.iconText}>{`Bike ${fares.bike} RS KM`}</Text>
                </View>
                <View style={styles.iconBox}>
                    <MaterialIcons name="directions-car" size={50} color="white" />
                    <Text onPress={() => calculateFare('car')} style={styles.iconText}>{`Car ${fares.car} RS KM`}</Text>
                </View>
                <View style={styles.iconBox}>
                    <MaterialIcons name="directions-transit" size={50} color="white" />
                    <Text onPress={() => calculateFare('rickshaw')} style={styles.iconText}>{`Rickshaw${fares.rickshaw} RS KM`}</Text>
                </View>
            </View>

            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F95E63',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 50,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    iconContainer: {
        // backgroundColor: 'black',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        marginTop: 50,
    },
    iconBox: {
        alignItems: 'center',
    },
    iconText: {
        marginTop: 10,
        fontSize: 18,
        color: 'white',
        width: 100,
        height: 50,
        backgroundColor: 'black',
        textAlign: 'center',
        borderRadius: 9,
    },
    locationContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    locationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'white'
    },
    locationText: {
        fontSize: 16,
        color: 'white'
    },
});