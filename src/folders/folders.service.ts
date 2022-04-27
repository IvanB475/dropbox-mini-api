import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FoldersService {
    constructor(
        private databaseService: DatabaseService
    ) {}
    

    async createFolderService(folderName: string, parentFolderId: number) {
        const SUCCESS_RESPONSE_MESSAGE = 'folder created successfully'
        await this.databaseService.saveFolderToDB(folderName, parentFolderId);
        const responseToUser = {
            message: SUCCESS_RESPONSE_MESSAGE
        }
        return responseToUser;
    }


    async getFolderService(folderId: number) {
        const foundFolder = await this.databaseService.getFolderFromDB(folderId);
        const responseToUser = {
            subFolders: foundFolder.subFolders,
            files: foundFolder.files
        }
        return responseToUser;
    }

    async deleteFolderService(folderId: number) {
        const SUCCESS_RESPONSE_MESSAGE = 'folder deleted successfully'
        await this.databaseService.deleteFolderFromDB(folderId);
        const responseToUser = {
            message: SUCCESS_RESPONSE_MESSAGE
        }
        return responseToUser;
    }
}
