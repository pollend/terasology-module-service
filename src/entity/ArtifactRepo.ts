import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export default class ArtifactRepo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    baseUri: string

    @Column()
    repo: string

    @Column()
    group: string

    @Column()
    type: "SNAPSHOT" | "RELEASE"

}
