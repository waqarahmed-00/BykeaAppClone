import { View, Text, Button, TouchableOpacity, StyleSheet, Image } from 'react-native';



export default function Dashboard({navigation}) {

 
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={{ uri: 'https://res.cloudinary.com/madimages/image/fetch/e_sharpen:100,q_auto:eco,fl_progressive:semi/https://s3.amazonaws.com/mobileappdaily/mad/uploads/img_best_ride_sharing_apps.webp' }}
          style={{ width: 500, height: 500, marginBottom: 20 }}
        />
        <TouchableOpacity
          style={{
            width: '70%',
            backgroundColor: '#F95E63',
            padding: 10,
            borderRadius: 5,
            
          }}
          onPress={() => { 
            navigation.navigate('PickUp')
            console.log('Pickup button pressed');
          }}>
          <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>Pickup</Text>
        </TouchableOpacity>
      </View>

    )

}