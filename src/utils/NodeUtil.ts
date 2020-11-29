import { Node } from "./types";

class NodeUtil {

    public static nodesToCells(nodes: Node[][] | undefined, itinerary: Node[] | undefined): number[][] | undefined {
        if (!nodes || !itinerary) return

        /**
         * loop over the itinerary which contain the position of each cells which are the part of the itinerary
         * For the first cell, we will display the start itinerary in green which represents the room ( 3 )
         * For the last cell, we will display the end itinerary in red which represents the poi ( 2 )
         */
        for (const node of itinerary) {
            if (itinerary.indexOf(node) === 0) {
                nodes[node.y][node.x].entity = 3
            } else if (itinerary.indexOf(node) === itinerary.length - 1){
                nodes[node.y][node.x].entity = 2
            } else {
                nodes[node.y][node.x].entity = 5
            }

        }  
        return nodes.map(row => row.map(cell => cell.entity))
    }

}

export default NodeUtil