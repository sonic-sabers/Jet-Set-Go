import { StyleSheet, } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grey.light2,
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
  },
  airlineName: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'Roboto',
    color: Colors.grey.dark1
  },
  airlineNumber: {
    fontSize: 8,
    fontWeight: '600',
    fontFamily: 'Roboto',
    color: Colors.grey.dark
  },

  cityName: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Roboto',
    color: Colors.grey.dark1,
  },
  dividerContainer: {
    borderWidth: 0.8,
    borderColor: Colors.alertAndStatus.success,
    borderRadius: 10,
    marginVertical: 4,
    width: 60
  },
  dividerBadge: {
    backgroundColor: Colors.pink.light, width: 8,
    height: 8,
    borderRadius: 8,
    position: 'absolute',
    left: 25,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  innderDivider: {
    borderRadius: 8,
    backgroundColor: Colors.white.default,
    height: 5, width: 5,
    alignSelf: 'center'
  },
  flightTime: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Roboto',
    color: Colors.black.default,
    opacity: 0.7
  },
  flightFare: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Roboto',
    color: Colors.black.default,
  },
  imageContainer: { height: 24, width: 24, borderRadius: 4, },
  stopInfo: {
    fontSize: 8,
    fontWeight: '300',
    fontFamily: 'Roboto',
    color: Colors.grey.dark1,
  },
  totalDuration: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Roboto',
    color: Colors.grey.dark1,
  },

})