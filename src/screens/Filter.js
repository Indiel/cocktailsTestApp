import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import {connect} from 'react-redux';
import {setCheckedCategories, addFilter} from '../actions/actions';

const Filter = ({
  navigation,
  categories,
  checkedCategories,
  getFilter,
  toggleCheckedCategories,
}) => {
  const CategoryItem = ({item, index, value}) => {
    return (
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={value}
          onValueChange={() => {
            toggleCheckedCategories(index);
          }}
        />
        <Text style={styles.label}>{item}</Text>
      </View>
    );
  };

  const onFilter = () => {
    const newFilter = [];
    checkedCategories.map((item, i) => {
      if (item) {
        newFilter.push(categories[i]);
      }
    });
    if (newFilter.length) {
      getFilter(newFilter);
    } else {
      getFilter(categories);
    }
    navigation.goBack();
  };

  const items = categories
    ? categories.map((item, i) => {
        return (
          <CategoryItem
            key={i}
            item={item}
            index={i}
            value={checkedCategories[i]}
          />
        );
      })
    : undefined;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {items}
        <TouchableOpacity style={styles.button} onPress={onFilter}>
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  button: {
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'white',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});

const mapStateToProps = state => {
  return {
    categories: state.categories,
    checkedCategories: state.checkedCategories,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleCheckedCategories: index => dispatch(setCheckedCategories(index)),
    getFilter: selectedCategory => dispatch(addFilter(selectedCategory)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filter);
