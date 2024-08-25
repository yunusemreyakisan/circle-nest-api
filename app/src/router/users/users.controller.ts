import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'app/src/schemas/users.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // Get all users
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  // Add a new user
  @Post('add')
  async addUser(@Body() user: User): Promise<User> {
    return this.userService.addUser(user);
  }

  // Get a user by ID
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  // Delete a user by ID
  @Delete('delete/:id')
  async deleteUserById(@Param('id') id: string): Promise<string> {
    await this.userService.deleteUserById(id);
    return `User with ID ${id} deleted.`;
  }

  // Update a user by ID
  @Put('update/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() userDetails: User,
  ): Promise<User> {
    return this.userService.updateUser(id, userDetails);
  }

  // Add a game to a user's collection
  @Post(':userId/add-game/:gameId')
  async addGameToUser(
    @Param('userId') userId: string,
    @Param('gameId') gameId: string,
  ): Promise<User> {
    return this.userService.addGameToUser(userId, gameId);
  }
}
