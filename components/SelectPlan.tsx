import React, { useState } from 'react';
import { Select, Box, CheckIcon, Center, Text } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAtom } from 'jotai';
import { getAllPlansAtom } from '../state/atoms';
import { PlanEntity } from '../graphql/types';

type Props = {
  defaultValue?: string;
};

const SelectPlan = ({ defaultValue }: Props) => {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [{ data, error }] = useAtom(getAllPlansAtom);

  if (error) {
    return <Text>Oh no... {error.message}</Text>;
  }

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
          dropdownIcon={
            <MaterialCommunityIcons
              name="chevron-down"
              size={24}
              color="black"
            />
          }
          mt={1}
          onValueChange={(itemValue) => setSelectedPlan(itemValue)}
          defaultValue={defaultValue}
        >
          <Select.Item label="Create a new plan..." value="newplan" />
          {data?.plans.data.map(({ attributes, id }: PlanEntity) => (
            <Select.Item
              key={id}
              label={attributes?.title ? attributes?.title : ''}
              value={id ? id : ''}
            />
          ))}
        </Select>
      </Box>
    </Center>
  );
};

export default SelectPlan;
