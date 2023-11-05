import { Center, Heading, Image, ScrollView, Text, VStack } from "native-base";
import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./form";
import { api } from "@services/api";
import axios from "axios";
import { Alert } from "react-native";

interface PropsFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export function SignUp() {
  const { goBack } = useNavigation();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PropsFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  async function handleSignUp({name,email,password}: PropsFormData) {

    try {
      const response = await api.post('/users', {
        name,email,password
      })

      console.log(response)

    } catch (error) {
      if(axios.isAxiosError(error)){

        Alert.alert(error?.response?.data?.message)
      }

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
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors?.passwordConfirmation?.message}
              />
            )}
          />

          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
          />
        </Center>

        <Button
          mt={12}
          title="Voltar para o login"
          variant="outline"
          onPress={goBack}
        />
      </VStack>
    </ScrollView>
  );
}
