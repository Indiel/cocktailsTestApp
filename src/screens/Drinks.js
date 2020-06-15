import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  SectionList,
  SafeAreaView,
} from 'react-native';

import {connect} from 'react-redux';
import {fetchCocktails, addCategoryIndex} from '../actions/actions';

const Item = ({item}) => (
  <View style={styles.item}>
    <Image
      style={styles.itemImage}
      source={{
        uri: item.strDrinkThumb,
      }}
    />
    <Text style={styles.title}>{item.strDrink}</Text>
  </View>
);

const Drinks = ({
  navigation,
  categoryIndex,
  cocktailList,
  filter,
  error,
  getCocktails,
  setCategoryIndex,
}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => navigation.navigate('Filter')}>
          <Image
            style={styles.image}
            source={require('../../assets/img/filter-icon.png')}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (filter.length) {
      getCocktails(filter[categoryIndex]);
    }
  }, [filter, categoryIndex, getCocktails]);

  const onLoadMore = () => {
    if (categoryIndex < filter.length - 1) {
      setCategoryIndex();
    }
  };

  const errorElement = error ? (
    <Text style={styles.loading}>Error. Sorry, something goes wrong((</Text>
  ) : (
    undefined
  );

  const element = filter.length ? (
    <SectionList
      style={styles.sectionList}
      ListEmptyComponent={
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color="#000000"
        />
      }
      initialNumToRender={8}
      windowSize={5}
      maxToRenderPerBatch={2}
      sections={cocktailList}
      keyExtractor={item => item.idDrink}
      renderItem={({item}) => <Item item={item} />}
      renderSectionHeader={({section: {title}}) => (
        <Text style={styles.header}>{title}</Text>
      )}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
    />
  ) : (
    undefined
  );

  return (
    <SafeAreaView style={styles.container}>
      {errorElement || element}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  sectionList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  loading: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  filterButton: {
    marginRight: 15,
    width: 20,
    height: 20,
  },
  image: {
    flex: 1,
    width: 20,
    height: 20,
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  itemImage: {
    marginRight: 20,
    width: 100,
    height: 100,
  },
});

const mapStateToProps = state => {
  return {
    categories: state.categories,
    categoryIndex: state.categoryIndex,
    cocktailList: state.cocktailList,
    filter: state.filter,
    error: state.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCocktails: selectedCategory =>
      dispatch(fetchCocktails(selectedCategory)),
    setCategoryIndex: () => dispatch(addCategoryIndex()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Drinks);
