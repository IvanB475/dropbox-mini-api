import { HttpException, Injectable } from '@nestjs/common';
import { EntityManager, ILike } from 'typeorm';
import { FileEntity } from './entities/file.entity';
import { FolderEntity } from './entities/folder.entity';

@Injectable()
export class DatabaseService {
    constructor(
        private entityManager: EntityManager
    ){}

    async saveFolderToDB(folderName: string, parentFolderId: number) {
        try {
            const newFolder = new FolderEntity(folderName, parentFolderId);
            await newFolder.save();
        }catch(e) {
            const ERR_MESSAGE = 'Something went wrong';
            const ERR_STATUS_CODE = 500;
            throw new HttpException(ERR_MESSAGE, ERR_STATUS_CODE);
        }
    }

    async getFolderFromDB(folderId: number) {
        try {
            const foundFolder = await this.entityManager
                .createQueryBuilder(FolderEntity, 'folder')
                .leftJoinAndSelect('folder.subFolders', 'subfolders')
                .leftJoinAndSelect('folder.files', 'files')
                .where('folder.id = :folderId', { folderId})
                .getOne();
            return foundFolder;
        } catch(e) {
            const ERR_MESSAGE = 'Something went wrong';
            const ERR_STATUS_CODE = 500;
            throw new HttpException(ERR_MESSAGE, ERR_STATUS_CODE);
        }
    }

    async saveFileToDB(fileName: string, parentFolderId: number) {
        try {
            const newFile = new FileEntity(fileName, parentFolderId);
            await newFile.save();
        } catch(e) {
            const ERR_MESSAGE = 'Something went wrong';
            const ERR_STATUS_CODE = 500;
            throw new HttpException(ERR_MESSAGE, ERR_STATUS_CODE);
        }
    }

    async deleteFolderFromDB(folderId: number){
        try {
            await this.entityManager.delete(FolderEntity, {id: folderId})
        } catch(e) {
            const ERR_MESSAGE = 'Something went wrong';
            const ERR_STATUS_CODE = 500;
            throw new HttpException(ERR_MESSAGE, ERR_STATUS_CODE);
        }
    }

    async deleteFileFromDB(fileId: number) {
        try {
            await this.entityManager.delete(FileEntity, {id: fileId})
        } catch(e) {
            const ERR_MESSAGE = 'Something went wrong';
            const ERR_STATUS_CODE = 500;
            throw new HttpException(ERR_MESSAGE, ERR_STATUS_CODE);
        }
    }


    async findFilesWithinFolder(searchString: string, parentFolderId: number) {
        try {
            const foundFiles = await this.entityManager.createQueryBuilder(FileEntity, 'file')
                .where("file.name ilike :name", { name: `${searchString}%`})
                .andWhere("file.parentFolderId = :parentFolderId", {parentFolderId})
                .limit(10)
                .getMany(); 
            return foundFiles;
        } catch(e) {
            const ERR_MESSAGE = 'Something went wrong';
            const ERR_STATUS_CODE = 500;
            throw new HttpException(ERR_MESSAGE, ERR_STATUS_CODE);
        }
    }

    async findFilesAcrossFolders(searchString: string){
        try {
            const foundFiles = await this.entityManager.createQueryBuilder(FileEntity, 'file')
                .where("file.name ilike :name", { name: `${searchString}%`})
                .limit(10)
                .getMany(); 
            return foundFiles;
        } catch(e) {
            const ERR_MESSAGE = 'Something went wrong';
            const ERR_STATUS_CODE = 500;
            throw new HttpException(ERR_MESSAGE, ERR_STATUS_CODE);
        }
    }
}
