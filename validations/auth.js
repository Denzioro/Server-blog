import { body } from 'express-validator';

export const registrValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Минимальная длина пароля 5 символов').isLength({ min: 5 }),
  body('fullName', 'Минимальная длина имени 3 символа').isLength({ min: 3 }),
  body('avatarUrl', 'Неверная ссылка на автарку').optional().isURL(),
];
