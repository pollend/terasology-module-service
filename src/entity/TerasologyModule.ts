import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import TerasologyModuleVersion from "./TerasologyModuleVersion";

@Entity()
export default class TerasologyModule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    moduleId: string

    @Column()
    name: string

    @Column()
    displayName: string

    @Column()
    description: string

    @OneToMany(type => TerasologyModuleVersion, moduleVersion => moduleVersion.module)
    versions: TerasologyModuleVersion[]

}
