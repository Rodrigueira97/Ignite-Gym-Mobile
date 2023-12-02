import { HStack, Heading, Icon, Image, Text, VStack } from 'native-base';
import { ScrollView, TouchableOpacity } from 'react-native';
import BodySvg from '@assets/body.svg';
import RepetitionsSVG from '@assets/repetitions.svg';
import SeriesSvg from '@assets/series.svg';
import { Button } from '@components/Button';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export function Exercise() {
  const { goBack } = useNavigation();

  return (
    <VStack flex={1}>
      <VStack px={8} bg={'gray.600'} pt={12}>
        <TouchableOpacity onPress={goBack}>
          <Icon as={Feather} name="arrow-left" color={'green.500'} size={6} />
        </TouchableOpacity>

        <HStack justifyContent={'space-between'} mt={4} mb={8} alignItems={'center'}>
          <Heading color={'gray.100'} fontSize={'lg'} flexShrink={1} fontFamily={'heading'}>
            Puxada Frontal
          </Heading>

          <HStack alignItems={'center'}>
            <BodySvg />

            <Text color={'gray.200'} ml={1} textTransform={'capitalize'}>
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView>
        <VStack p={8}>
          <Image
            w={'full'}
            h={80}
            source={{
              uri: 'https://cienciadotreinamento.com.br/wp-content/uploads/2015/11/Lat-pulldown-3_2.jpg',
            }}
            alt="Nome do exercicio"
            mb={3}
            resizeMode="cover"
            rounded={'lg'}
          />

          <VStack bg={'gray.600'} rounded={'md'} pb={4} px={4}>
            <HStack alignItems={'center'} justifyContent={'space-around'} mb={6} mt={5}>
              <HStack alignItems={'center'}>
                <SeriesSvg />
                <Text color={'gray.200'} ml={2}>
                  3 séries
                </Text>
              </HStack>

              <HStack alignItems={'center'}>
                <RepetitionsSVG />
                <Text color={'gray.200'} ml={2}>
                  12 repetições
                </Text>
              </HStack>
            </HStack>

            <Button title="Marcar como realizado" />
          </VStack>
        </VStack>
      </ScrollView>
    </VStack>
  );
}
