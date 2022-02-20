import React, { useRef, useState } from 'react';
import PlanMarker from './PlanMarker';
import { Box, Image } from 'native-base';
import {
  ReactNativeZoomableView,
  ZoomableViewEvent,
} from '@openspacelabs/react-native-zoomable-view';
import { GestureResponderEvent, LayoutChangeEvent } from 'react-native';
import { Location, PlanMarkerData, ZoomableExtents } from './types';
import { markersByPlanIDAtom } from '../state/atoms';
import { useAtom } from 'jotai';

type Props = {
  planMarkersData: PlanMarkerData[];
  onLocation: (location: Location) => void;
};

const PlanView = ({ planMarkersData, onLocation }: Props) => {
  const [imageWidth, imageHeight] = [2000, 1200];
  const [zoomableExtents, setZoomableExtents] = useState<ZoomableExtents>({
    width: 0,
    height: 0,
    offsetX: 0,
    offsetY: 0,
    scale: 0,
  });
  const [planMarkers, setPlanMarkers] = useAtom(markersByPlanIDAtom);

  const elementRef = useRef();

  const onSingleTap = (
    event: GestureResponderEvent,
    zoomableViewEventObject: ZoomableViewEvent
  ): void => {
    // @ts-ignore
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
        absX: Math.round(
          (locationX - zoomableExtents.offsetX) / zoomableExtents.scale
        ),
        absY: Math.round(
          (locationY - zoomableExtents.offsetY) / zoomableExtents.scale
        ),
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

  const onZoomableLayout = (event: LayoutChangeEvent): void => {
    const { width, height } = event.nativeEvent.layout;
    let scale = 0;

    if ((width / imageWidth) * imageHeight <= height) {
      // The scaled image is limited to the width of the zoomable view.
      scale = width / imageWidth;
    } else {
      // The scaled image is limited to the height of the zoomable view.
      scale = height / imageHeight;
    }

    setZoomableExtents({
      width,
      height,
      offsetX: (width - imageWidth * scale) / 2,
      offsetY: (height - imageHeight * scale) / 2,
      scale,
    });
  };

  return (
    <ReactNativeZoomableView
      maxZoom={30}
      minZoom={0.001}
      bindToBorders={false}
      onSingleTap={onSingleTap}
    >
      <Box w="100%" h="100%" onLayout={onZoomableLayout}>
        <Box w="100%" h="100%">
          {planMarkers.map((planMarker) => {
            return (
              <PlanMarker
                key={planMarker.id}
                planMarkerData={planMarker}
                zoomableExtents={zoomableExtents}
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
