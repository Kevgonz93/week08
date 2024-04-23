import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  ForbiddenException,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './entities/users.dto';
import { CryptoService } from '../core/crypto.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../core/auth.guard';

@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cryptoService: CryptoService,
    private configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('login')
  async tokenLogin(@Headers('Authorization') auth: string) {
    console.log(auth);
  }

  @Post('login')
  async login(@Body() data: CreateUserDto) {
    const { email, password } = data;
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const user = await this.usersService.findPasswordForLogin(email);

    if (!user) {
      throw new ForbiddenException('Email and password invalid');
    }

    if (!(await this.cryptoService.compare(password, user.password!))) {
      throw new ForbiddenException('Email and password invalid');
    }

    const token = await this.jwtService.signAsync(
      { id: user.id, role: user.role },
      { secret: this.configService.get('SECRET_JWT') },
    );

    return { token };
  }

  @Post()
  async create(@Body() data: CreateUserDto) {
    data.password = await this.cryptoService.hash(data.password);
    return this.usersService.create(data);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    if (data.password) {
      data.password = await this.cryptoService.hash(data.password);
    }
    return this.usersService.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
