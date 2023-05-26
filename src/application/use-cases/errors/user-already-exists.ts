export class UserAlreadyExists extends Error {
  constructor() {
    super('User already exists');
  }
}
