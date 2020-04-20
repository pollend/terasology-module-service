import "reflect-metadata";
import Container from "typedi";
import {buildSchema} from "type-graphql";
import ModuleResolver from "./resolvers/module-resolver";
import {ApolloServer} from "apollo-server";
import RootResolver from "./resolvers/RootResolver";
import {UpdateArtifacts} from "./jobs/UpdateArtifacts";
import {createConnection} from "typeorm";

const cron = require("node-cron");

async function bootstrap() {
    const connection = await createConnection();

    // build TypeGraphQL executable schema
    const schema = await buildSchema({
        resolvers: [ModuleResolver,RootResolver],
        globalMiddlewares: [],
        container: Container,
    });

    UpdateArtifacts()

    // Create GraphQL server
    const server = new ApolloServer({
        schema
    });

    // Start the server
    const { url } = await server.listen(8080);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();

