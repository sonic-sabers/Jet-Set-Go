
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { BlurView } from "@react-native-community/blur";
import FastImage from 'react-native-fast-image'

import { AIR_INDIA_LOGO } from '../../constants';
import { HStack } from '../../components';
import Colors from '../../constants/Colors';

const Trending = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const searchRef = useRef();
  const [oldData, setOldData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(0);
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(response => {
        console.log(response);
        setData(response);
        setOldData(response);
      });
  }, []);
  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text !== '') {
      let tempData = data.filter(item => {
        return item.title.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(oldData);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          height: 70,
          marginTop: 20,

          justifyContent: 'space-between',
        }}>
        <View
          style={{
            width: '80%',
            height: 50,
            borderRadius: 10,
            borderWidth: 0.2,

            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 15,
          }}>

          <TextInput
            ref={searchRef}
            placeholder="search item here..."
            style={{ width: '76%', height: 50 }}
            value={search}
            onChangeText={txt => {
              searchFilterFunction(txt);
              setSearch(txt);
            }}
          />
          {search == '' ? null : (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => {
                searchRef.current.clear();
                searchFilterFunction('');
                setSearch('');
              }}>

              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '400',
                  fontFamily: 'Roboto',
                  color: '#000'
                }}>
                Search
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={{
            marginRight: 15,
          }}
          onPress={() => {
            setVisible(true);
          }}>

          <Text
            style={{
              fontSize: 20,
              fontWeight: '400',
              fontFamily: 'Roboto',
              color: '#000'
            }}>
            filter
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={2}
          reducedTransparencyFallbackColor="#000"
        />
        <HStack style={{}}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} >
            <HStack style={{ margin: 8 }}>
              <TouchableOpacity onPress={null} style={{
                height: 44,
                paddingHorizontal: 16,
                backgroundColor: Colors.black.transparestDark,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    fontFamily: 'Roboto',
                    color: Colors.white.default
                  }}>
                  Non Stop
                </Text>
              </TouchableOpacity>
          
              <TouchableOpacity onPress={null} style={{
                height: 44,
                paddingHorizontal: 16,
                backgroundColor: Colors.black.transparestDark,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 8

              }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    fontFamily: 'Roboto',
                    color: Colors.white.default,
                  }}>
                  Air India
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={null} style={{
                height: 44,
                paddingHorizontal: 16,
                backgroundColor: Colors.black.transparestDark,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 8

              }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    fontFamily: 'Roboto',
                    color: Colors.white.default
                  }}>
                  Spice Jet
                </Text>
              </TouchableOpacity>

            </HStack>
          </ScrollView>
          <Pressable
            style={{
              height: 60,
              paddingHorizontal: 12,
              backgroundColor: Colors.alertAndStatus.filterBlack,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              setVisible(true);
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                fontFamily: 'Roboto',
                color: Colors.white.default
              }}>
              Filters
            </Text>
          </Pressable>
        </HStack>
      </View>

      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width: '90%',

                borderRadius: 10,
                borderWidth: 0.5,
                alignSelf: 'center',
                marginTop: 20,
                marginBottom: index == data.length - 1 ? 20 : 0,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <FastImage
                source={{ uri: item.image }}
                style={{
                  width: 60,
                  height: '90%',
                  marginLeft: 10,
                  borderRadius: 10,
                }}
              />
              <View style={{ width: '80%' }}>
                <Text
                  style={{ fontWeight: '600', marginLeft: 10, marginTop: 10 }}>
                  {item.title.substring(0, 30)}
                </Text>
                <Text style={{ fontSize: 12, margin: 10 }}>
                  {item.description.substring(0, 50)}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      marginLeft: 10,
                      fontWeight: '800',
                      color: 'green',
                    }}>
                    {'$ ' + item.price}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      marginLeft: 50,
                      fontWeight: '800',
                      color: 'orange',
                    }}>
                    {item.rating.rate}
                  </Text>
                  {/* <Image
                    source={require('./star.png')}
                    style={{width: 12, height: 12, marginLeft: 5}}
                  /> */}
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '400',
                      fontFamily: 'Roboto',
                      color: '#000'
                    }}>
                    star
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,.5)',
          }}>
          <View
            style={{
              width: '80%',
              height: 200,
              borderRadius: 10,
              backgroundColor: '#fff',
            }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                borderBottomWidth: 0.5,
                justifyContent: 'center',
                paddingLeft: 20,
              }}
              onPress={() => {
                setSelectedFilter(1);
                const strAscending = data.sort((a, b) =>
                  a.title > b.title ? 1 : -1,
                );
                setData(strAscending);
                setVisible(false);
              }}>
              <Text style={{ fontSize: 18, color: '#000' }}> Sort By Name</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                borderBottomWidth: 0.5,
                justifyContent: 'center',
                paddingLeft: 20,
              }}
              onPress={() => {
                setSelectedFilter(2);
                setData(data.sort((a, b) => a.price - b.price));
                setVisible(false);
              }}>
              <Text style={{ fontSize: 18, color: '#000' }}>
                Low to High Price
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                borderBottomWidth: 0.5,
                justifyContent: 'center',
                paddingLeft: 20,
              }}
              onPress={() => {
                setSelectedFilter(3);
                setData(data.sort((a, b) => b.price - a.price));
                setVisible(false);
              }}>
              <Text style={{ fontSize: 18, color: '#000' }}>
                Hight to Low Price
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                borderBottomWidth: 0.5,
                justifyContent: 'center',
                paddingLeft: 20,
              }}
              onPress={() => {
                setSelectedFilter(4);
                setData(data.sort((a, b) => b.rating.rate - a.rating.rate));
                setVisible(false);
              }}>
              <Text style={{ fontSize: 18, color: '#000' }}> Sort By Rating</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View >
  );
};

export default Trending;
const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    // alignItems: "center",
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    margin: 12,
    zIndex: 500,
    borderRadius: 8,
    overflow: 'hidden'
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    height: 64
  }
});