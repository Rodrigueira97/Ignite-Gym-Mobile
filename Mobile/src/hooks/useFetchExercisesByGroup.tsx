import { useQuery } from 'react-query';
import { fetchExercisesByGroup } from 'src/api/user.api';
import { useAuth } from './useAuth';

export function useFetchExercisesByGroup(group: string) {
  const { user } = useAuth();

  return useQuery(['fetchExercisesByGroup', user.id], () => fetchExercisesByGroup(group), {
    staleTime: 1000 * 60 * 5,
  });
}
