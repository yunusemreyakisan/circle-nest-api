import { Module } from '@nestjs/common';
import { GameService } from './router/games/game.service';
import { GameController } from './router/games/game.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './schemas/game.schema';
import { User, UserSchema } from './schemas/users.schema';
import { UsersController } from './router/users/users.controller';
import { UsersService } from './router/users/users.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Circle'), // Replace with your MongoDB connection string
    MongooseModule.forFeature([
      { name: Game.name, schema: GameSchema },
      { name: User.name, schema: UserSchema },
    ]), // Register the Game model
  ],
  controllers: [GameController, UsersController],
  providers: [GameService, UsersService],
})
export class AppModule {}
