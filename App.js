import React from 'react';
import { StyleSheet, Text, View, NavigatorIOS } from 'react-native';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import reducer from './reducers/reducer';

import Dashboard from './src/dashboard';

const store = createStore(
  reducer,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
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
            component: Dashboard,
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
