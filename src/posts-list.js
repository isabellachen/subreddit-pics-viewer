import React from 'react';
import { StyleSheet, Text, View, NavigatorIOS } from 'react-native';
import { connect } from 'react-redux';

class PostsList extends React.Component {
  getLatestPosts = () => {
    fetch('https://api.reddit.com/r/pics')
      .then((response) => {
        return response.json();
      })
      .then((result)=>{
        this.props.getPosts(result.data.children)
        return 'success'
        // console.log(jsonRes.data.children[0]);
      })
      .then((result) => {
        console.log(result)
      })
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text>Hello World</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => ({
  posts: state.posts,
})

const mapDispatchToProps = (dispatch) => ({
  getPosts: (posts) => dispatch({
    type: 'GET_POSTS',
    posts: posts,
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);
