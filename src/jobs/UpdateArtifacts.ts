
import {getConnection, getRepository} from "typeorm";
import ArtifactRepo from "../entity/ArtifactRepo";
import axios from 'axios';


interface ArtifactAPI {
    repo: string
    path: string
    created: string
    createdBy: string
    lastModified: string
    modifiedBy: string
    lastUpdated: string
    children: {
        uri: string
        folder: boolean
    }[]
}

export async function UpdateArtifacts() {
    const artifactRepo = getRepository(ArtifactRepo)
    const repos = await artifactRepo.find()
    for(let repo of repos){
        console.log(`${repo.baseUri}/api/storage/${repo.repo}/${repo.groupPath}`)
        try {
            const result = await axios.get<ArtifactAPI>(`${repo.baseUri}/api/storage/${repo.repo}/${repo.groupPath}`)
            for(let child of result.data.children){
                if(child.folder){
                    const module = child.uri.substring(1)

                }
            }
        }
        catch (e) {
            console.log(e)
        }


    }

}

