import React, { useState } from 'react';
import { Select, Box, CheckIcon, Center } from 'native-base';

type Props = {
  defaultValue?: string;
};

const SelectPlan = ({ defaultValue }: Props) => {
  const [selectedPlan, setSelectedPlan] = useState('');

  return (
    <Center>
      <Box w="3/4" maxW="300">
        <Select
          selectedValue={selectedPlan}
          minWidth="200"
          accessibilityLabel="Choose a plan to work with"
          placeholder="Choose a plan to work with"
          _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={(itemValue) => setSelectedPlan(itemValue)}
          defaultValue={defaultValue}
        >
          <Select.Item label="Create a new plan..." value="ux" />
          <Select.Item label="Test plan" value="web" />
          <Select.Item label="Other plan" value="cross" />
        </Select>
      </Box>
    </Center>
  );
};

export default SelectPlan;
