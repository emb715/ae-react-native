import { Dimensions, StyleSheet } from 'react-native'
const { width } = Dimensions.get('window')

const styles: any = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: width * 0.9,
    height: width * 0.9,
  },
  backButton: {
    position: 'absolute',
    left: 5,
    top: 5,
  },
  spinner: {
    position: 'absolute',
  },
  detailViewInfo: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    flexDirection: 'column',
  },
  detailViewInfo__author: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  detailViewInfo__camera: {
    fontSize: 20,
    color: '#fff',
  },
  detailView: {
    position: 'absolute',
    bottom: 10,
    width: 120,
    right: 10,
    flexDirection: 'row',
  },
  detailViewImage: {
    width: 50,
    height: 50,
  },
})
export default styles
