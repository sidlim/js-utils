/**
 * An Transition Matrix class, for use in graphs. Stores edge information (weights, etc.)
 */
class Transition_Matrix {

    edge_matrix;

    /**
     * Build an adjacency matrix, storing data about edges.
     * @constructor
     * @param {*} [adj_matrix = []] If there's already a matrix encoding the edges, just use that.
     */
    constructor(adj_matrix = []) {
        
        this.vertex_count = adj_matrix.length;
        this.edge_matrix = adj_matrix;

    }

    /**
     * Get the neighbors (successors) of a vertex.
     * @param {number} vertex The vertex whose neighbors need to be found.
     * @returns {[]} The collection of neighboring (successor) vertices.
     */
    get_neighbors(vertex) {
        return(this.edge_matrix[vertex]);
    }

}
