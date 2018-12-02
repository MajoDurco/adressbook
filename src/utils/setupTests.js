require('dotenv').config()

jest.mock('bcrypt', () => ({
  compare: jest.fn(() => true),
  genSalt: jest.fn(),
  hash: jest.fn(() => 'hashedPassword'),
}))
