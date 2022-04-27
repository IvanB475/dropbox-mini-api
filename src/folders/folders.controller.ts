import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateFolderDto } from './dtos/createFolderDto';
import { FoldersService } from './folders.service';

@Controller('folders')
export class FoldersController {
    constructor(
        private foldersService: FoldersService
    ) {} 

    @Post('/create-folder')
    async createFolderController(@Body() folder: CreateFolderDto){
        return this.foldersService.createFolderService(folder.name, folder.parentFolderId);
    }

    @Get('/:id')
    async getFolderController(@Param('id') folderId: number) {
        return this.foldersService.getFolderService(folderId);
    }

    @Delete('/:id')
    async deleteFolderController(@Param('id') folderId: number) {
        return this.foldersService.deleteFolderService(folderId);
    }
}


