import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoldersModule } from './folders/folders.module';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from './files/files.module';
import { FolderEntity } from './database/entities/folder.entity';
import { FileEntity } from './database/entities/file.entity';

@Module({
  imports: [FoldersModule, DatabaseModule,
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'root',
    database: 'test',
    entities: [FileEntity, FolderEntity],
    synchronize: true,
  }),
  FilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
