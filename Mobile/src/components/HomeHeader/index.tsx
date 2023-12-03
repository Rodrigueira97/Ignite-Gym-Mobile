import { HStack, Heading, Icon, Text, VStack } from 'native-base';
import DefaultAvatar from '@assets/userPhotoDefault.png';
import { UserPhoto } from '@components/UserPhoto';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@hooks/useAuth';

export function HomeHeader() {
  const { user } = useAuth();

  return (
    <HStack bgColor={'gray.600'} pt={16} pb={5} px={8} alignItems={'center'}>
      <UserPhoto
        size={16}
        alt="Imagem de perfil do usuário"
        mr={4}
        source={
          user.avatar
            ? {
                uri: user?.avatar,
              }
            : DefaultAvatar
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

      <Icon as={MaterialIcons} name="logout" color={'gray.200'} size={7} />
    </HStack>
  );
}
