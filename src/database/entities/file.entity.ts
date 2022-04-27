import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FolderEntity } from "./folder.entity";

@Entity({
    name: 'files'
})
export class FileEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => FolderEntity, {
        onDelete: "CASCADE"
    })
    parentFolder: FolderEntity;

    constructor(name, parentFolder) {
        super();
        this.name = name;
        this.parentFolder = parentFolder;
    }
}