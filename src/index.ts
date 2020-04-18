import "reflect-metadata";
import Container from "typedi";
import {buildSchema} from "type-graphql";
import ModuleResolver from "./resolvers/ModuleResolver";
import {ApolloServer} from "apollo-server";

async function bootstrap() {
    // build TypeGraphQL executable schema
    const schema = await buildSchema({
        resolvers: [ModuleResolver],
        globalMiddlewares: [],
        container: Container,
    });

    // Create GraphQL server
    const server = new ApolloServer({
        schema
    });

    // Start the server
    const { url } = await server.listen(4000);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();
