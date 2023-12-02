import { HStack, Heading, Icon, Text, VStack } from 'native-base';
import { UserPhoto } from '@components/UserPhoto';
import { MaterialIcons } from '@expo/vector-icons';

export function HomeHeader() {
  return (
    <HStack bgColor={'gray.600'} pt={16} pb={5} px={8} alignItems={'center'}>
      <UserPhoto
        size={16}
        alt="Imagem de perfil do usuário"
        mr={4}
        source={{
          uri: 'https://github.com/rodrigueira97.png',
        }}
      />

      <VStack flex={1}>
        <Text color="gray.100" fontSize={'md'}>
          Olá,
        </Text>

        <Heading color="gray.100" fontSize={'md'} fontFamily={'heading'}>
          Rodrigo
        </Heading>
      </VStack>

      <Icon as={MaterialIcons} name="logout" color={'gray.200'} size={7} />
    </HStack>
  );
}
