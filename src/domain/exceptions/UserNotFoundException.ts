export class UserNotFoundException extends Error {
  constructor () {
    super('User not found :C ... Check your UserID!')
  }
}
