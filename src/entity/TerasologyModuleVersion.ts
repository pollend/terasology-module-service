import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany, ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import ArtifactVersion from "./ArtifactVersion";
import TerasologyModule from "./TerasologyModule";

@Entity()
export default class TerasologyModuleVersion {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => ArtifactVersion)
    @JoinColumn()
    artifact: ArtifactVersion

    @ManyToMany(type => ArtifactVersion)
    dependencies: ArtifactVersion[]

    @ManyToOne(type => TerasologyModule)
    module: TerasologyModule
}
