import * as Yup from 'yup';

export const schema = Yup.object({
  email: Yup.string().required('Digite o email para continuar').email('Digite um email válido'),
  password: Yup.string()
    .required('Digite a senha válida')
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
});
