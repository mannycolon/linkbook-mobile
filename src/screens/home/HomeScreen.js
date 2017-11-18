import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { View, ScrollView, Image, Text, StyleSheet } from 'react-native';

const BoxShadow = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100px;
  background-color: #FFFFFF;
  shadow-color: #000000;
  shadow-opacity: 0.5;
  shadow-radius: 2;
  shadow-offset: 0px 2px;
  margin-vertical: 2.5;
  elevation: 1;
`;

export default class HomeScreen extends Component {
  render() {
    const articles = [
      {
        title: 'Red Sox might need Rafael Devers to carry them',
        description: "The rookie is providing the power Boston's lineup lacks, but is it too much too soon to ask of a 20-year-old still adjusting to major league pitching?",
        uri: 'http://www.espn.com/blog/boston/red-sox/post/_/id/53281/red-sox-might-need-rafael-devers-to-carry-them',
        image: 'http://a.espncdn.com/combiner/i?img=%2Fphoto%2F2017%2F0827%2Fr249970_1296x729_16%2D9.jpg',
      },
      {
        title: 'David Price, Boston Red Sox lefty, throws 29-pitch bullpen; "It was impressive," John Farrell says John Farrell says John Farrell says John Farrell says',
        description: 'Boston Red Sox lefty David Price (elbow) threw a 29-pitch bullpen here at Yankee Stadium on Friday. Still no timetable exists on his potential return.',
        uri: 'http://www.masslive.com/redsox/index.ssf/2017/09/david_price_boston_red_sox_lef_17.html',
        image: 'http://image.masslive.com/home/mass-media/width620/img/redsox_impact/photo/23236405-standard.jpg',
      },
      {
        title: 'From fill-in to lights out, Doug Fister continues his resurgence',
        description: 'After struggling early with the Red Sox, Fister changed his mechanics, and a change in fortunes followed, with Friday\'s Bronx gem the latest example.',
        uri: 'http://www.espn.com/blog/boston/red-sox/post/_/id/53316/from-fill-in-to-lights-out-doug-fister-continues-his-resurgence',
        image: 'http://a2.espncdn.com/combiner/i?img=%2Fphoto%2F2017%2F0901%2Fr252439_1296x729_16%2D9.jpg',
      },
      {
        title: 'Red Sox might need Rafael Devers to carry them',
        description: "The rookie is providing the power Boston's lineup lacks, but is it too much too soon to ask of a 20-year-old still adjusting to major league pitching?",
        uri: 'http://www.espn.com/blog/boston/red-sox/post/_/id/53281/red-sox-might-need-rafael-devers-to-carry-them',
        image: 'http://a.espncdn.com/combiner/i?img=%2Fphoto%2F2017%2F0827%2Fr249970_1296x729_16%2D9.jpg',
      },
      {
        title: 'David Price, Boston Red Sox lefty, throws 29-pitch bullpen; "It was impressive," John Farrell says',
        description: 'Boston Red Sox lefty David Price (elbow) threw a 29-pitch bullpen here at Yankee Stadium on Friday. Still no timetable exists on his potential return.',
        uri: 'http://www.masslive.com/redsox/index.ssf/2017/09/david_price_boston_red_sox_lef_17.html',
        image: 'http://image.masslive.com/home/mass-media/width620/img/redsox_impact/photo/23236405-standard.jpg',
      },
      {
        title: 'From fill-in to lights out, Doug Fister continues his resurgence',
        description: 'After struggling early with the Red Sox, Fister changed his mechanics, and a change in fortunes followed, with Friday\'s Bronx gem the latest example.',
        uri: 'http://www.espn.com/blog/boston/red-sox/post/_/id/53316/from-fill-in-to-lights-out-doug-fister-continues-his-resurgence',
        image: 'http://a2.espncdn.com/combiner/i?img=%2Fphoto%2F2017%2F0901%2Fr252439_1296x729_16%2D9.jpg',
      },
    ];
    const { navigate } = this.props.navigation;
    
    return (
      <ScrollView style={styles.container}>
        {
          articles.map((article, i) => (
            <BoxShadow key={i} onPress={() => navigate('WebView', article)}>
              <Image source={{ uri: article.image }} style={{ height: '100%', width: '45%', padding: 0, margin: 0 }} />
              <View style={{ width: 0, flexGrow: 1 }}>
                <Text style={{ padding: 10, fontWeight: 'bold', opacity: 0.9 }} ellipsizeMode='tail' numberOfLines={4}>
                  {article.title}
                </Text>
              </View>
            </BoxShadow>
          ))
        }
      </ScrollView>
    );
  }
}

// HomeScreen.propTypes = {
//   variable:	PropTypes.variableType.isRequired,
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
