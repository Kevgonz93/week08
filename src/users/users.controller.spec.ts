import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CryptoService } from '../core/crypto.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

const mockUserService = {
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  findPasswordForLogin: jest.fn(),
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUserService,
        },
        {
          provide: CryptoService,
          useValue: {
            hash: jest.fn(),
            compare: jest.fn(),
          },
        },
        ConfigService,
        JwtService,
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });

  it('should return all users', async () => {
    const users = [{ id: 1, name: 'test' }];
    mockUserService.findAll.mockResolvedValue(users);
    expect(await controller.findAll()).toEqual([{ id: 1, name: 'test' }]);
  });
});
