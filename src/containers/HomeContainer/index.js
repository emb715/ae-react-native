// @flow
import * as React from 'react'
import { Platform, StatusBar } from 'react-native'
import { connect } from 'react-redux'

import HomeView from '../../screens/Home'
import { fetchPictures } from './actions'

export interface Props {
  navigation: any,
  fetchPictures: Function,
  pictures: Array<Object>,
  isLoading: boolean,
}

export interface State {}

class HomeContainer extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Gallery App',
    headerStyle: {
      backgroundColor: '#3e62ad',
    },
    headerTintColor: '#fff',
  }

  constructor (props) {
    super(props)
    StatusBar.setBarStyle('light-content')
    Platform.OS === 'android' && StatusBar.setBackgroundColor('#000')
    this.onRefresh = this.onRefresh.bind(this)
    this.onLoadNext = this.onLoadNext.bind(this)
  }

  componentDidMount () {
    this.onRefresh()
  }

  onRefresh (): void {
    this.props.fetchPictures(1)
  }

  onLoadNext (): void {
    const { fetchPictures, page, hasMore } = this.props;
    if (hasMore) {
    const nextPage = page + 1;
    fetchPictures(nextPage);
    }
  }

  render () {
    return <HomeView {...this.props}
      onRefresh={this.onRefresh}
      onLoadNext={this.onLoadNext} />
  }
}

function bindAction (dispatch) {
  return {
    fetchPictures: page => dispatch(fetchPictures(page)),
  }
}

const mapStateToProps = state => ({
  pictures: state.homeReducer.pictures,
  page: state.homeReducer.page,
  isLoading: state.homeReducer.isLoading,
  hasMore: state.homeReducer.hasMore,
})

export default connect(mapStateToProps, bindAction)(HomeContainer)
