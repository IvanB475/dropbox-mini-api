import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  providers: [FilesService, DatabaseService],
  controllers: [FilesController]
})
export class FilesModule {}
