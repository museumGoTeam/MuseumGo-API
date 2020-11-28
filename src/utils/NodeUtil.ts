import { Node } from "./types";

class NodeUtil {

    public static nodesToCells(nodes: Node[][] | undefined, nodeInShortestPathOrder: Node[] | undefined): number[][] | undefined {
        if (!nodes || !nodeInShortestPathOrder) return
        //Clear the previous itinerary
        const updatedNodes = nodes.map(row => row.map(cell => cell.entity === 5 ? {...cell, entity: 0}: cell))
        for (const node of nodeInShortestPathOrder) {
            nodes[node.y][node.x].entity = 5
        }
        return updatedNodes.map(row => row.map(cell => cell.entity))
    }

}

export default NodeUtil