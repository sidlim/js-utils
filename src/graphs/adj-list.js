/**
 * An Adjacency List class, for use in graphs. Stores connectivity data.
 */
class Adjacency_List {

    /*
    edge_map;
    vertex_count = 0;
    */

    /**
     * Build an adjacency list.
     * @constructor
     * @param {number[][]} [adj_matrix = []] An adjacency matrix to convert into an adjacency list.
     * @param {Function} [key = (x) => x] A key function - returns true if the edge data represents a connection.
     */
    constructor(adj_matrix = null, key = (x) => x) {

        this.edge_map = [];

        if (adj_matrix != null) {
            this.edge_map = adj_matrix.map(function(neighbor_array) {
                return(neighbor_array.reduce(function (neighbor_set, neighbor_data, index) {
                    if (key(neighbor_data)) neighbor_set.push(index)
                }, []));
            })
        }
    }

    /**
     * Add a vertex to the graph after initialization.
     * @param {number[]} neighbors - A collection of the added vertex's neighboring vertices.
     */
    add_vertex(neighbors) {
        this.edge_map[this.vertex_count] = [... neighbors];
        this.vertex_count += 1;
    }

    /**
     * Get the neighbors (successors) of a vertex.
     * @param {number} vertex The vertex whose neighbors need to be found.
     * @returns {number[]} The collection (Set) of neighboring (successor) vertices.
     */
    get_neighbors(vertex) {
        return(this.edge_map[vertex]);
    }

}

export default Adjacency_List;