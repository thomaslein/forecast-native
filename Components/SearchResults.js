'use strict';
 
var React = require('react-native');
var DetailView = require('./DetailView');
var {
  StyleSheet,
  View,
  TouchableHighlight,
  ListView,
  Text,
  Component,
  WebView
} = React;

var styles = StyleSheet.create({
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: 'white'
  },
  time: {
    fontSize: 22,
    color: '#ECF0F1',
    fontFamily: 'Roboto-Bold'
  },
  info: {
    fontSize: 20,
    color: '#ECF0F1',
    fontFamily: 'Roboto-Regular'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#055183'
  },
   webView: {
    backgroundColor: '#055183',
    flex: 1,
    flexDirection: 'row',
    width: 80,
    height: 80,
    marginLeft: 30
  }
});


class SearchResults extends Component {
 
  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.data),
      iconURL: ''
    };
  }

rowPressed(value) {

  var props = this.props.data.filter(prop => prop === value)[0];

  this.props.navigator.push({
    title: "Detailed forecast",
    component: DetailView,
    passProps: {data: props}
  });
}
 
renderRow(rowData, sectionID, rowID) {
 
  return (
    <TouchableHighlight onPress={() => this.rowPressed(rowData)}
        underlayColor='rgba(255,255,255, 0.2)'>
      <View>
        <View style={styles.rowContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.time}>{new Date(rowData.time * 1000).getHours() + ' h' }</Text>
            <Text style={styles.info}>{Math.round(rowData.temperature) + ' ºC'}</Text>
            <Text style={styles.info} 
              numberOfLines={1}>{rowData.summary}
            </Text>
          </View>
          <WebView
            style={styles.webView}
            url={'http://localhost/github/forecast-native/web/' + rowData.icon + '.html'}
            automaticallyAdjustContentInsets={false}
            scrollEnabled={false}
            bounces={false}
          />
        </View>
        <View style={styles.separator}/>
      </View>
    </TouchableHighlight>
  );
}
 
  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>
    );
  }

}

module.exports = SearchResults;