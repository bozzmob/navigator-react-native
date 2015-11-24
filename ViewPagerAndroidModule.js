'use strict';

var React = require('react-native');
var {
  Image,
  StyleSheet,
  AppRegistry,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  ViewPagerAndroid,
} = React;

var PAGES = 5;
var BGCOLOR = ['#F3F781', '#D8F781', '#CEF6F5', '#FE9A2E', '#E6E6E6'];
var IMAGE_URIS = [
  'https://lh4.ggpht.com/JJ5Q0-B7P52tQqaz9m7ZEq9cpIOCpDZqLccODNuOl3FOo_bbx5yfoDbFRVbfuJSFHHY=w300',
  'https://lh3.googleusercontent.com/EkPYk0aq6xKrERKrde2jFChOh5S3wewzW-cKy1pck8YFu8ZIAx3kjsG45wZYi5-khUY=w300',
  'https://lh3.googleusercontent.com/mkfH6NV_uISCI88anQnaDIy9upOqLSf-9LzQ7bqEgPSRqZ31OxjdJHOZIa4OXucE8w=w300',
  'https://pbs.twimg.com/profile_images/518624830216626177/nP44m-lm.png',
  'https://lh3.ggpht.com/RKLFoqtI43iNDEp8_xbCoHdHQnc_iUDH90kW_j2yH_x6U_PnL9jWQ4X4ZBhH0zxkgg=w300',
];

var LikeCount = React.createClass({
  getInitialState: function() {
    return {
      likes: 7,
    };
  },
  onClick: function() {
    this.setState({likes: this.state.likes + 1});
  },
  render: function() {
    var thumbsUp = '\uD83D\uDC4D';
    return (
      <View style={styles.likeContainer}>
        <TouchableOpacity onPress={this.onClick} style={styles.likeButton}>
          <Text style={styles.likesText}>
            {thumbsUp + ' Like'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.likesText}>
          {this.state.likes + ' likes'}
        </Text>
      </View>
    );
  },
});

var Button = React.createClass({
  _handlePress: function() {
    if (this.props.enabled && this.props.onPress) {
      this.props.onPress();
    }
  },
  render: function() {
    return (
      <TouchableWithoutFeedback onPress={this._handlePress}>
        <View style={[styles.button, this.props.enabled ? {} : styles.buttonDisabled]}>
          <Text style={styles.buttonText}>{this.props.text}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
});

var ProgressBar = React.createClass({
  render: function() {
    var fractionalPosition = (this.props.progress.position + this.props.progress.offset);
    var progressBarSize = (fractionalPosition / (PAGES - 1)) * this.props.size;
    return (
      <View style={[styles.progressBarContainer, {width: this.props.size}]}>
        <View style={[styles.progressBar, {width: progressBarSize}]}/>
      </View>
    );
  }
});

var ViewPagerAndroidModule = React.createClass({
  statics: {
    title: '<ViewPagerAndroid>',
    description: 'Container that allows to flip left and right between child views.'
  },
  getInitialState: function() {
    return {page: 0, progress: {position: 0, offset: 0}};
  },
  onPageSelected: function(e) {
    this.setState({page: e.nativeEvent.position});
  },
  onPageScroll: function(e) {
    this.setState({progress: e.nativeEvent});
  },
  move: function(delta) {
    var page = this.state.page + delta;
    this.viewPager && this.viewPager.setPage(page);
    this.setState({page});
  },
  go: function(page) {
    this.viewPager && this.viewPager.setPage(page);
    this.setState({page});
  },
  openGrid: function() {
    this.props.nav.push({
      id: 'GridView',
      index: 2,
    });
  },
  render: function() {
    var pages = [];
    for (var i = 0; i < PAGES; i++) {
      var pageStyle = {
        backgroundColor: BGCOLOR[i % BGCOLOR.length],
        alignItems: 'center',
        padding: 20,
      };
      pages.push(
        <View key={i} style={pageStyle} collapsable={false}>
          <Image
            style={styles.image}
            source={{uri: IMAGE_URIS[i % BGCOLOR.length]}} />
          <LikeCount />
       </View>
      );
    }
    var page = this.state.page;
    return (
      <View style={styles.container}>
        <View style={styles.buttons}>
          <Button text="Start" enabled={page > 0} onPress={() => this.go(0)}/>
          <Button text="Prev" enabled={page > 0} onPress={() => this.move(-1)}/>
          <Text style={styles.buttonText}>Page {page + 1} / {PAGES}</Text>
          <ProgressBar size={100} progress={this.state.progress}/>
          <Button text="Next" enabled={page < PAGES - 1} onPress={() => this.move(1)}/>
          <Button text="Last" enabled={page < PAGES - 1} onPress={() => this.go(PAGES - 1)}/>
        </View>
        <View style={styles.buttons}>
         <Button text="Click to Navigate" enabled="true" onPress={() => this.openGrid()} />
        </View>
        <ViewPagerAndroid
          style={styles.viewPager}
          initialPage={0}
          onPageScroll={this.onPageScroll}
          onPageSelected={this.onPageSelected}
          ref={viewPager => { this.viewPager = viewPager; }}>
          {pages}
        </ViewPagerAndroid>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    height: 30,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    width: 0,
    margin: 5,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'gray',
  },
  buttonDisabled: {
    backgroundColor: 'black',
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: 300,
    height: 200,
    padding: 20,
  },
  likeButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
    margin: 8,
    padding: 8,
  },
  likeContainer: {
    flexDirection: 'row',
  },
  likesText: {
    flex: 1,
    fontSize: 18,
    alignSelf: 'center',
  },
  progressBarContainer: {
    height: 10,
    margin: 10,
    borderColor: '#eeeeee',
    borderWidth: 2,
  },
  progressBar: {
    alignSelf: 'flex-start',
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  viewPager: {
    flex: 1,
  },
});

AppRegistry.registerComponent('ViewPagerAndroidModule', () => ViewPagerAndroidModule);
module.exports = ViewPagerAndroidModule;