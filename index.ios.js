var React = require('react-native');
var SearchPage = require('./Components/SearchPage');

'use strict'

var styles = React.StyleSheet.create({
  container: {
    flex: 1
  }
});

class Forecast extends React.Component {
  render() {
    return (
      <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Forecast',
          component: SearchPage
        }}/>
    );
  }
}

React.AppRegistry.registerComponent('Forecast', () => Forecast);
