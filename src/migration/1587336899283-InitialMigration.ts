import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1587336899283 implements MigrationInterface {
    name = 'InitialMigration1587336899283'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "artifact_repo" ("id" SERIAL NOT NULL, "baseUri" character varying NOT NULL, "repo" character varying NOT NULL, "group" character varying NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_f9d702052a6c55f8ae5af3f23fb" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "terasology_module" ("id" SERIAL NOT NULL, "moduleId" character varying NOT NULL, "name" character varying NOT NULL, "displayName" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_ef07eefcbd6e30c0adf2eec3a2d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "terasology_module_version" ("id" SERIAL NOT NULL, "artifactId" integer, "moduleId" integer, CONSTRAINT "REL_f467d8dd359eb44516272402c2" UNIQUE ("artifactId"), CONSTRAINT "PK_9d92c2be8e50ee2e8b2bdfaede5" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "artifact_version" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "major" integer NOT NULL, "minor" integer NOT NULL, "patch" integer NOT NULL, "downloadUri" character varying NOT NULL, "repoId" integer, CONSTRAINT "PK_7cfb0dfbb7e79316445ecac46c0" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "artifact_version_references_terasology_module_version" ("artifactVersionId" integer NOT NULL, "terasologyModuleVersionId" integer NOT NULL, CONSTRAINT "PK_4c7fa0f96f7cb2fa6ba4e26b536" PRIMARY KEY ("artifactVersionId", "terasologyModuleVersionId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_a5404f01ba7655346906e5933a" ON "artifact_version_references_terasology_module_version" ("artifactVersionId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_8c45ef5c347f9c87258bfe7bf4" ON "artifact_version_references_terasology_module_version" ("terasologyModuleVersionId") `, undefined);
        await queryRunner.query(`ALTER TABLE "terasology_module_version" ADD CONSTRAINT "FK_f467d8dd359eb44516272402c26" FOREIGN KEY ("artifactId") REFERENCES "artifact_version"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "terasology_module_version" ADD CONSTRAINT "FK_0084ebee211209c9abcb86029be" FOREIGN KEY ("moduleId") REFERENCES "terasology_module"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "artifact_version" ADD CONSTRAINT "FK_4691a0c9079e54e3c41ec614c5c" FOREIGN KEY ("repoId") REFERENCES "artifact_repo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "artifact_version_references_terasology_module_version" ADD CONSTRAINT "FK_a5404f01ba7655346906e5933a7" FOREIGN KEY ("artifactVersionId") REFERENCES "artifact_version"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "artifact_version_references_terasology_module_version" ADD CONSTRAINT "FK_8c45ef5c347f9c87258bfe7bf45" FOREIGN KEY ("terasologyModuleVersionId") REFERENCES "terasology_module_version"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artifact_version_references_terasology_module_version" DROP CONSTRAINT "FK_8c45ef5c347f9c87258bfe7bf45"`, undefined);
        await queryRunner.query(`ALTER TABLE "artifact_version_references_terasology_module_version" DROP CONSTRAINT "FK_a5404f01ba7655346906e5933a7"`, undefined);
        await queryRunner.query(`ALTER TABLE "artifact_version" DROP CONSTRAINT "FK_4691a0c9079e54e3c41ec614c5c"`, undefined);
        await queryRunner.query(`ALTER TABLE "terasology_module_version" DROP CONSTRAINT "FK_0084ebee211209c9abcb86029be"`, undefined);
        await queryRunner.query(`ALTER TABLE "terasology_module_version" DROP CONSTRAINT "FK_f467d8dd359eb44516272402c26"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_8c45ef5c347f9c87258bfe7bf4"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_a5404f01ba7655346906e5933a"`, undefined);
        await queryRunner.query(`DROP TABLE "artifact_version_references_terasology_module_version"`, undefined);
        await queryRunner.query(`DROP TABLE "artifact_version"`, undefined);
        await queryRunner.query(`DROP TABLE "terasology_module_version"`, undefined);
        await queryRunner.query(`DROP TABLE "terasology_module"`, undefined);
        await queryRunner.query(`DROP TABLE "artifact_repo"`, undefined);
    }

}
