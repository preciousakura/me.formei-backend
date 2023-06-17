export const jwtConstants = {
  secret: 'segredoEm',
};

export const jwtOptions = {
  expiresIn: '60d',
  secret: jwtConstants.secret,
};

export enum ROLES {
  ADMIN,
  STUDENT,
}
