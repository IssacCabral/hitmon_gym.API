export const CREATE_USER_USE_CASE = Symbol('CREATE_USER_USE_CASE');
export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
export const HASH_SERVICE = Symbol('HASH_SERVICE');
export const MAIL_SERVICE = Symbol('MAIL_SERVICE');
export const CODE_TEMPORARY_SERVICE = Symbol('CODE_TEMPORARY_SERVICE');

// export const userProviders: Provider[] = [];

// const createUserUseCaseProvider: Provider = {
//   provide: CREATE_USER_USE_CASE,
//   useClass: DbCreateUserUseCase,
// };

// const userRepositoryProvider: Provider = {
//   provide: USER_REPOSITORY,
//   useClass: PrismaUserRepository,
// };

// const hashServiceProvider: Provider = {
//   provide: HASH_SERVICE,
//   useClass: BcryptHashAdapter,
// };

// const mailServiceProvider: Provider = {
//   provide: MAIL_SERVICE,
//   useClass: NodeMailerAdapter,
// };

// const codeTemporaryServiceProvider: Provider = {
//   provide: CODE_TEMPORARY_SERVICE,
//   useClass: CodeTemporary,
// };

// userProviders.push(
//   createUserUseCaseProvider,
//   userRepositoryProvider,
//   hashServiceProvider,
//   mailServiceProvider,
//   codeTemporaryServiceProvider,
// );
