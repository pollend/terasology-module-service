import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import ArtifactRepo from "./ArtifactRepo";
import ArtifactVersion from "./ArtifactVersion";

@Entity()
export default class Artifact {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    lastUpdated: Date

    @ManyToOne(type => ArtifactRepo)
    repo: ArtifactRepo

    @Column()
    name: string

    @OneToMany(type => ArtifactVersion, versions => versions.artifact)
    versions: ArtifactVersion[]

}
