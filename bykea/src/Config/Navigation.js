import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


import Dashboard from '../Views/Dashboard';
import PickUp from '../Views/Pickup';
import Destination from '../Views/Destination';
import CarSelection from '../Views/CarSelection';
import RideHistory from '../Views/RideHistory';
import RideHistoryDetail from '../Views/RideHistoryDetail';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Navigator() {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Dashboard" component={DashboardNavigator} />
                <Drawer.Screen name="Ride History" component={HistoryNavigator} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

function DashboardNavigator() {
    return <Stack.Navigator>
        <Stack.Screen name="DashBoard" component={Dashboard} />
        <Stack.Screen name="PickUp" component={PickUp} />
        <Stack.Screen name="Destination" component={Destination} />
        <Stack.Screen name="CarSelection" component={CarSelection} />
    </Stack.Navigator>
}

function HistoryNavigator() {
    return <Stack.Navigator>
        <Stack.Screen name="RideHistory" component={RideHistory} />
        <Stack.Screen name="RideHistoryDetail" component={RideHistoryDetail} />
    </Stack.Navigator>
}

export default Navigator;