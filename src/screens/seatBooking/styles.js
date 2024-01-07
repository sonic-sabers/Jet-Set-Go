import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  flightText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Roboto',
    color: Colors.grey.light2
  },
  flightNumber: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    color: Colors.grey.light2,
    marginLeft: 4,
    marginTop: 4
  },
  flightImage: {
    height: 50,
    width: 50,
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    right: 0,
    marginTop: -28,
    marginRight: -8,
    zIndex: 300,
  },
  flightDate: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Roboto',
    color: Colors.grey.grey47,
    marginBottom: 8
  },
  flightSourceAddress: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Roboto',
    color: Colors.black.default
  },
  flightSourceTime: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Roboto',
    color: Colors.black.default
  },
  airportName: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    color: Colors.grey.grey47
  },
  airportTerminal: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    color: Colors.grey.grey47
  },
  viewBreakup: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.alertAndStatus.infoText,
    marginTop: -4
  },
  continueBottonContainer: {
    backgroundColor: Colors.alertAndStatus.filterBlack,
    borderRadius: 8,
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  continueButton: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.white.default
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000'
  },
  flexOne: { flex: 1, backgroundColor: Colors.white.white1, },
  imageContainer: { height: 24, width: 24, borderRadius: 4, },
  container: {
    marginHorizontal: 12,
    marginTop: 12,
    // width: screen.width - 24,
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    zIndex: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: 'white',
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  stopInfo: {
    fontSize: 12,
    fontWeight: '300',
    fontFamily: 'Roboto',
    color: Colors.grey.dark1,
  },
  totalDuration: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Roboto',
    color: Colors.grey.dark1,
  }, seatContainer: {
    marginVertical: 20,
  },
  containerGap20: {
    gap: 20,
  },
  seatRow: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
  },
  seatIcon: {
    fontSize: 24,
    color: Colors.grey.light1,
  },
  seatRadioContainer: {
    flexDirection: 'row',
    marginTop: 36,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  leftParam: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    color: Colors.grey.dark5

  },
  rightParam: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    color: Colors.grey.grey47,

  },
  freeText: {
    fontSize: 10,
    fontWeight: '400',
    fontFamily: 'Roboto',
    color: Colors.alertAndStatus.successDark,
    marginLeft: 4
  },
  headerTitle:{
    fontSize: 20,
    fontWeight: '600',
    color: 'rgb(26, 26, 26)',
    marginBottom: 8
  },
  finalText: { fontSize: 17, fontWeight: '700', },
  priceDivider: { width: '100%', marginBottom: 8, borderColor: Colors.grey.light, borderStyle: 'dashed', borderWidth: 0.5, borderBottomWidth: 0 }
})