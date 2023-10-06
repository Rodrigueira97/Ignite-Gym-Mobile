import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { ScrollView, Text, VStack } from "native-base";

export function Profile() {
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView>
        <UserPhoto
          source={{
            uri: "https://github.com/rodrigueira97.png",
          }}
          alt="Foto de perfil"
          size={33}
        />
      </ScrollView>
    </VStack>
  );
}
