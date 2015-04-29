'use strict';
 
var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  Component
} = React;

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1,
    backgroundColor: '#055183',
    padding: 10
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#ECF0F1'
  }
});

class DetailView extends Component {
 
  render() {
    var data = this.props.data;
    return (
      <View style={styles.container}>
        <Text style={styles.description}>{'Cloudcover: ' + data.cloudCover}</Text>
        <Text style={styles.description}>{'Visibility: ' + data.visibility}</Text>
        <Text style={styles.description}>{'Pressure: ' + data.pressure}</Text>
        <Text style={styles.description}>{'Humidity: ' + data.humidity}</Text>
        <Text style={styles.description}>{'Ozone: ' + data.ozone}</Text>
        <Text style={styles.description}>{'Wind bearing: ' + data.windBearing}</Text>
        <Text style={styles.description}>{'Wind speed: ' + data.windSpeed}</Text>
        <Text style={styles.description}>{'Dew point: ' + data.dewPoint}</Text>
        <Text style={styles.description}>{'Apparent temp: ' + data.apparentTemperature}</Text>
      </View>
    );
  }
}

module.exports = DetailView;