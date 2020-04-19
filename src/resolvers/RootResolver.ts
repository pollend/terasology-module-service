import {Query, Resolver} from "type-graphql";

@Resolver()
export default class RootResolver {

    @Query(returns => String)
    version() {
        return "1.0.0"
    }
}
