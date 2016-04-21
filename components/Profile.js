import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  ScrollView,
  RefreshControl,
} from 'react-native';

const styles = StyleSheet.create({
  avatar: { width: 200, height: 200 },
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: undefined,
        username: undefined,
        name: undefined,
        avatar_url: undefined,
        description: undefined,
        is_active: undefined,
        label: undefined,
        reputation: undefined,
        created_at: undefined,
        updated_at: undefined,
      },
    };
  }
  _renderProfile() {
    return (
      <View>
        <Image src={this.state.avatar_url}
          style={styles.avatar}
        />
        <View>
          <Text>姓名：</Text>
          <Text>{this.state.user.name}</Text>
        </View>
        <View>
          <Text>用户名：</Text>
          <Text>{this.state.user.username}</Text>
        </View>
      </View>
    );
  }
  _renderTopics() {
    return (
      <ListView />
    );
  }
  _fetchUserProfile() {
  }
  _fetchUserTopics() {
  }
  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._fetchUserProfile}
            tintColor="#ff0000"
            title="Loading..."
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
        }
      >
        {this._renderProfile()}
        {this._renderTopics()}
      </ScrollView>
    );
  }
}

export default Profile;
