import Adjacency_List from './adj-list.js';

/**
 * An unweighted Graph class. Stores vertex information and wraps the adjacency matrix and adjacency 
 * list classes to provide functionality like search, ordering, dynamic programming, etc.
 */
class Graph {

    V_data;
    E;

    /**
     * Build a Graph.
     * @constructor
     * @param {Adjacency_List} [E = null] The adjacency list that holds edge data.
     * @param {Object} [V_data = {}] Vertex data, arranged as arrays that are slots of an object.
     */
    constructor(E = null, V_data = {}) {

        this.V_data = V_data;
        this.E = E;
        
        if (E == null) {
            this.E = new Adjacency_List();
        }

    }

    /**
     * Add a vertex to the graph.
     * @param {number[]} neighbors The neighbors of the node being added
     * @param {Object} vertex_data Additional data to be added to the graph
     */
    add_vertex(neighbors, vertex_data = {}) {
        this.E.add_vertex(neighbors);
        for (var key in vertex_data) {
            V_data[key][this.E.vertex_count] = vertex_data[key]
        }
    }

    /**
     * Calculate node outdegrees.
     * @returns {number[]} List (array) of outdegrees of graph nodes.
     */
    calc_outdegrees() {
        let out_deg = []
        for (let i = 0; i < this.E.vertex_count; i++) {
            out_deg[i] = this.E.get_neighbors(i).length;
        }
        return(out_deg);
    }

    /**
     * Calcuate node outdegrees.
     * @returns {number[]} List (array) of indegrees of graph nodes.
     */
    calc_indegrees() {
        let vertex_count = this.E.vertex_count
        let in_deg = new Array(vertex_count);
        in_deg.fill(0);
        for (let i = 0; i < vertex_count; i++) {
            for (var vertex of this.E.get_neighbors(i)) {
                in_deg[vertex]++;
            }
        }
        return(in_deg);
    }

    /**
     * Generator for a graph search ordering.
     * @generator
     * @param {*} start The node to start the ordering on
     * @param {*} [data_structure = Queue] The data structure to use. Affects ordering (e.g., Stack -> DFS, Queue -> BFS, min-Heap -> Djikstra).
     * @yields {number} The next node in the search ordering.
     */
    * search_from(start, data_structure = Queue) {
        
        let ds = new data_structure();
        ds.put([start]);
        let visited = new Set();

        while (!ds.is_empty()) {
            let current_vertex = ds.get();
            let F = this.E.get_neighbors(current_vertex).filter((v) => (!visited.has(v)));
            ds.put(F);
            visited.add(current_vertex);
            yield current_vertex;
        }
    }

    /**
     * Generator for a topological ordering in a DAG.
     * @generator
     * @param {*} [data_structure = Queue] The data structure to use. Permutes ordering (up to topological order).
     * @yields The next node in the generated topological ordering.
     */
    * topological_order(data_structure = Queue) {

        let ds = new data_structure();
        let indegrees = this.calc_indegrees();
        
        // Make a frontier of source nodes (indegree is 0)
        let F = indegrees.reduce(function (arr, node_indegree, node) {
            if (node_indegree === 0) {
                arr.push(node);
            }
            return(arr)
        }, []);
        if (F.length === 0) {
            throw Error("Graph does not appear to be acyclic.")
        }
        ds.put(F);

        while(!ds.is_empty()) {
            let current_vertex = ds.get();
            for (var node of this.E.get_neighbors(current_vertex)) {
                indegrees[node]--;
                if (indegrees[node] === 0) {
                    ds.put([node]);
                }
            }
            yield current_vertex;
        }

    }

}

export default Graph;