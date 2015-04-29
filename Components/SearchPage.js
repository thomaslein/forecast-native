'use strict'

var SearchResults = require('./SearchResults');
var React = require('react-native');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  WebView,
  Component
} = React;

var styles = StyleSheet.create({
   header: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center',
    color: '#ECF0F1',
    fontFamily: 'Roboto-Regular'
  },
  description: {
    marginBottom: 30,
    fontSize: 18,
    textAlign: 'center',
    color: '#ECF0F1',
    fontFamily: 'Roboto-Regular'
  },
   details: {
    marginBottom: 10,
    fontSize: 20,
    textAlign: 'center',
    color: '#ECF0F1',
    fontFamily: 'Roboto-Regular'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center',
    backgroundColor: '#055183',
    flex: 1
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 20
  },
  buttonText: {
    fontSize: 18,
    color: '#ECF0F1',
    alignSelf: 'center',
    fontFamily: 'Roboto-Regular'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#3498DB',
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  searchInput: {
    height: 36,
    padding: 10,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#3498DB',
    borderRadius: 8,
    color: '#ECF0F1'
  },
  webViewWrapper: {
    width: 80,
    height: 80,
    marginBottom: 20
  },
  webView:{
    backgroundColor: 'rgba(255,255,255,0.8)'
  }
});

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      isLoading: false,
      message: '',
      geo: true,
      currently:{},
      iconURL: ''
    }
    this.findLocation();
  }
  onSearchTextChanged(event) {
    this.setState({ searchString: event.nativeEvent.text });
  }
  onSearchPressed() {
    this.setState({ geo: false});
    this._executeQuery(this.state.searchString);
  }
  findLocation() {
    navigator.geolocation.getCurrentPosition(
      location => {
        var location = location.coords.latitude + ',' + location.coords.longitude;
        this._executeQuery(location);
      },
      error => {
        this.setState({
          message: error
        });
    });
  }
  _executeQuery(query) {
    this.setState({ isLoading: true, message: '' });
    fetch('http://localhost:8082/weather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({location:query})
    }).then(response => response.json())
      .then(response => this._handleResponse(response))
      .catch(error => 
       this.setState({
        isLoading: false,
        message: 'Error: ' + error
      }));
  }
  _handleResponse(response) {
    this.setState({ isLoading: false , message: '' });
    if (response.formatted_address) {
      this.setState({ message: response.formatted_address, currently: response.currently, iconURL:'http://localhost/github/forecast-native/Forecast/web/' + response.currently.icon + '.html'});
      if(!this.state.geo){
        this.props.navigator.push({
          title: 'Hourly forecast',
          component: SearchResults,
          passProps: {data: response.hourly.data.slice(0,24)}
        });
      }
    } else {
      this.setState({message: 'Location not found!'});
    }
  }
  render() {
    console.log('SearchPage.render');
    var spinner = this.state.isLoading ?
      ( <ActivityIndicatorIOS
          hidden='true'
          size='large'/> ) :
      ( <View/>);
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Søk blant værvarsel i verden
        </Text>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.searchString}
            onChange={this.onSearchTextChanged.bind(this)}
            placeholder='Blir det sol?'/>
          <TouchableHighlight onPress={this.onSearchPressed.bind(this)} style={styles.button}
              underlayColor='rgba(255,255,255, 0.2)'>
            <Text style={styles.buttonText}>Søk</Text>
          </TouchableHighlight>
        </View>
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
        <View style={styles.webViewWrapper}>
          <WebView
            style={styles.webView}
            url={this.state.iconURL}
            automaticallyAdjustContentInsets={false}
            scrollEnabled={false}
            bounces={false}
          />
        </View>
        <Text style={styles.details}>{Math.round(this.state.currently.temperature) + ' ºC'}</Text>
        <Text style={styles.details}>{this.state.currently.summary}</Text>
      </View>
    );
  }
}

module.exports = SearchPage;