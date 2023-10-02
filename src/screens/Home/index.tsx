import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { FlatList, HStack, VStack } from "native-base";
import { useState } from "react";

export function Home() {
  const [groups, setGroups] = useState([
    "Costas",
    "Bíceps",
    "Triceps",
    " Ombro",
  ]);
  const [groupSelected, setGroupSelected] = useState("Costas");

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        horizontal
        keyExtractor={(item) => item}
        renderItem={(group) => (
          <Group
            name={group.item}
            isActive={groupSelected === group.item}
            onPress={() => setGroupSelected(group.item)}
          />
        )}
      />
    </VStack>
  );
}
