jest.mock('bcrypt', () => ({
  genSalt: jest.fn(),
  hash: jest.fn(() => 'hashedPassword')
}))
