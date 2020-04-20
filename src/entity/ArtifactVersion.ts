import ArtifactRepo from "./ArtifactRepo";
import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import TerasologyModuleVersion from "./TerasologyModuleVersion";
import Artifact from "./Artifacts";

@Entity()
export default class ArtifactVersion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    major: number

    @Column()
    minor: number

    @Column()
    patch: number

    @ManyToOne(type => Artifact)
    artifact: Artifact

    @Column()
    downloadUri: string

    @ManyToMany(type => TerasologyModuleVersion, moduleVersion => moduleVersion.dependencies)
    @JoinTable()
    references: TerasologyModuleVersion[]
}
