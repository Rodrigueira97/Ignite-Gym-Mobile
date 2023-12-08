import { useEffect, useState } from 'react';
import { Box, HStack, Heading, Icon, Image, Text, VStack, useToast } from 'native-base';
import { ScrollView, TouchableOpacity } from 'react-native';
import BodySvg from '@assets/body.svg';
import RepetitionsSVG from '@assets/repetitions.svg';
import SeriesSvg from '@assets/series.svg';
import { Button } from '@components/Button';
import { Loading } from '@components/Loading';
import { ExerciseDTO } from '@dtos/exerciseDTO';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';

interface exerciseParams {
  exerciseId: string;
}

export function Exercise() {
  const { goBack, navigate } = useNavigation();
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);
  const toast = useToast();

  const { exerciseId } = useRoute().params as exerciseParams;
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);
  async function fetchExercisesById() {
    try {
      setIsLoading(true);
      const { data } = await api.get(`exercises/${exerciseId}`);

      setExercise(data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : 'Não foi possivel carregar os exercicios';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleExerciseRegister() {
    try {
      setIsLoadingRegister(true);

      await api.post('/history', {
        exercise_id: exerciseId,
      });

      toast.show({
        title: 'Exercício registrado com sucesso',
        placement: 'top',
        bgColor: 'green.700',
      });

      navigate('history');
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : 'Não foi possivel registrar esse exercicio';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoadingRegister(false);
    }
  }

  useEffect(() => {
    fetchExercisesById();
  }, [exerciseId]);

  return (
    <VStack flex={1}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <VStack px={8} bg={'gray.600'} pt={12}>
            <TouchableOpacity onPress={goBack}>
              <Icon as={Feather} name="arrow-left" color={'green.500'} size={6} />
            </TouchableOpacity>

            <HStack justifyContent={'space-between'} mt={4} mb={8} alignItems={'center'}>
              <Heading color={'gray.100'} fontSize={'lg'} flexShrink={1} fontFamily={'heading'}>
                {exercise?.name}
              </Heading>

              <HStack alignItems={'center'}>
                <BodySvg />

                <Text color={'gray.200'} ml={1} textTransform={'capitalize'}>
                  {exercise?.group}
                </Text>
              </HStack>
            </HStack>
          </VStack>

          <ScrollView>
            <VStack p={8}>
              <Box rounded={'lg'} overflow={'hidden'}>
                <Image
                  w={'full'}
                  h={80}
                  source={{
                    uri: `${api.defaults.baseURL}/exercise/demo/${exercise?.demo}`,
                  }}
                  alt={exercise?.name}
                  mb={3}
                  resizeMode="cover"
                  rounded={'lg'}
                />
              </Box>

              <VStack bg={'gray.600'} rounded={'md'} pb={4} px={4}>
                <HStack alignItems={'center'} justifyContent={'space-around'} mb={6} mt={5}>
                  <HStack alignItems={'center'}>
                    <SeriesSvg />
                    <Text color={'gray.200'} ml={2}>
                      {exercise?.series} séries
                    </Text>
                  </HStack>

                  <HStack alignItems={'center'}>
                    <RepetitionsSVG />
                    <Text color={'gray.200'} ml={2}>
                      {exercise?.repetitions} repetições
                    </Text>
                  </HStack>
                </HStack>

                <Button
                  title="Marcar como realizado"
                  isLoading={isLoadingRegister}
                  onPress={handleExerciseRegister}
                />
              </VStack>
            </VStack>
          </ScrollView>
        </>
      )}
    </VStack>
  );
}
