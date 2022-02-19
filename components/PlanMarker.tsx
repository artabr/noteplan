import React, { useState } from 'react';
import { Button, Popover, Box, Pressable, Text } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ZoomableExtents } from './types';

import { markersAtom } from '../state/atoms';
import { useAtom } from 'jotai';

type Props = {
  id: number;
  x: number;
  y: number;
  absolute?: boolean;
  zoomableExtents: ZoomableExtents;
};

const PlanMarker: React.FC<Props> = ({
  id,
  x,
  y,
  absolute = true,
  zoomableExtents,
}) => {
  const [show, setShow] = useState(false);
  const [, setPlanMarkersData] = useAtom(markersAtom);

  const deleteMarker = (markerID: number) => {
    setPlanMarkersData((data) =>
      data.filter((planMarker) => planMarker.id !== markerID)
    );
  };

  const iconSize = 50 * zoomableExtents.scale + 'px';

  return (
    <Box
      position={absolute ? 'absolute' : 'relative'}
      left={(x - 25) * zoomableExtents.scale + zoomableExtents.offsetX}
      top={(y - 25) * zoomableExtents.scale + zoomableExtents.offsetY}
      w={iconSize}
      h={iconSize}
    >
      <Popover
        isOpen={show}
        onClose={setShow}
        trigger={(triggerProps) => {
          return (
            <Pressable {...triggerProps} onPress={() => setShow(!show)}>
              {({ isPressed }) => {
                return (
                  <Box
                    bg={isPressed ? '#2ddb3b' : '#ff0095'}
                    borderRadius="full"
                    w={iconSize}
                    h={iconSize}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <MaterialCommunityIcons
                      name="map-marker"
                      size={24 * zoomableExtents.scale}
                    />
                  </Box>
                );
              }}
            </Pressable>
          );
        }}
      >
        <Popover.Content accessibilityLabel="Plan marker information" w="56">
          <Popover.Arrow />
          <Popover.Header>Marker Info</Popover.Header>
          <Popover.Body>
            <Text>ID: {id}</Text>
            <Text>X: {x}</Text>
            <Text>Y: {y}</Text>
          </Popover.Body>
          <Popover.Footer justifyContent="flex-end">
            <Button.Group space={2}>
              <Button
                colorScheme="coolGray"
                onPress={() => setShow(!show)}
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                colorScheme="danger"
                onPress={() => {
                  deleteMarker(id);
                }}
              >
                Delete
              </Button>
            </Button.Group>
          </Popover.Footer>
        </Popover.Content>
      </Popover>
    </Box>
  );
};

export default PlanMarker;
