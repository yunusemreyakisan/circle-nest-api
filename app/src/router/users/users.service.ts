import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game, GameDocument } from 'app/src/schemas/game.schema';
import { User, UserDocument } from 'app/src/schemas/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Game.name) private gameModel: Model<GameDocument>,
  ) {}

  // Retrieve all users
  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().populate('games').exec(); // Populate games owned by the user
  }

  // Add a new user
  async addUser(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  // Get user by ID
  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).populate('games').exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return user;
  }

  // Delete a user by ID
  async deleteUserById(id: string): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return user;
  }

  // Update a user by ID
  async updateUser(id: string, userDetails: User): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, userDetails, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return updatedUser;
  }

  // Add a game to a user's collection
  async addGameToUser(userId: string, gameId: string): Promise<User> {
    // Find the user by ID
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    // Find the game by ID
    const game = await this.gameModel.findById(gameId).exec();
    if (!game) {
      throw new NotFoundException(`Game with ID ${gameId} not found.`);
    }

    // Add the game to the user's games array
    if (!user.games.includes(game)) {
      user.games.push(game);
      await user.save(); // Save the updated user document
    }

    return user;
  }
}
