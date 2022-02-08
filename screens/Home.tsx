import React, { useState, useRef } from 'react';

import { GestureResponderEvent } from 'react-native';
import { View, Text, Column, Box, Image } from 'native-base';
import {
  ReactNativeZoomableView,
  ZoomableViewEvent,
} from '@openspacelabs/react-native-zoomable-view';
import { SelectPlan, PlanMarker } from '../components';

import { planMarkers } from '../config/mockData';

const Home = () => {
  const elementRef = useRef();

  const onSingleTap = (
    event: GestureResponderEvent,
    zoomableViewEventObject: ZoomableViewEvent
  ): void => {
    const frameNodeID = elementRef.current._nativeTag;
    const { target, locationX, locationY } = event.nativeEvent;
    const { zoomLevel, offsetX, offsetY, originalHeight, originalWidth } =
      zoomableViewEventObject;

    if (frameNodeID === target) {
      setLocation({
        locationX: Math.round(
          locationX - (2000 * zoomLevel - originalWidth) / (2 * zoomLevel)
        ),
        locationY: Math.round(
          locationY - (1200 * zoomLevel - originalHeight) / (2 * zoomLevel)
        ),
        zoomLevel,
        absX: locationX,
        absY: locationY,
      });
    } else {
      setLocation({
        locationX,
        locationY,
        zoomLevel,
        absX: Math.round(
          (2000 * zoomLevel - originalWidth) / (2 * zoomLevel) -
            offsetX +
            locationX / zoomLevel
        ),
        absY: Math.round(
          (1200 * zoomLevel - originalHeight) / (2 * zoomLevel) -
            offsetY +
            locationY / zoomLevel
        ),
      });
    }
  };

  interface Location {
    locationX: number;
    locationY: number;
    zoomLevel: number;
    absX?: number;
    absY?: number;
  }

  const [location, setLocation] = useState<Location>({
    locationX: 0,
    locationY: 0,
    zoomLevel: 0,
    absX: 0,
    absY: 0,
  });

  const isActivePlan = true;
  return (
    <Column flex="1">
      {!isActivePlan && (
        <View flex="1" justifyContent="center" alignItems="center">
          <Text>There are no plans yet.</Text>
        </View>
      )}
      <View flex="1" justifyContent="center" alignItems="center">
        <View flexShrink="1" w="100%" h="100%">
          <ReactNativeZoomableView
            maxZoom={30}
            onSingleTap={onSingleTap}
            contentWidth={2000}
            contentHeight={1200}
          >
            <Box w="2000px" h="1200px">
              <Box w="2000px" h="1200px">
                {planMarkers.map((planMarker) => {
                  return (
                    <PlanMarker
                      key={planMarker.id}
                      id={planMarker.id}
                      x={planMarker.markerX}
                      y={planMarker.markerY}
                    />
                  );
                })}
              </Box>
              <Image
                ref={elementRef}
                w="2000px"
                h="1200px"
                position="absolute"
                zIndex="-1"
                resizeMode="contain"
                alt="The current working plan"
                source={{
                  uri: 'https://i.ibb.co/xqT5726/pixelgrid.png',
                }}
              />
            </Box>
          </ReactNativeZoomableView>
        </View>
      </View>
      <Text>
        {`Local locationX: ${location.locationX} Local locationY: ${location.locationY} zoomLevel: ${location.zoomLevel} 
        Absolute locationX: ${location.absX} Absolute locationY: ${location.absY}`}
      </Text>
      <Box p="5">
        <SelectPlan defaultValue="Choose or create a plan" />
      </Box>
    </Column>
  );
};

export default Home;
