import { Module } from '@nestjs/common';

import { MediasService } from './services/medias.service';
import { CanvasService } from './services/canvas.service';
import { PrismaModule } from '../db/prisma.module';
import { StorageModule } from '../storage/storage.module';
import { CanvasConfig } from './config/canvas.config';

@Module({
  imports: [PrismaModule, StorageModule],
  providers: [MediasService, CanvasService, CanvasConfig],
  exports: [MediasService, CanvasService],
})
export class MediasModule {}
