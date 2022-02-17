import React, { useRef, useState } from 'react';
import PlanMarker from './PlanMarker';
import { Box, Image } from 'native-base';
import {
  ReactNativeZoomableView,
  ZoomableViewEvent,
} from '@openspacelabs/react-native-zoomable-view';
import { GestureResponderEvent, useWindowDimensions } from 'react-native';
import { Location, PlanMarkerData } from './types';

type Props = {
  planMarkersData: PlanMarkerData[];
  onLocation: (location: Location) => void;
};

const PlanView = ({ planMarkersData, onLocation }: Props) => {
  const [imageWidth, imageHeight] = [2000, 1200];
  const [mapOffset, setMapOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const imageScale = windowWidth / imageWidth;

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
          locationX -
            (originalWidth * zoomLevel - originalWidth) / (2 * zoomLevel)
        ),
        locationY: Math.round(
          locationY -
            (originalHeight * zoomLevel - originalHeight) / (2 * zoomLevel)
        ),
        zoomLevel: Math.round(zoomLevel * 100) / 100,
        absX: Math.round((locationX - mapOffset.x) / imageScale),
        absY: Math.round((locationY - mapOffset.y) / imageScale),
      };
      onLocation(loc);
    } else {
      const loc: Location = {
        locationX: Math.round(locationX),
        locationY: Math.round(locationY),
        zoomLevel: Math.round(zoomLevel * 100) / 100,
        absX: Math.round(
          (originalWidth * zoomLevel - originalWidth) / (2 * zoomLevel) -
            offsetX +
            locationX / zoomLevel
        ),
        absY: Math.round(
          (originalHeight * zoomLevel - originalHeight) / (2 * zoomLevel) -
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
      minZoom={0.001}
      bindToBorders={false}
      onSingleTap={onSingleTap}
    >
      <Box
        w="100%"
        h="100%"
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          setMapOffset({
            x: (width - imageWidth * imageScale) / 2,
            y: (height - imageHeight * imageScale) / 2,
          });
        }}
      >
        <Box w="100%" h="100%">
          {planMarkersData.map((planMarker) => {
            return (
              <PlanMarker
                key={planMarker.id}
                id={planMarker.id}
                x={planMarker.markerX}
                y={planMarker.markerY}
                imageScale={imageScale}
                mapOffset={mapOffset}
              />
            );
          })}
        </Box>
        <Image
          ref={elementRef}
          w="100%"
          h="100%"
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
