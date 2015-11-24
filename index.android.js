/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Navigator,
  ToolbarAndroid,
  View,
  Text,
  TouchableOpacity,
  BackAndroid
} = React;

var ViewPager = require('./ViewPagerAndroidModule');
var Listicons = require('./Listicons');
var _navigator;


var NavToolbar = React.createClass({

  componentWillMount: function() {
    var navigator = this.props.navigator;
  },

  render: function () {
    if (this.props.navIcon) {
      return (
        <ToolbarAndroid
          style={styles.toolbar}
          navIcon={{uri: "ic_arrow_back_white_24dp", isStatic: true}}
          onIconClicked={this.props.navigator.pop}
          titleColor="#ffffff"
          title='Navigator Example' />
      )
    }
    return (
      <ToolbarAndroid
        style={styles.toolbar}
        onIconClicked={this.props.navigator.pop}
        titleColor="#ffffff"
        title='Navigator Example' />
    )
  }
});

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
     return false;
  }
  console.log("_navigator = "+_navigator);
  _navigator.pop();
  return true;
});

var NavigatorReactNative = React.createClass({

  renderScene: function(route, navigator) {
    _navigator = navigator;
    if (route.id === 'Home') {
      console.log("Home - route= "+JSON.stringify(route)+" navigator= "+navigator+" route.index= "+JSON.stringify(route.index)+" route.post= "+JSON.stringify(route.post));
      return (
        <View style={{flex: 1}}>
        <NavToolbar navigator={navigator}/>
        <ViewPager nav = {navigator} name = { route.name }/>
        </View>
      );
    }
    if (route.id === 'GridView') {
      console.log("Post - route= "+JSON.stringify(route)+" navigator= "+navigator+" route.index= "+JSON.stringify(route.index)+" route.post= "+JSON.stringify(route.post));
      return (
        <View style={{flex: 1}}>
        <NavToolbar navIcon={true} navigator={navigator}/>
        <Listicons index = {route.index} nav={navigator}  />
        </View>
      )
    }
  },
  render: function() {
    return (
      <Navigator
      initialRoute = {{id: 'Home', index: 0}}
      configureScene={() => Navigator.SceneConfigs.FadeAndroid}
      renderScene={this.renderScene} />
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
  },
  toolbar: {
    backgroundColor: '#FF6600',
    height: 56,
  }
});

AppRegistry.registerComponent('NavigatorReactNative', () => NavigatorReactNative);
