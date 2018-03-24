import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Dimensions, RefreshControl, Platform } from 'react-native';
import { Tile } from 'react-native-elements';
import GridView from 'react-native-super-grid';
// components
import EmptyCollectionsScreen from '../../commons/EmptyCollectionsScreen';
// actions
import * as CollectionsActions from '../../actions/CollectionsActions';

class CollectionsScreen extends Component {
  componentDidMount() {
    this.props.fetchMyCollections();
  }

  componentWillReceiveProps(nextProps) {
    const currentScreenIndex = this.props.navigationReducer.routes[0].index;
    const newScreenIndex = nextProps.navigationReducer.routes[0].index;
    if (currentScreenIndex !== 2 && newScreenIndex === 2) {
      this.props.fetchMyCollections();
    }
  }

  render() {
    const {
      navigation: {
        navigate,
      },
      collectionsReducer: {
        collections,
        fetchingCollections,
      },
      fetchMyCollections,
    } = this.props;
    if (collections.length === 0) return <EmptyCollectionsScreen />;

    const { width } = Dimensions.get('window');
    const tileWidth = (width - 20) / 2;

    return (
      <GridView
        enableEmptySections
        refreshControl={
          <RefreshControl
            refreshing={fetchingCollections}
            onRefresh={() => fetchMyCollections()}
          />
        }
        itemDimension={150}
        items={collections}
        style={{ paddingTop: 10, flex: 1, marginTop: Platform.OS === 'ios' ? 0 : 5 }}
        renderItem={collection => {
          const imageSource = collection.articles[0] && collection.articles[0].imageURL ?
            { uri: collection.articles[0].imageURL } : require('../../../assets/images/new-collection-placeholder.jpg');
          return (
            <View>
              <Tile
                onPress={() => navigate('CollectionArticles', {
                  title: collection.name,
                  collectionId: collection._id,
                  collectionName: collection.name,
                })}
                imageSrc={imageSource}
                title={collection.name}
                featured
                height={160}
                width={tileWidth}
                containerStyle={{ marginTop: -5 }}
                imageContainerStyle={{ borderRadius: 5 }}
                titleStyle={{ fontWeight: 'bold', opacity: 1 }}
              />
            </View>
          );
        }}
      />
    );
  }
}

CollectionsScreen.propTypes = {
  collectionsReducer:	PropTypes.shape({
    collections: PropTypes.array,
    isModalVisible: PropTypes.bool,
    isNewCollectionScreenVisible: PropTypes.bool,
    tempCollectionName: PropTypes.string,
    newCollectionName: PropTypes.string,
    newCollectionNameIsDuplicate: PropTypes.bool,
  }),
};

const mapStateToProps = (state) => ({
  collectionsReducer: state.collectionsReducer,
  navigationReducer: state.navigationReducer,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMyCollections: () => {
    dispatch(CollectionsActions.fetchMyCollections());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsScreen);
