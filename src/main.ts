Object.assign(global, { WebSocket: require('ws') });

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston'
import * as winston from 'winston';
import * as stayAwake from 'stay-awake'

import { InputModule } from './input/input.module'
import { ArgvService } from './input/argv.service'

async function bootstrap() {
  // prevent auto sleep
  // stayAwake.prevent(function(err, data) {
    //console.log('%d routines are preventing sleep', data);
  // });

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
        // other transports...
      ],
      // options (same as WinstonModule.forRoot() options)
    })
  });

  const argvService = app.select(InputModule).get(ArgvService, { strict: true })
  const port = argvService.getPort()
  
  await app.listen(port);
}
bootstrap();