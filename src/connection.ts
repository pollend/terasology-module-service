import {ArgsType, ClassType, Field, ID, Int, ObjectType} from "type-graphql";
import {SelectQueryBuilder} from "typeorm";
import {INode} from "./INode";


@ArgsType()
export class PageArgs {
    @Field(type => Int, {nullable: false})
    first: number

    @Field(type => ID,{nullable: true})
    after: string
}

@ObjectType()
export class PageInfo {
    @Field()
    hasPreviousPage: boolean
    @Field()
    hasNextPage: boolean
    @Field({nullable: true})
    startCursor: string
    @Field({nullable: true})
    endCursor: string
}

interface IEdge<T> {
    node: T
    cursor: string
}

interface IConnection<TRoot,TEdge extends IEdge<TRoot>> {
    edges: TEdge[]
    totalCount: number
    pageInfo: PageInfo
}

function Connection<TRootItem,TItem extends IEdge<TRootItem>>(TItemClass: ClassType<TItem>, TRootItemClass: ClassType<TRootItem>) {
    @ObjectType(`${TRootItemClass.name}Connection`,{ isAbstract: true })
    class Connection implements IConnection<TRootItem, TItem>{

        @Field(type => [TItemClass])
        edges: TItem[];

        @Field(type => Int,{nullable: false})
        totalCount: number

        @Field({nullable: false})
        pageInfo: PageInfo
    }
    return Connection
}

function Edge<TItem>(TItemClass: ClassType<TItem>) {
    @ObjectType(`${TItemClass.name}Edge`)
    class Edge implements IEdge<TItem>{
        @Field(type => TItemClass)
        node: TItem

        @Field({nullable: false})
        cursor: string
    }
    return Edge
}

export function Paginator<TItem>(itemClass: ClassType<TItem>) {
    const edge = Edge<TItem>(itemClass)
    type edge = InstanceType<typeof edge>
    const pagination = Connection<TItem,edge>(edge,itemClass)
    return {edge,pagination}
}

export type Direction = 'forward' | 'backward'

export async function PaginationTypeORMHandler<TRoot extends INode, TEdge extends IEdge<TRoot> ,TConnection extends IConnection<TRoot,TEdge>>(Ed: ClassType<TEdge>, Conn: ClassType<TConnection> , filterQuery: () => SelectQueryBuilder<TRoot>, paginator: (filterQuery: SelectQueryBuilder<TRoot>, direction: Direction, cursor: string) => Promise<SelectQueryBuilder<TRoot>>, direction: Direction, limit: number, cursor?: string ) : Promise<TConnection> {
    const qry = filterQuery()
    const count = await qry.getCount();
    const results = await (await paginator(qry.limit(limit), direction, cursor)).getMany();
    const connection = new Conn();
    const info = new PageInfo()
    connection.totalCount = count

    if (results.length === 0) {
        connection.edges = []
        info.hasPreviousPage = false
        info.hasNextPage = false
        connection.pageInfo = info
        return connection
    }
    const startCursor = results[0].opaqueId
    const lastCursor = results[results.length - 1].opaqueId
    info.endCursor = lastCursor
    info.startCursor = startCursor
    info.hasPreviousPage = (await (await paginator(filterQuery().limit(1), 'backward', startCursor)).getCount() > 0)
    info.hasNextPage = (await (await paginator(filterQuery().limit(1), 'forward', lastCursor)).getCount() > 0)

    connection.pageInfo = info
    connection.edges = results.map(e => {
        const ed = new Ed()
        ed.node = e
        ed.cursor = e.opaqueId
        return ed
    })
    return connection
}

