/**
 * An Transition Matrix class, for use in graphs. Stores edge information (weights, etc.)
 */
class Transition_Matrix {

    edge_matrix;
    vertex_count;

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
     * Add a vertex to the graph after initialization.
     * @param {number[]} neighbors A collection (array) consisting of neighbor data.
     */
    add_vertex(neighbors) {
        this.edge_matrix[this.vertex_count] = neighbors;
        this.vertex_count += 1;
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
