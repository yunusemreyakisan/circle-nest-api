import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set global prefix for API versioning
  app.setGlobalPrefix('v1');

  // Define the port to listen on
  const port = process.env.NEST_PORT || 3000;
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}/v1`);
}

bootstrap();
