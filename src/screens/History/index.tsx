import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";

import { VStack } from "native-base";

export function History() {
  return (
    <VStack>
      <ScreenHeader title={"Historico de exercicios"} />

      <HistoryCard />
    </VStack>
  );
}
