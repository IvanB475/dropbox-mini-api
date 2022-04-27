import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FilesService {
    constructor(
        private databaseService: DatabaseService
    ) {}


    async createFileService(fileName: string, parentFolderId: number){
        const SUCCESS_RESPONSE_MESSAGE = 'Successfully created new file';
        await this.databaseService.saveFileToDB(fileName, parentFolderId);
        const responseToUser = {
            message: SUCCESS_RESPONSE_MESSAGE
        };
        return responseToUser;
    }

    async deleteFileService(fileId: number) {
        const SUCCESS_RESPONSE_MESSAGE = 'file deleted successfully';
        await this.databaseService.deleteFileFromDB(fileId);
        const responseToUser = {
            message: SUCCESS_RESPONSE_MESSAGE
        }
        return responseToUser;
    }

    async findFilesWithinFolderService(searchString: string, parentFolderId: number) {
        const foundFiles = await this.databaseService.findFilesWithinFolder(searchString, parentFolderId);
        return foundFiles;
    }

    async findFilesAcrossFoldersService(searchString: string) {
        const foundFiles = await this.databaseService.findFilesAcrossFolders(searchString);
        return foundFiles;
    }
}
