import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
} from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
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
              rounded={"full"}
              startColor={"gray.500"}
              endColor={"gray.400"}
            />
          ) : (
            <UserPhoto
              source={{
                uri: "https://github.com/rodrigueira97.png",
              }}
              alt="Foto de perfil"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity>
            <Text
              color={"green.500"}
              fontWeight={"bold"}
              fontSize={"md"}
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input placeholder="Nome" bg={"gray.600"} />

          <Input
            bg={"gray.600"}
            placeholder="E-mail"
            value="rodrigoxc97@hotmail.com"
            isDisabled
          />

          <Heading
            color={"gray.200"}
            fontSize={"md"}
            alignSelf={"flex-start"}
            mb={2}
            mt={12}
          >
            Alterar senha
          </Heading>

          <Input bg={"gray.600"} placeholder="Senha antiga" secureTextEntry />

          <Input bg={"gray.600"} placeholder="Nova senha" secureTextEntry />

          <Input
            bg={"gray.600"}
            placeholder="Confirme a nova senha"
            secureTextEntry
          />

          <Button title="Atualizar" mt={4} />
        </Center>
      </ScrollView>
    </VStack>
  );
}
