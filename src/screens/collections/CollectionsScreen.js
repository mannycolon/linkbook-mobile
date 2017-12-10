import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Dimensions, RefreshControl } from 'react-native';
import { Tile } from 'react-native-elements';
import GridView from 'react-native-super-grid';
// actions
import * as CollectionsActions from '../../actions/collectionsActions';

class CollectionsScreen extends Component {
  state = {
    refreshing: true,
  }

  componentDidMount() {
    this.props.fetchMyCollections();
  }

  componentWillReceiveProps(nextProps) {
    const currentScreenIndex = this.props.navigationReducer.routes[0].index;
    const newScreenIndex = nextProps.navigationReducer.routes[0].index;
    if (currentScreenIndex !== 2 && newScreenIndex === 2) {
      this.props.fetchMyCollections();
    }
    this.setState({ refreshing: false });
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.fetchMyCollections();
  }

  render() {
    const {
      navigation: {
        navigate,
      },
      collectionsReducer: {
        collections,
      },
    } = this.props;
    const { width } = Dimensions.get('window');
    const tileWidth = (width - 20) / 2;

    return (
      <GridView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
        itemDimension={150}
        items={collections}
        style={{ paddingTop: 10, flex: 1 }}
        renderItem={collection => (
          <View>
            <Tile
              onPress={() => navigate('CollectionArticles', { title: collection.name, collection })}
              imageSrc={{ uri: collection.articles[0].imageURL }}
              title={collection.name}
              featured
              height={160}
              width={tileWidth}
              containerStyle={{ marginTop: -5 }}
              imageContainerStyle={{ borderRadius: 5 }}
              titleStyle={{ fontWeight: 'bold', opacity: 1 }}
            />
          </View>
        )}
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
