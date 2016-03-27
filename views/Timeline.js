'use strict';
import React, {
  AppRegistry,
  createClass,
  StyleSheet,
  Text,
  ListView,
  View,
  TouchableHighlight,
  Image,
  ScrollView,
  RefreshControl,
  TabBarIOS,
} from 'react-native';

import { TIMELINE_URL, HOME_URL, DEFAULT_AVATAR } from '../config'
import Post from './Post'

var base64Icon = 'data:image/png;base64,';

var Timeline = createClass({
  getInitialState () {
    return {
      isRefreshing: false,
      data: new ListView.DataSource({
        rowHasChanged (row1, row2) {return row1 !== row2}
      }),
      selectedTab: 'all',
      cursor: null
    }
  },
  render () {
    return this._renderTab()
  },
  _renderList (tab) {
    var fetcher
    if (tab === 'all') {
      fetcher = this._fetchAllData
    } else if (tab === 'home') {
      fetcher = this._fetchHomeData
    }
    return (
      <ScrollView showsVerticalScrollIndicator={false}
          style={{flex: 1}}
          refreshControl={
            <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={fetcher}
                tintColor="#ff0000"
                title="Loading..."
                colors={['#ff0000', '#00ff00', '#0000ff']}
                progressBackgroundColor="#ffff00"
              />
          }>
          {
            this.state.cursor &&
                <ListView style={styles.listView}
                    dataSource={this.state.data}
                    renderRow={this.renderPost}>
                </ListView>
                || this.renderLoadingView()
          }
      </ScrollView>
    );
  },
  _renderAll () {
    return this._renderList('all')
  },
  _renderHome () {
    return this._renderList('home')
  },
  componentDidMount () {
    this._fetchData(TIMELINE_URL);
  },
  _renderTab () {
    return <TabBarIOS
        tintColor="blue"
        barTintColor="white">
      <TabBarIOS.Item
          title="All"
          icon={{uri: base64Icon, scale: 3}}
          selected={this.state.selectedTab === 'all'}
          onPress={() => {
            this.setState({
              selectedTab: 'all',
            })
          }}>
        {this._renderAll()}
      </TabBarIOS.Item>
      <TabBarIOS.Item
          title="Home"
          icon={{uri: base64Icon, scale: 3}}
          selected={this.state.selectedTab === 'home'}
          onPress={() => {
            this.setState({
              selectedTab: 'home',
            })
          }}>
        {this._renderHome()}
      </TabBarIOS.Item>
      <TabBarIOS.Item
          title="Me"
          icon={{uri: base64Icon, scale: 3}}
          selected={this.state.selectedTab === 'me'}
          onPress={() => {
            this.setState({
              selectedTab: 'me',
            })
          }}>
        {this._renderWaiting()}
      </TabBarIOS.Item>
    </TabBarIOS>
  },
  _renderWaiting () {
    return (
      <View style={{flex: 1}}>
        <Text style={{marginTop: 80}}>Waiting for implementation!</Text>
      </View>
    )
  },
  renderLoadingView () {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loading}>Loading ....</Text>
      </View>
    )
  },
  renderPost (post) {
    return (
      <TouchableHighlight onDelayColor='#dddddd'
          onPress={() => this.jumpToPost(post.id)}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Image style={styles.avatar}
              source={post.user.avatar_url
                  && {uri: 'https:'+post.user.avatar_url}
                  || DEFAULT_AVATAR} />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{post.title}</Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.name}>{post.user.name || post.user.username}</Text>
          <Text style={styles.bottom}>{post.view_count} views</Text>
          <Text style={styles.bottom}>{post.comment_count} replies</Text>
          <Text style={styles.bottom}>{post.like_count} likes</Text>
          <Text style={styles.bottom}>{post.created_at}</Text>
        </View>
      </View>
      </TouchableHighlight>
    )
  },
  _fetchData (apiUrl) {
    this.setState({isRefreshing: true});
    console.log('fetching', apiUrl)
    return fetch(apiUrl)
      .then(rsp => rsp.json())
      .then(data => {this._handelRsp(data);console.log(data)})
      .catch(
        error =>
          this.setState({
            isLoading: false,
            message: 'Something bad happened ' + error
          })
      )
      .then(() => {
        this.setState({
          isRefreshing: false
        });
      });
  },
  _fetchAllData () {
    return this._fetchData(TIMELINE_URL)
  },
  _fetchHomeData () {
    return this._fetchData(HOME_URL)
  },
  _handelRsp (rsp) {
    console.log(rsp)
    this.setState({
      data: this.state.data.cloneWithRows(rsp.data),
      cursor: true
    });
  },
  jumpToPost (id) {
    this.props.navigator.push({
      name: 'Post page',
      component: Post,
      passProps: {
        postId: id
      }
    });
  }
})

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading: {
    fontSize: 36
  },
  mainContainer: {
    flex: 1,
    margin: 8,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  rightContainer: {
    flex: 1
  },
  bottomContainer: {
    flex: 1,
    marginBottom: 12,
    flexDirection: 'row',
  },
  bottom: {
    color: '#777',
    fontSize: 14,
    marginRight: 4,
  },
  name: {
    color: '#555',
    fontSize: 14,
    marginRight: 4,
  },
  avatar: {
    width: 50,
    height: 50
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    marginLeft: 10,
  },
  listView: {
    backgroundColor: '#f5fdfd',
    paddingTop: 30,
  }
});

export default Timeline;