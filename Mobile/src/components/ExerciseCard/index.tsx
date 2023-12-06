import { HStack, Heading, Icon, Image, Text, VStack } from 'native-base';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { api } from '@services/api';

interface PropsExerciseCard extends TouchableOpacityProps {
  name: string;
  image: string;
  series: number;
  repetitions: number;
}

export function ExerciseCard({ name, image, series, repetitions, ...rest }: PropsExerciseCard) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg={'gray.500'} alignItems={'center'} p={2} pr={4} rounded={'md'} mb={3}>
        <Image
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${image}`,
          }}
          alt="remada-unilateral"
          w={16}
          h={16}
          rounded={'md'}
          mr={4}
          resizeMode="cover"
        />

        <VStack flex={1}>
          <Heading fontSize={'lg'} color={'white'} fontFamily={'heading'}>
            {name}
          </Heading>

          <Text fontSize={'sm'} color={'gray.200'} mt={1} numberOfLines={2}>
            {series} séries x {repetitions} repetições
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color={'gray.300'} />
      </HStack>
    </TouchableOpacity>
  );
}
