
import {getConnection, getRepository} from "typeorm";
import ArtifactRepo from "../entity/ArtifactRepo";

export async function UpdateArtifacts() {
    const artifactRepo = getRepository(ArtifactRepo)
    const repos = await artifactRepo.find()

}
