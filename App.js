import React from 'react';
import { StyleSheet, Text, View, NavigatorIOS } from 'react-native';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import reducer from './reducers/reducer';

import PostsList from './src/posts-list';

const store = createStore(
  reducer,
  applyMiddleware(logger),
);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NavigatorIOS
          style={styles.container}
          initialRoute={{
            title: 'Latest Reddit Pics',
            component: PostsList,
          }}/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
  },
});


export default App;
