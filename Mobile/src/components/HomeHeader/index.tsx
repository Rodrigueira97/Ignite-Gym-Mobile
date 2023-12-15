import { HStack, Heading, Icon, Text, VStack } from 'native-base';
import { TouchableOpacity } from 'react-native';
import DefaultUserAvatar from '@assets/userPhotoDefault.png';
import { UserPhoto } from '@components/UserPhoto';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@hooks/useAuth';
import { api } from '@services/api';

export function HomeHeader() {
  const { user, signUp } = useAuth();

  return (
    <HStack bgColor={'gray.600'} pt={16} pb={5} px={8} alignItems={'center'}>
      <UserPhoto
        size={16}
        alt="Imagem de perfil do usuário"
        mr={4}
        source={
          user?.avatar
            ? {
                uri: `${api.defaults.baseURL}/avatar/${user?.avatar}`,
              }
            : DefaultUserAvatar
        }
      />

      <VStack flex={1}>
        <Text color="gray.100" fontSize={'md'}>
          Olá,
        </Text>

        <Heading color="gray.100" fontSize={'md'} fontFamily={'heading'}>
          {user?.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signUp}>
        <Icon as={MaterialIcons} name="logout" color={'gray.200'} size={7} />
      </TouchableOpacity>
    </HStack>
  );
}
