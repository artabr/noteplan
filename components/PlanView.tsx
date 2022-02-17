import React, { useRef } from 'react';
import PlanMarker from './PlanMarker';
import { Box, Image } from 'native-base';
import {
  ReactNativeZoomableView,
  ZoomableViewEvent,
} from '@openspacelabs/react-native-zoomable-view';
import { GestureResponderEvent } from 'react-native';
import { Location, PlanMarkerData } from './types';

type Props = {
  planMarkersData: PlanMarkerData[];
  onLocation: (location: Location) => void;
};

const PlanView = ({ planMarkersData, onLocation }: Props) => {
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
      const loc: Location = {
        locationX: Math.round(
          locationX - (2000 * zoomLevel - originalWidth) / (2 * zoomLevel)
        ),
        locationY: Math.round(
          locationY - (1200 * zoomLevel - originalHeight) / (2 * zoomLevel)
        ),
        zoomLevel: Math.round(zoomLevel * 100) / 100,
        absX: Math.round(locationX),
        absY: Math.round(locationY),
      };
      onLocation(loc);
    } else {
      const loc: Location = {
        locationX: Math.round(locationX),
        locationY: Math.round(locationY),
        zoomLevel: Math.round(zoomLevel * 100) / 100,
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
      };
      onLocation(loc);
    }
  };

  return (
    <ReactNativeZoomableView
      maxZoom={30}
      onSingleTap={onSingleTap}
      contentWidth={2000}
      contentHeight={1200}
    >
      <Box w="2000px" h="1200px">
        <Box w="2000px" h="1200px">
          {planMarkersData.map((planMarker) => {
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
  );
};

export default PlanView;
