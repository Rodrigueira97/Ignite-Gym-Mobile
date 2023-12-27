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
import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import { schema } from './form';

interface PropsFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export function signOut() {
  const { goBack } = useNavigation();
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const { show: toast } = useToast();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PropsFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  async function handlesignOut({ name, email, password }: PropsFormData) {
    try {
      setIsLoading(true);

      await api.post('/users', {
        name,
        email,
        password,
      });

      await signIn(email, password);
    } catch (error) {
      setIsLoading(false);

      const title =
        error instanceof AppError
          ? error.message
          : 'Não foi possível criar a conta!, Tente novamente mais tarde';

      toast({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }

    /*fetch('http://192.168.2.111:3333/users',{
      method:'POST',
     headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
     },
     body: JSON.stringify({name,email,password})
    })
    .then(response => response.json())
    .then(data => console.log( data))*/
  }

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
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                isFilledInput={value.length > 2}
                value={value}
                errorMessage={errors?.name?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                isFilledInput={value.length > 2}
                value={value}
                errorMessage={errors?.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                isFilledInput={value.length >= 6}
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors?.password?.message}
              />
            )}
          />

          <Controller
            name="passwordConfirmation"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirme a Senha"
                secureTextEntry
                isFilledInput={value.length >= 6}
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handlesignOut)}
                returnKeyType="send"
                errorMessage={errors?.passwordConfirmation?.message}
              />
            )}
          />

          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handlesignOut)}
            isLoading={isLoading}
          />
        </Center>

        <Button mt={12} title="Voltar para o login" variant="outline" onPress={goBack} />
      </VStack>
    </ScrollView>
  );
}
