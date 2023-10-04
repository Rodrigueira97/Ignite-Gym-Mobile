import { Entypo } from "@expo/vector-icons";
import { HStack, Heading, Icon, Image, Text, VStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface PropsExerciseCard extends TouchableOpacityProps {}

export function ExerciseCard({ ...rest }: PropsExerciseCard) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg={"gray.500"}
        alignItems={"center"}
        p={2}
        pr={4}
        rounded={"md"}
        mb={3}
      >
        <Image
          source={{
            uri: "https://www.origym.com.br/midia/remada-unilateral-3.jpg",
          }}
          alt="remada-unilateral"
          w={16}
          h={16}
          rounded={"md"}
          mr={4}
          resizeMode="center"
        />

        <VStack flex={1}>
          <Heading fontSize={"lg"} color={"white"}>
            Remada unilateral
          </Heading>

          <Text fontSize={"sm"} color={"gray.200"} mt={1} numberOfLines={2}>
            3 séries x 12 repetições
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color={"gray.300"} />
      </HStack>
    </TouchableOpacity>
  );
}
