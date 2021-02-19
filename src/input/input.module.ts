import { Module } from '@nestjs/common';
import { ApiKeyService } from './apikey.service';
import { ArgvService } from './argv.service';

@Module({
    imports: [],
    controllers: [],
    providers: [ApiKeyService, ArgvService],
    exports: [ApiKeyService, ArgvService],
})
export class InputModule {}
