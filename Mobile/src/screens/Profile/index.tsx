import { useState } from 'react';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Center, Heading, ScrollView, Skeleton, Text, VStack, useToast } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@hooks/useAuth';
import { Schema } from './form';

interface ProfileDataProps {
  name: string;
  email: string;
  old_password: string;
  password: string;
  confirm_password: string;
}

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState('https://github.com/rodrigueira97.png');
  const { user } = useAuth();

  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileDataProps>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      old_password: '',
      password: '',
      confirm_password: '',
    },
    resolver: yupResolver(Schema),
  });

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets[0].uri) {
        const photoPerfil = photoSelected.assets[0].uri;
        const photoInfo = await FileSystem.getInfoAsync(photoPerfil);

        if (photoInfo?.size && photoInfo.size / 1024 / 1024 > 2) {
          return toast.show({
            title: 'Essa imagem é muito grande. Escolha uma de até 5MB',
            placement: 'top',
            bgColor: 'red.500',
          });
        }
        setUserPhoto(photoPerfil);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

  async function handleProfileUpdate(data: ProfileDataProps) {
    console.log(data);
  }

  const PHOTO_SIZE = 33;

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 36,
        }}
      >
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded={'full'}
              startColor={'gray.500'}
              endColor={'gray.400'}
            />
          ) : (
            <UserPhoto
              source={{
                uri: userPhoto,
              }}
              alt="Foto de perfil"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color={'green.500'} fontWeight={'bold'} fontSize={'md'} mt={2} mb={8}>
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Nome"
                bg={'gray.600'}
                value={value}
                onChangeText={onChange}
                errorMessage={errors?.name?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                bg={'gray.600'}
                placeholder="E-mail"
                value={value}
                onChangeText={onChange}
                isDisabled
              />
            )}
          />

          <Heading
            color={'gray.200'}
            fontSize={'md'}
            alignSelf={'flex-start'}
            fontFamily={'heading'}
            mb={2}
            mt={12}
          >
            Alterar senha
          </Heading>

          <Controller
            name="old_password"
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                bg={'gray.600'}
                placeholder="Senha antiga"
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                bg={'gray.600'}
                placeholder="Nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors?.password?.message}
              />
            )}
          />

          <Controller
            name="confirm_password"
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                bg={'gray.600'}
                placeholder="Confirme a nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors?.confirm_password?.message}
              />
            )}
          />

          <Button title="Atualizar" mt={4} onPress={handleSubmit(handleProfileUpdate)} />
        </Center>
      </ScrollView>
    </VStack>
  );
}
