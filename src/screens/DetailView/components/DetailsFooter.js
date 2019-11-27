import * as React from 'react'
import {
  TouchableOpacity,
  Image,
  View,
  Text,
} from 'react-native'
import styles from '../styles'
import imageFiltersImage from './images/ImageFilters.png'
import shareImage from './images/ShareThis.png'

type Props = {
  shareCallback: Function,
  colorSwitchCallback: Function,
  pictureDetails: Object,
}

class DetailsFooter extends React.PureComponent<Props> {
  render () {
    const { shareCallback, applyFilterCallback, pictureDetails } = this.props
    if (!pictureDetails) return null
    const imageId = pictureDetails.id
    const { author, camera } = pictureDetails || {};
    return (
      <View>
        <View style={styles.detailViewInfo}>
          <Text style={styles.detailViewInfo__author}>{author}</Text>
          <Text style={styles.detailViewInfo__camera}>{camera}</Text>
        </View>
        <View style={styles.detailView}>
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() => applyFilterCallback()}
          >
            <Image style={styles.detailViewImage}
              resizeMode='cover'
              source={imageFiltersImage} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{alignSelf: 'flex-end'}}
            onPress={() => shareCallback(imageId)}
          >
            <Image style={styles.detailViewImage}
              resizeMode='cover'
              source={shareImage} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default DetailsFooter
