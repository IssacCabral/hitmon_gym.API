// REPOSITORIES/SERVICES
export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
export const HASH_SERVICE = Symbol('HASH_SERVICE');
export const MAIL_SERVICE = Symbol('MAIL_SERVICE');
export const DATE_SERVICE = Symbol('DATE_SERVICE');
export const CODE_TEMPORARY_SERVICE = Symbol('CODE_TEMPORARY_SERVICE');

// USECASES
export const CREATE_USER_USE_CASE = Symbol('CREATE_USER_USE_CASE');
export const CHECK_ACCOUNT_VERIFICATION_CODE_USE_CASE = Symbol(
  'CHECK_ACCOUNT_VERIFICATION_CODE_USE_CASE',
);
export const RESEND_ACCOUNT_VERIFICATION_CODE_USE_CASE = Symbol(
  'RESEND_ACCOUNT_VERIFICATION_CODE_USE_CASE',
);
export const FIND_USERS_USE_CASE = Symbol('FIND_USERS_USE_CASE');
