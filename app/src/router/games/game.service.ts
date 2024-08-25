import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game, GameDocument } from 'app/src/schemas/game.schema';
import { Model } from 'mongoose';

@Injectable()
export class GameService {
  constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>) {}

  // Retrieve all games
  async getAllGames(): Promise<Game[]> {
    return this.gameModel.find().exec();
  }

  // Retrieve a game by ID
  async getGameById(id: number): Promise<Game> {
    const game = await this.gameModel.findById(id).exec();
    if (!game) {
      throw new NotFoundException(`${id} id'li oyun bulunamadı.`);
    }
    return game;
  }

  // Add a new game
  async addGame(game: Game): Promise<Game> {
    const newGame = new this.gameModel(game);
    return newGame.save(); // This saves the game to the MongoDB database
  }

  // Delete a game by ID
  async deleteById(id: number): Promise<Game> {
    const result = await this.gameModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`${id} id'li oyun bulunamadı.`);
    }
    return result;
  }

  // Update a game by ID
  async updateGame(id: number, gameDetail: Game): Promise<Game> {
    const updatedGame = await this.gameModel
      .findByIdAndUpdate(id, gameDetail, {
        new: true, // Returns the updated document
      })
      .exec();

    if (!updatedGame) {
      throw new NotFoundException(`${id} id'li oyun bulunamadı.`);
    }

    return updatedGame;
  }
}
