import { createUserDTO } from '@dtos/userDTO';
import { api } from '@services/api';

export async function createUser({ name, email, password }: createUserDTO) {
  await api.post('/users', {
    name,
    email,
    password,
  });
}

export async function findGroupsExercises() {
  const { data } = await api.get('/groups');

  return data;
}

export async function fetchExercisesByGroup(group: string) {
  const { data } = await api.get(`/exercises/bygroup/${group}`);

  return data;
}
