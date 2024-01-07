import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: { backgroundColor: '#121212', flex: 1 },
  header: {
    fontSize: 18,
    color: Colors.black.default,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  flatlist: { flex: 1 },
  flatListContent: {
    padding: 16,
    paddingBottom: 100
  },
  switchView: {
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingRight: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  blurContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 4,
    margin: 12,
    zIndex: 500,
    borderRadius: 8,
    overflow: 'hidden',
    // borderWidth: 0.5,
    // borderColor: Colors.black.transparestDark,
    backgroundColor: '#151e2b80',
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    height: 64
  },
  bottomButton: {
    height: 44,
    paddingHorizontal: 16,
    backgroundColor: Colors.black.transparestDark,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    flexDirection: 'row'
  },
  bottomButtonText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Roboto',
    color: Colors.white.default,
  },
  filterButton: {
    height: 60,
    paddingHorizontal: 12,
    backgroundColor: Colors.alertAndStatus.filterBlack,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Roboto',
    color: Colors.white.default
  },
  activeButton: {
    height: 15,
    width: 15,
    borderRadius: 40,
    backgroundColor: Colors.alertAndStatus.infoText,
    marginBottom: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute",
    top: 0,
    right: 0,
    margin: 4,
    marginLeft: 10
  },
  inActiveButton: {
    borderRadius: 10,
    marginBottom: 8,
    alignSelf: 'center',
  },
  modalParentContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  modalContent: {
    width: '100%',
    height: 50,
    borderBottomWidth: 0.5,
    // justifyContent: 'center',
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.grey.default,
  },
  childContainer: {
    // marginTop: '70%',
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: 10,
  },
  filterFont: { fontSize: 18, color: '#000' },
  bottomSheetContainer: {
    zIndex: 601,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  trendingFlightText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000'
  },

  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default styles;
