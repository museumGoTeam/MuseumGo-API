export interface Node {
    x: number,
    y: number,
    entity: number,
    distance: number,
    isVisited: boolean,
    previous: Node | null
}