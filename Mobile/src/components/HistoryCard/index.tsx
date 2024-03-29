import { HStack, Heading, Text, VStack } from 'native-base';

interface PropsHistory {
  group: string;
  exercise: string;
  hours: string;
}

export function HistoryCard({ group, exercise, hours }: PropsHistory) {
  return (
    <HStack
      w={'full'}
      px={5}
      py={4}
      mb={3}
      bg="gray.600"
      rounded={'md'}
      alignItems="center"
      justifyContent={'space-between'}
    >
      <VStack mr={5} flex={1}>
        <Heading
          color={'white'}
          fontSize={'md'}
          textTransform={'capitalize'}
          numberOfLines={1}
          fontFamily={'heading'}
        >
          {group}
        </Heading>

        <Text color={'gray.100'} fontSize={'lg'} numberOfLines={1}>
          {exercise}
        </Text>
      </VStack>

      <Text color={'gray.300'} fontSize={'md'}>
        {hours}
      </Text>
    </HStack>
  );
}
