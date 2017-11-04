import React from 'react'
import { StyleSheet, Text, View, NavigatorIOS, FlatList, Image, TouchableHighlight } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.getLatestPosts()
  }

  getLatestPosts = () => {
    fetch('https://api.reddit.com/r/pics')
      .then((response) => {
        return response.json()
      })
      .then((result)=>{
        this.props.getPosts(result.data.children)
      })
  }

  getImages = (item) => {
    if (item.data.thumbnail === 'self' || item.data.thumbnail === 'nsfw') {
      return {uri:'http://via.placeholder.com/50x50'}
    } else {
      return {uri:item.data.thumbnail}
    }
  }

  renderItems = (item) => {
    // return <ListItem
    //   containerStyle={styles.listItem}
    //   title={item.data.title}
    //   avatar={{uri:item.data.thumbnail}}
    //   rightTitle='hello-world'
    //   subtitle={
    //     <View style={styles.subtitle}>
    //       <Text>{item.data.author}</Text>
    //       <Text>{item.data.score}</Text>
    //       <Text>{item.data.num_comments}</Text>
    //     </View>
    //   }
    // />

    // {uri:item.data.thumbnail}

    return <View style={styles.post}>
        <View style={styles.postHero}>
          <View style={styles.imageStyle}>
            <Image style={styles.imageSize} source={this.getImages(item)}/>
          </View>
          <View style={styles.titleStyle}>
            <Text style={styles.titleText}>{item.data.title}</Text>
          </View>
        </View>
        <View style={styles.postInfo}>
          <Text>{item.data.author}</Text>
          <Text>{item.data.score}</Text>
          <Text>{item.data.num_comments}</Text>
        </View>
        <View style={styles.dateStyle}>
          <Text style={styles.date}>13 Oct 2017</Text>
        </View>
      </View>
  }

  render() {
    return (
        <FlatList
          data={this.props.posts}
          renderItem={({item}) => this.renderItems(item)}
          keyExtractor={(item, index) => item.data.id}
        />
    );
  }
}

const styles = StyleSheet.create({
  post: {
    display: 'flex',
    flexDirection: 'column',
  },
  postHero: {
    display: 'flex',
    flexDirection: 'row',
    margin: 5,
  },
  imageStyle: {
    flex: 1,
  },
  imageSize: {
    width: 50,
    height: 50,
  },
  titleStyle: {
    flex: 5,
  },
  titleText: {
    fontSize: 16,
  },
  postInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dateStyle: {
    position: 'absolute',
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
