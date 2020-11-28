import FileUtil from "./FileUtil";
import { Node } from "./types";

class Dijkstra {
    private fileName: string
    private _nodes: Node[][] | undefined
    private _startNode: Node | undefined
    private _endNode: Node | undefined

    constructor(fileName: string) {
        this.fileName = fileName
    }

    public async init(): Promise<void> {
        if (!this.fileName) throw new Error("Filename is undefined please instanciate it when creating new instance of Dijkstra")
        this._nodes = await FileUtil.fileToNodes(this.fileName);
        this._startNode = this._nodes[0][0]
        this._endNode = this._nodes[this._nodes.length - 1][this._nodes[0].length - 1]
        this.getVisitedNodesInOrder()
    }

    public getVisitedNodesInOrder(): void {
        if (!this._nodes || !this._startNode || !this._endNode) return
        const visitedNodesInOrder: Node[] = []
        this._startNode.distance = 0
        const unvisitedNodes = this.getAllNodes(this._nodes)
        while (!!unvisitedNodes.length) {
            this.sortNodesByDistance(unvisitedNodes)
            const closestNode = unvisitedNodes.shift()
            if (closestNode) {
                if (closestNode.entity === 1) continue
                if (closestNode.distance === Infinity) return
                closestNode.isVisited = true
                visitedNodesInOrder.push(closestNode)
                if (closestNode === this._endNode) return
                this.updateUnvisitedNeighbors(closestNode, this._nodes)
            }
        }
    }


    public generate(): Node[] | undefined {
        if (!this._endNode) return
        const nodeInShortestPathOrder: Node[] = []
        let currentNode: Node | null = this._endNode
        while(currentNode !== null) {
            nodeInShortestPathOrder.unshift(currentNode)
            currentNode = currentNode.previous
        }
        return nodeInShortestPathOrder
    }

    private updateUnvisitedNeighbors(node: Node, grid: Node[][]): void {
        const unvisitedNeighbors = this.getUnvisitedNeighbors(node, grid)
        for (const neighbor of unvisitedNeighbors) {
            neighbor.distance = node.distance + 1
            neighbor.previous = node
        }
    }

    private getUnvisitedNeighbors(node: Node, grid: Node[][]): Node[] {
        const neighbors: Node[] = []
        const {x,y} = node
        if (y > 0 ) neighbors.push(grid[y - 1][x])
        if (y < grid.length - 1) neighbors.push(grid[y +  1][x])
        if (x > 0) neighbors.push(grid[y][x - 1])
        if (x < grid[0].length - 1) neighbors.push(grid[y][x + 1])
        return neighbors.filter(neighbor => !neighbor.isVisited)
    }

    private sortNodesByDistance(unvisitedNodes: Node[]): void{
        unvisitedNodes.sort((currentNode, nextNode) => currentNode.distance - nextNode.distance)
    }
    
    private getAllNodes(grid: Node[][]): Node[] {
        const nodes = []
        for (const row of grid) {
            for (const node of row) {
                nodes.push(node)
            }
        }
        return nodes
    }


    get startNode(): Node | undefined {return this._startNode}
    get endNode(): Node | undefined {return this._endNode}
    get nodes(): Node[][] | undefined {return this._nodes}
}

export default Dijkstra