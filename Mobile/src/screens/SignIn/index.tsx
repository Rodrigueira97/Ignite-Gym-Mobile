import { useState } from 'react';
import { Center, Heading, Image, ScrollView, Text, VStack, useToast } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { AppError } from '@utils/AppError';
import { schema } from './form';

interface LoginDto {
  email: string;
  password: string;
}

export function SignIn() {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();
  const { signIn } = useAuth();
  const { show } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const initialData = {
    email: '',
    password: '',
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData,
  });

  function handleNewAccount() {
    navigate('signOut');
  }

  async function handleLogin({ email, password }: LoginDto) {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      setIsLoading(false);

      if (isAppError) {
        return show({
          title: error.message,
          placement: 'top',
          bgColor: 'red.500',
        });
      }
      const title = 'Erro ao acessar a conta, tente novamente mais tarde';

      return show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  }
  // lack to do the form and your validations
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      showsVerticalScrollIndicator={false}
    >
      <VStack px={10} flex={1} pb={16}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <LogoSvg />

          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu o corpo
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Acesse sua conta
          </Heading>

          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                isFilledInput={value?.length > 2}
                errorMessage={errors?.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                errorMessage={errors?.password?.message}
              />
            )}
          />

          <Button title="Acessar" isLoading={isLoading} onPress={handleSubmit(handleLogin)} />
        </Center>

        <Center mt={24}>
          <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
            Ainda não tem acesso?
          </Text>

          <Button title="Criar conta" variant="outline" onPress={handleNewAccount} />
        </Center>
      </VStack>
    </ScrollView>
  );
}
