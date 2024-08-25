import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Game } from './game.schema'; // Adjust the path if needed

export type UserDocument = User & Document;

@Schema({ versionKey: false, timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: true })
  email_verify: boolean;

  @Prop({ type: [String], default: [] })
  roles: string[];

  @Prop({ type: [{ type: Game, ref: 'Game' }], default: [] })
  games: Game[]; // A user can own multiple games

  @Prop({ default: null })
  deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Password Hash Middleware
UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
