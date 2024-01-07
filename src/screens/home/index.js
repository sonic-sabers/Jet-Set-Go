//Third party imports
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  UIManager,
  Platform,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Feather from 'react-native-vector-icons/Feather';
import { BlurView } from "@react-native-community/blur";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import Animated, { FadeInDown, FadeOut, FadeOutUp } from 'react-native-reanimated'
import BottomSheet from '@gorhom/bottom-sheet'
import { BottomSheetBackdrop } from '@gorhom/bottom-sheet'

//Local imports
import { getflightData } from '../../store/flight/thunk';
import Colors from '../../constants/Colors';
import { isDarkThemeSelector } from '../../store/theme/selector';
import styles from './styles';
import AirlineCard from '../../components/airlineCard';
import { DropdownComponent, HStack } from '../../components';
import { customnTransition } from '../../components/transition';
import { flightDataSelector } from '../../store/flight/selector';

const ActiveButton = ({ isActive }) => {
  return (
    <View style={[isActive ? styles.activeButton : styles.inActiveButton]} >
      {isActive ? <Feather name='check' size={10} color={Colors.white.default} /> : <></>}
    </View>
  )
}
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


const HomeScreen = () => {
  const dispatch = useDispatch();
  const flightDatas = useSelector(flightDataSelector);
  const isDarkTheme = useSelector(isDarkThemeSelector);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [flightFrom, setFlightFrom] = useState('');
  const [flightTo, setFlightTo] = useState('')
  const [data, setData] = useState([]);
  const [bottomFilterActive, setbottomFilterActive] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date("2024-01-08"));

  const [selectedFilter, setSelectedFilter] = useState(0);

  const fetchTrendingData = () => {
    dispatch(getflightData())
  }

  const handleRefetch = () => {
    setLoading(true)
    fetchTrendingData()
    setTimeout(() => {
      setbottomFilterActive(0)
      setSelectedFilter(0)
      setLoading(false)
    }, 400);
  }
  const ref = useRef(null)
  const snapPoints = useMemo(() => ['50%'], [])

  function sortFlightsByFare(flights, isHigh) {
    return flights.slice().sort((flight1, flight2) => {
      if (isHigh) {
        return flight2.fare - flight1.fare;
      }
      return flight1.fare - flight2.fare
    });
  }
  function sortFlightsByAirlineName(flights) {
    return flights.slice().sort((flight1, flight2) => {
      const airlineName1 = flight1.displayData.airlines[0].airlineName.toLowerCase();
      const airlineName2 = flight2.displayData.airlines[0].airlineName.toLowerCase();

      if (airlineName1 < airlineName2) {
        return -1;
      } else if (airlineName1 > airlineName2) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  function convertDurationToMinutes(duration) {
    const [hours, minutes] = duration.split("h").map(value => parseInt(value, 10));
    return hours * 60 + minutes;
  }

  function sortFlightsByTotalDuration(flights) {
    return flights.slice().sort((flight1, flight2) => {
      const duration1 = convertDurationToMinutes(flight1.displayData.totalDuration);
      const duration2 = convertDurationToMinutes(flight2.displayData.totalDuration);

      return duration1 - duration2;
    });
  }
  function filterFlightsByAirline(flights, airlineName) {
    return flights.filter(flight => {
      const airlines = flight.displayData.airlines;
      return airlines.some(airline => airline.airlineName === airlineName);
    });
  }

  function filterFlightsByStopInfo(flights, stopInfoFilter) {
    return flights.filter(flight => flight.displayData.stopInfo === stopInfoFilter);
  }
  // handle first render
  useEffect(() => {
    fetchTrendingData()
  }, []);
  useEffect(() => {
    setData(flightDatas)
  }, [flightDatas]);

  function handleQuickFilter(activeId) {
    setSelectedFilter(0);
    if (activeId !== bottomFilterActive) {
      setbottomFilterActive(activeId)
      switch (activeId) {
        case 1: return setData(filterFlightsByStopInfo(flightDatas, "Non stop"));
        case 2: return setData(filterFlightsByAirline(flightDatas, "Air India"));
        case 3: return setData(filterFlightsByAirline(flightDatas, "JetSpice"));
        default:
          break;
      }
    }
    else {
      setData(flightDatas), setbottomFilterActive(0)
      return
    }
  }
  function handleDropFilter(activeId) {
    setbottomFilterActive(0)
    setSelectedFilter(activeId);
    setVisible(false);
    switch (activeId) {
      case 1: return setData(sortFlightsByAirlineName(flightDatas));
      case 2: return setData(sortFlightsByFare(flightDatas, isHigh = false));
      case 3: return setData(sortFlightsByFare(flightDatas, isHigh = true));
      case 4: return setData(sortFlightsByTotalDuration(data));
      case 5: return setData(flightDatas);
      default:
        break;
    }

  }
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    []
  )

  const renderItem = (data) => {
    return (
      <Animated.View
        sharedTransitionStyle={customnTransition}
        entering={FadeInDown.duration(300)} exiting={FadeOutUp.duration(300)} >
        <AirlineCard data={data} />
      </Animated.View>
    )
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkTheme
            ? Colors.black.default
            : Colors.white.default,
        },
      ]}>
      <View style={[visible || Keyboard.isVisible() ? { display: 'none' } : styles.blurContainer]}>
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={2}
          reducedTransparencyFallbackColor="#000"
        />

        <HStack style={{}}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} >
            <HStack style={{ margin: 8 }}>
              <TouchableOpacity onPress={
                () =>
                  handleQuickFilter(1)}
                style={styles.bottomButton}>
                <Text
                  style={styles.bottomButtonText}>
                  Non Stop
                </Text>
                {bottomFilterActive === 1 ? <ActiveButton isActive /> : <ActiveButton />}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={
                  () =>
                    handleQuickFilter(2)}
                style={styles.bottomButton}>
                <Text
                  style={styles.bottomButtonText}>
                  Air India
                </Text>
                {bottomFilterActive === 2 ? <ActiveButton isActive /> : <ActiveButton />}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={
                  () =>
                    handleQuickFilter(3)}
                style={styles.bottomButton}>
                <Text
                  style={styles.bottomButtonText}>
                  Spice Jet
                </Text>
                {bottomFilterActive === 3 ? <ActiveButton isActive /> : <ActiveButton />}
              </TouchableOpacity>

            </HStack>
          </ScrollView>
          <Pressable
            style={styles.filterButton}
            onPress={() => {
              setVisible(true);
            }}>
            <Text
              style={styles.filterButtonText}>
              Filters
            </Text>
          </Pressable>
        </HStack>

      </View>
      <FlatList
        style={styles.flatlist}
        contentContainerStyle={styles.flatListContent}
        data={data}
        refreshing={loading}
        onRefresh={handleRefetch}
        keyExtractor={(item, index) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={<>
          <View style={{ width: '100%', marginBottom: 10 }}>
            <DropdownComponent from flightLocations={flightFrom} setflightLocations={setFlightFrom} />
            <DropdownComponent flightLocations={flightTo} setflightLocations={setFlightTo} />
            <HorizontalDatepicker
              mode="gregorian"
              startDate={new Date("2024-01-08")}
              endDate={new Date("2024-01-15")}
              initialSelectedDate={selectedDate}
              onSelectedDateChange={(date) => setSelectedDate(date.toDateString())}
              selectedItemWidth={150}
              unselectedItemWidth={38}
              itemHeight={38}
              itemRadius={10}
              selectedItemTextStyle={styles.selectedItemTextStyle}
              unselectedItemTextStyle={styles.selectedItemTextStyle}
              selectedItemBackgroundColor="#222831"
              unselectedItemBackgroundColor="#ececec"
              flatListContainerStyle={{ backgroundColor: Colors.white.default, marginLeft: -10 }}
            />
            {(flightFrom || flightTo) ? <></> :
              <Animated.View
                sharedTransitionStyle={customnTransition}
                entering={FadeInDown.duration(300)} exiting={FadeOut.duration(300)} >
                <Text
                  style={styles.trendingFlightText}>
                  Trending Flights
                </Text>
              </Animated.View>
            }
          </View>
        </>}
        ListEmptyComponent={() => (
          loading ? <ActivityIndicator
            size={26}
            color={isDarkTheme ? Colors.white.default : Colors.black.default}
          />
            : <></>
        )}
        onEndReachedThreshold={0.2}
      />
      {/* <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={[
          styles.spinnerTextStyle,
          { color: isDarkTheme ? Colors.white.default : Colors.black.default },
        ]}
      /> */}

      {visible &&
        <BottomSheet
          ref={ref}
          backdropComponent={renderBackdrop}

          style={styles.bottomSheetContainer}
          index={visible ? 0 : -1}
          enablePanDownToClose
          snapPoints={snapPoints}
          onClose={() => {
            if (ref) {
              setVisible(!visible);
            }
          }}>

          <View
            style={styles.childContainer}>
            <TouchableOpacity
              style={styles.modalContent}
              onPress={() => handleDropFilter(1)}>

              <Text style={styles.filterFont}> Sort By Name</Text>
              {selectedFilter === 1 ? <ActiveButton isActive /> : <ActiveButton />}

            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalContent}
              onPress={() => handleDropFilter(2)}>

              <Text style={styles.filterFont}>
                Low to High Price
              </Text>
              {selectedFilter === 2 ? <ActiveButton isActive /> : <ActiveButton />}

            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalContent}
              onPress={() => handleDropFilter(3)}>
              <Text style={styles.filterFont}>
                Hight to Low Price
              </Text>
              {selectedFilter === 3 ? <ActiveButton isActive /> : <ActiveButton />}

            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalContent}
              onPress={() => handleDropFilter(4)}>
              <Text style={styles.filterFont}>
                Sort By Total Duration
              </Text>
              {selectedFilter === 4 ? <ActiveButton isActive /> : <ActiveButton />}

            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalContent}
              onPress={() => handleDropFilter(5)}>
              <Text style={styles.filterFont}>
                Clear Filters</Text>
            </TouchableOpacity>
          </View>
        </BottomSheet>
      }
    </View >
  );
};


export default HomeScreen;
