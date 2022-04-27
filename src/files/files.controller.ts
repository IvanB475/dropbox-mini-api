import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CreateFileDto } from './dtos/createFileDto';
import { FindFilesWithinFolderDto } from './dtos/findFilesWithinFolderDto';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
    constructor(
        private filesService: FilesService
    ) {}

    @Post('/create-file')
    async createFileController(@Body() file: CreateFileDto){
        return this.filesService.createFileService(file.name, file.parentFolderId);
    }

    @Delete('/:id')
    async deleteFolderController(@Param('id') fileId: number) {
        return this.filesService.deleteFileService(fileId);
    }

    @Get('/find-files-within-folder')
    async findFilesWithinFolderController(@Query() findFilesWithinFolder: FindFilesWithinFolderDto) {
        return this.filesService.findFilesWithinFolderService(findFilesWithinFolder.name, findFilesWithinFolder.parentFolderId);
    }

    @Get('/find-files-across-folders')
    async findFilesAcrossFoldersController(@Query('name') name: string) {
        return this.filesService.findFilesAcrossFoldersService(name);
    }
}
