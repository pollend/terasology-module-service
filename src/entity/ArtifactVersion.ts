import ArtifactRepo from "./ArtifactRepo";
import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import TerasologyModuleVersion from "./TerasologyModuleVersion";

@Entity()
export default class ArtifactVersion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column()
    major: number

    @Column()
    minor: number

    @Column()
    patch: number

    @ManyToOne(type => ArtifactRepo)
    repo: ArtifactRepo

    @Column()
    downloadUri: string

    @ManyToMany(type => TerasologyModuleVersion, moduleVersion => moduleVersion.dependencies)
    @JoinTable()
    references: TerasologyModuleVersion[]
}
