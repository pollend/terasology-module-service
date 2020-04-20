import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTerasologyArtifacts1587337865540 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        queryRunner.query(`INSERT INTO artifact_repo ("baseUri", "repo", "group", type) VALUES ('http://artifactory.terasology.org/artifactory', 'terasology-snapshot-local', 'org.terasology.modules', 'SNAPSHOT')`)
        queryRunner.query(`INSERT INTO artifact_repo ("baseUri", "repo", "group", type) VALUES ('http://artifactory.terasology.org/artifactory', 'terasology-release-local', 'org.terasology.modules', 'RELEASE')`)
        queryRunner.query(`INSERT INTO artifact_repo ("baseUri", "repo", "group", type) VALUES ('http://artifactory.terasology.org/artifactory', 'terasology-snapshot-local', 'org.terasology.engine', 'SNAPSHOT')`)
        queryRunner.query(`INSERT INTO artifact_repo ("baseUri", "repo", "group", type) VALUES ('http://artifactory.terasology.org/artifactory', 'terasology-release-local', 'org.terasology.engine', 'RELEASE')`)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}


