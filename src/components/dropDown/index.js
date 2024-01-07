import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../constants/Colors';

const data = [
  { label: 'Delhi-DL', value: '1' },
  { label: 'Mumbai-MI', value: '2' },
  { label: 'Chennai-CH', value: '3' }
];

const DropdownComponent = ({ from, flightLocations, setflightLocations }) => {
  const [isFocus, setIsFocus] = useState(false);
  const searchInputRef = useRef(null);

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === flightLocations && (
          <Feather name='check-circle' size={30} color={Colors.alertAndStatus.default} />
        )}
      </View>
    );
  };
  const handleDropdownPress = () => {
    setIsFocus(true);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // const handleFromChange = (text) => {
  //   setFlightLocations((prevLocations) => ({ ...prevLocations, from: text }));
  // };

  // const handleToChange = (text) => {
  //   setFlightLocations((prevLocations) => ({ ...prevLocations, to: text }));
  // };

  // function handleDropDownChange(text) {
  //   let activeId = from ? 1 : 2
  //   switch (activeId) {
  //     case 1: return setFlightLocations((prevLocations) => ({ ...prevLocations, to: text }));;
  //     case 2: return setFlightLocations((prevLocations) => ({ ...prevLocations, from: text }));
  //     default:
  //       break;
  //   }
  // }


  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      onPress={handleDropdownPress}
      search
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={`${from ? 'From' : 'Travelling To'}`}
      searchPlaceholder="Search..."
      value={flightLocations}
      onChange={item => {
        setflightLocations(item.value), setIsFocus(false);
      }}
      renderLeftIcon={() => (
        from ?
          <MaterialIcons style={styles.icon} name='flight-takeoff' size={30} color={Colors.alertAndStatus.default} /> :
          <MaterialIcons style={styles.icon} name='flight-land' size={30} color={Colors.alertAndStatus.default} />
      )}
      renderItem={renderItem}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    // margin: 16,
    marginBottom: 12,
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
    height: 50,
    position: 'relative'
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
    color: Colors.grey.default

  },
  placeholderStyle: {
    fontSize: 16,
    color: Colors.grey.default
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Colors.grey.dark

  },
  iconStyle: {
    width: 20,
    height: 20,
    // color: Colors.grey.default

  },
  inputSearchStyle: {
    height: 40,
    color: Colors.grey.default,
    fontSize: 16,
  },
});