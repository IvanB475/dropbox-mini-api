import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FileEntity } from "./file.entity";


@Entity({
    name: 'folders'
})
export class FolderEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => FolderEntity, { nullable: true})
    parentFolder?: FolderEntity;
    
    @OneToMany(() => FolderEntity, (folder) => folder.parentFolder, {
        onDelete: "CASCADE"
    })
    subFolders: FolderEntity[];

    @OneToMany(() => FileEntity, (file) => file.parentFolder)
    files: FileEntity[];

    constructor(name, parentFolder) {
        super();
        this.name = name;
        this.parentFolder = parentFolder;
    }
}