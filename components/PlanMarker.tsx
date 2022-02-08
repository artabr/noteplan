import React from 'react';
import { Box, Pressable } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
  id: number;
  x: number;
  y: number;
  absolute?: boolean;
};

const PlanMarker: React.FC<Props> = ({ id, x, y, absolute = true }) => {
  return (
    <Box
      position={absolute ? 'absolute' : 'relative'}
      left={x - 25}
      top={y - 25}
      w="50px"
      h="50px"
    >
      <Pressable>
        {({ isPressed }) => {
          return (
            <Box
              bg={isPressed ? '#2ddb3b' : '#ff0095'}
              borderRadius="full"
              w="50px"
              h="50px"
              justifyContent="center"
              alignItems="center"
            >
              <MaterialCommunityIcons name="map-marker" size={24} />
            </Box>
          );
        }}
      </Pressable>
    </Box>
  );
};

export default PlanMarker;
