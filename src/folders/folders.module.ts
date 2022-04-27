import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  providers: [FoldersService, DatabaseService],
  controllers: [FoldersController]
})
export class FoldersModule {}
