import { UserGetterById } from '@domain/services/UserGetterById/UserGetterById'

describe('User Getter By Id', () => {
  test('should return o user correctly', async () => {
    const userMock = {
      id: '1',
      name: 'user_random',
      email: 'user_random@mail.com',
      username: 'user_random',
      password: 'user_random_123',
      age: 20,
      phone: '+57321456789',
      status: true
    }

    const userRepository = {
      getById: jest.fn().mockResolvedValue(userMock)
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const usecase = new UserGetterById(userRepository as any)

    const userFound = await usecase.run('1')

    expect(userFound).toEqual(userMock)
  })
})
