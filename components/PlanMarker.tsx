import React from 'react';
import { Box, Icon, Pressable } from 'native-base';
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
      key={id}
      position={absolute ? 'absolute' : 'relative'}
      left={x}
      top={y}
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
            >
              <Icon
                size="50px"
                as={<MaterialCommunityIcons name="map-marker" />}
              />
            </Box>
          );
        }}
      </Pressable>
    </Box>
  );
};

export default PlanMarker;
