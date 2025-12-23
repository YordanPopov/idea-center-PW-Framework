export const invalidEmails: string[] = [
    ' ',
    '',
    'invalidemail',
    '@example.com',
    'test@@example.com',
];

export const invalidUsernames: string[] = [
    '',
    '    ',
    't',
    '31charactersforinvalidusername.',
];

export const invalidPasswords: string[] = [
    ' ',
    '',
    '12345',
    '31charactersforinvalidpassword.',
];

export const invalidCredentials = {
    email: 'invalid@email.com',
    password: 'invalidPassword',
};
