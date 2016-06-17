import React, { Component } from 'react';
import {
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
import { TabBarItemIOS } from 'react-native-vector-icons/FontAwesome';

import { TIMELINE_URL, HOME_URL, DEFAULT_AVATAR } from '../config';
import Topic from './Topic';
import Login from '../components/Login';

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
    alignItems: 'center',
  },
  loading: {
    fontSize: 36,
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
    flex: 1,
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
    height: 50,
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    marginLeft: 10,
  },
  listView: {
    backgroundColor: '#f5fdfd',
    paddingTop: 30,
  },
});

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      data: new ListView.DataSource({
        rowHasChanged(row1, row2) { return row1 !== row2; },
      }),
      selectedTab: 'home',
      cursor: null,
    };
    this.renderTopic = this.renderTopic.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.fetchAllData = this.fetchAllData.bind(this);
    this.fetchHomeData = this.fetchHomeData.bind(this);
  }
  componentDidMount() {
    this.fetchData(TIMELINE_URL);
  }
  jumpTo(id) {
    this.props.navigator.push({
      name: 'Topic page',
      component: Topic,
      passProps: {
        topicId: id,
      },
    });
  }
  fetchData(apiUrl) {
    this.setState({ isRefreshing: true });
    return fetch(apiUrl)
      .then(rsp => rsp.json())
      .then(data => { this.handleRsp(data); console.log(data); })
      .catch(
        error =>
          this.setState({
            isLoading: false,
            message: `Something bad happened ${error}`,
          })
      )
      .then(() => {
        this.setState({
          isRefreshing: false,
        });
      });
  }
  fetchAllData() {
    return this.fetchData(TIMELINE_URL);
  }
  fetchHomeData() {
    return this.fetchData(HOME_URL);
  }
  handleRsp(rsp) {
    console.log(rsp);
    this.setState({
      data: this.state.data.cloneWithRows(rsp.data),
      cursor: true,
    });
  }
  renderList(tab) {
    let fetcher;
    if (tab === 'all') {
      fetcher = this.fetchAllData;
    } else if (tab === 'home') {
      fetcher = this.fetchHomeData;
    }
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={fetcher}
            tintColor="#ff0000"
            title="Loading..."
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
        }
      >
        {
          this.state.cursor &&
            <ListView
              style={styles.listView}
              dataSource={this.state.data}
              renderRow={this.renderTopic}
            />
            || this.renderLoadingView()
        }
      </ScrollView>
    );
  }
  renderLoadingView() {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loading}>Loading ....</Text>
      </View>
    );
  }
  renderTopic(topic) {
    return (
      <TouchableHighlight
        onDelayColor="#dddddd"
        onPress={() => this.jumpTo(topic.id)}
      >
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            <Image
              style={styles.avatar}
              source={topic.user.avatar_url
                  && { uri: `https:${topic.user.avatar_url}` }
                  || DEFAULT_AVATAR}
            />
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{topic.title}</Text>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.name}>{topic.user.name || topic.user.username}</Text>
            <Text style={styles.bottom}>{topic.view_count} views</Text>
            <Text style={styles.bottom}>{topic.comment_count} replies</Text>
            <Text style={styles.bottom}>{topic.like_count} likes</Text>
            <Text style={styles.bottom}>{topic.created_at}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
  renderAll() {
    return this.renderList('all');
  }
  renderHome() {
    return this.renderList('home');
  }
  renderTab() {
    return (
      <TabBarIOS
        tintColor="blue"
        barTintColor="white"
      >
        <TabBarItemIOS
          title="Home"
          iconName="home"
          selected={this.state.selectedTab === 'home'}
          onPress={() => {
            this.setState({
              selectedTab: 'home',
            });
          }}
        >
          {this.renderHome()}
        </TabBarItemIOS>
        <TabBarItemIOS
          title="All"
          iconName="compass"
          selected={this.state.selectedTab === 'all'}
          onPress={() => {
            this.setState({
              selectedTab: 'all',
            });
          }}
        >
          {this.renderAll()}
        </TabBarItemIOS>
        <TabBarItemIOS
          title="Me"
          iconName="user"
          selected={this.state.selectedTab === 'me'}
          onPress={() => {
            this.setState({
              selectedTab: 'me',
            });
          }}
        >
          {this.renderLogin()}
        </TabBarItemIOS>
      </TabBarIOS>);
  }
  renderLogin() {
    return (
      <Login />
    );
  }
  render() {
    return this.renderTab();
  }
}

Timeline.propTypes = {
  navigator: React.PropTypes.object,
};

export default Timeline;
