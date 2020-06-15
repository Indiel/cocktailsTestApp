import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {connect} from 'react-redux';
import {fetchCategories} from './src/actions/actions';

import Drinks from './src/screens/Drinks';
import Filter from './src/screens/Filter';

const Stack = createStackNavigator();

function App({getCategories}) {
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Drinks" component={Drinks} />
        <Stack.Screen name="Filter" component={Filter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    getCategories: () => dispatch(fetchCategories()),
  };
};

export default connect(
  undefined,
  mapDispatchToProps,
)(App);
