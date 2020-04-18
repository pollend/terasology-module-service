export class ArtifactInfo {
    artifact: string;
    repo: string;                  // "terasology-release-local",
    path: string;                  // "/org",
    created: Date;               // "2014-11-10T00:57:29.124-05:00",
    createdBy: string;             // "gooey",
    lastModified: Date;            // "2014-11-10T00:57:29.124-05:00",
    modifiedBy: Date;            // "gooey",
    lastUpdated: Date;             // "2014-11-10T00:57:29.124-05:00",
    children: string[];
    uri: string;                   // "http://artifactory.terasology.org/artifactory/api/storage/terasology-release-local/org"
    downloadUri: string;              // "http://a.t.o/a/t-s-l/o/t/m/BlockPicker/0.1.0-SNAPSHOT/BP-0.1.0-20150124.022632-3.jar",
    mimeType: string;              // "application/java-archive",
    size: number;                     // "14063",
}
