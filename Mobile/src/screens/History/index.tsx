import { useCallback, useState } from 'react';
import { Heading, SectionList, Text, VStack, useToast } from 'native-base';
import { HistoryCard } from '@components/HistoryCard';
import { Loading } from '@components/Loading';
import { ScreenHeader } from '@components/ScreenHeader';
import { HistoryDTO } from '@dtos/historyDTO';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';

export function History() {
  const [isLoading, setIsLoading] = useState(false);
  const [exercises, setExercises] = useState<HistoryDTO[]>([]);

  const toast = useToast();

  async function fetchHistory() {
    try {
      setIsLoading(true);
      const { data } = await api.get('/history');

      setExercises(data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : 'Não foi possivel carregar o histórico';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, []),
  );

  return (
    <VStack>
      <ScreenHeader title={'Historico de exercicios'} />

      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HistoryCard group={item.group} exercise={item.name} hours={item.hour} />
          )}
          renderSectionHeader={({ section }) => (
            <Heading color={'gray.200'} fontSize={'md'} mt={10} mb={3} fontFamily={'heading'}>
              {section.title}
            </Heading>
          )}
          px={8}
          contentContainerStyle={
            exercises.length === 0 && {
              height: 600,
              justifyContent: 'center',
            }
          }
          ListEmptyComponent={() => (
            <Text color={'gray.100'} textAlign={'center'}>
              Não há exercícios registrados ainda.{'\n'} Vamos fazer exercícios hoje?
            </Text>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </VStack>
  );
}
