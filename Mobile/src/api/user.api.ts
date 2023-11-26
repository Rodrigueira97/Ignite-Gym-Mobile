import { createUserDTO } from "@dtos/userDTO";
import { api } from "@services/api";

export async function createUser({name,email,password}:createUserDTO){
  const {} = await api.post('/users',{
    name,email,password
  })
}