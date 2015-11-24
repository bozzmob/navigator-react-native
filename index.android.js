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

var PostsView = require('./App/Views/Posts');
var PostView = require('./App/Views/Post');
var WebView = require('./App/Views/Web');
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
          title='Hacker News - Top Stories' />
      )
    }
    return (
      <ToolbarAndroid
        style={styles.toolbar}
        onIconClicked={this.props.navigator.pop}
        titleColor="#ffffff"
        title='Hacker News - Top Stories' />
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
        <PostsView nav = {navigator} name = { route.name }/>
        </View>
      );
    }
    if (route.id === 'Post') {
      console.log("Post - route= "+JSON.stringify(route)+" navigator= "+navigator+" route.index= "+JSON.stringify(route.index)+" route.post= "+JSON.stringify(route.post));
      return (
        <View style={{flex: 1}}>
        <NavToolbar navIcon={true} navigator={navigator}/>
        <PostView index = {route.index} post={route.post} nav={navigator}  />
        </View>
      )
    }

    if (route.id === 'WebView') {
      console.log("WebView - route= "+JSON.stringify(route)+" navigator= "+navigator+" route.index= "+JSON.stringify(route.index)+" route.post= "+JSON.stringify(route.post));
      return (
        <View style={{flex: 1}}>
            <NavToolbar navIcon={true} navigator={navigator}/>
            <WebView index = {route.index + 1}  title={route.title} url={route.url} />
          </View>
      )
    }
  },
  render: function() {
    //console.log("WebView - route= "+route+" navigator= "+navigator+" route.index= "+route.index+" route.post= "+route.post);
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('NavigatorReactNative', () => NavigatorReactNative);
