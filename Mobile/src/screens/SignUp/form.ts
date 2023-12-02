import * as Yup from 'yup';

export const schema = Yup.object({
  name: Yup.string().required('Digite o nome válido'),
  email: Yup.string().required('Digite o email para continuar').email('Digite um email válido'),
  password: Yup.string()
    .required('Digite a senha válida')
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .oneOf([Yup.ref('passwordConfirmation')], 'As senhas digitadas são diferente'),
  passwordConfirmation: Yup.string()
    .required('Confirme a senha')
    .oneOf([Yup.ref('password')], 'As senhas digitadas são diferente'),
});
