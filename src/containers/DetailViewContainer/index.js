// @flow
import * as React from 'react'
import { Share } from 'react-native';
import DetailView from '../../screens/DetailView'
import { connect } from 'react-redux'
import { fetchPictureDetails } from './actions'
import { selectHiResImage } from './selectors'

export interface Props {
  navigation: any,
  fetchPictureDetails: Function,
  isLoading: boolean,
  hiResImage: Function,
}
export interface State {
  imageUrl: string,
}

class DetailViewContainer extends React.Component<Props, State> {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'transparent',
      position: 'absolute',
      height: 50,
      top: 0,
      left: 0,
      right: 0,
      borderBottomWidth: 0,
    },
    headerTintColor: '#FFF',
  }

  componentDidMount () {
    const { navigation, fetchPictureDetails } = this.props
    const { pictureDetails } = navigation.state.params
    if (!this.props.hiResImage(pictureDetails.id)) {
      fetchPictureDetails(pictureDetails.id)
    }
  }

  share = async (imageId: number): void => {
    try {
      const { hiResImage } = this.props;
      const { full_picture, author, camera } = hiResImage(imageId) || {};
      await Share.share({
        title: `Share image from the author: ${author}`,
        message: `This image was taken with a ${camera} camera.`,
        url: full_picture,
      });
    } catch (error) {
			console.log("​Share error", error);
    }
  }

  applyFilter = (type): void => {
    // TODO: implement apply image filter function
  }

  render () {
    let { pictureDetails } = this.props.navigation.state.params
    // const imageURL = pictureDetails.cropped_picture
    const { isLoading, hiResImage } = this.props;
    const { id: imageId } = pictureDetails || {};
    const { full_picture, author, camera } = hiResImage(imageId) || {};
    pictureDetails = {
      ...pictureDetails,
      full_picture,
      author,
      camera,
    };
    const imageURL = pictureDetails.full_picture;
    return <DetailView
      imageUrl={imageURL}
      pictureDetails={pictureDetails}
      shareCallback={this.share}
      isLoading={isLoading}
      applyFilterCallback={this.applyFilter}
    />
  }
}

function bindAction (dispatch) {
  return {
    fetchPictureDetails: imageId => dispatch(fetchPictureDetails(imageId)),
  }
}

const mapStateToProps = state => ({
  hiResImage: imageId => selectHiResImage(state, imageId),
  isLoading: state.detailViewReducer.isLoading,
})

export default connect(mapStateToProps, bindAction)(DetailViewContainer)
