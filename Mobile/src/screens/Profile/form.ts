import * as Yup from 'yup';

export const Schema = Yup.object({
  name: Yup.string().required('Informe o nome'),
  email: Yup.string(),
  password: Yup.string()
    .min(6, 'A senha deve ter no minimo 6 digitos')
    .nullable()
    .transform((value) => (value ? value : null)),
  confirm_password: Yup.string()
    .nullable()
    .transform((value) => (value ? value : null))
    .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais '),
});
