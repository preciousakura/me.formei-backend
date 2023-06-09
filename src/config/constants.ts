export const jwtConstants = {
  secret: 'segredoEm',
};

export const jwtOptions = {
  expiresIn: '10h',
  secret: jwtConstants.secret,
};

export enum ROLES {
  ADMIN,
  STUDENT,
}
