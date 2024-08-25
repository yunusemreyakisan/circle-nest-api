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
import { GameService } from './game.service'; // Adjust the path as needed
import { Game } from 'app/src/schemas/game.schema';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  // Get all games
  @Get()
  async getAllGames(): Promise<Game[]> {
    return this.gameService.getAllGames();
  }

  //Get a game by id
  @Get(':id')
  async getGameById(@Param('id') id: number): Promise<Game> {
    const game = await this.gameService.getGameById(id);
    if (!game) {
      throw new NotFoundException(`${id} id'li oyun bulunamadı.`);
    }
    return game;
  }

  // Add a new game and return all games
  @Post('add')
  async addGame(@Body() game: Game): Promise<Game[]> {
    await this.gameService.addGame(game); // This saves the game to the MongoDB database
    return this.gameService.getAllGames();
  }

  // Delete a game by id
  @Delete('delete/:id')
  async deleteById(@Param('id') id: number): Promise<string> {
    await this.gameService.deleteById(id);
    return `${id} id'li oyun silindi.`;
  }

  // Update a game by id
  @Put('update/:id')
  async updateGame(
    @Param('id') id: number,
    @Body() gameDetail: Game,
  ): Promise<Game> {
    return this.gameService.updateGame(id, gameDetail);
  }
}
