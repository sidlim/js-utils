var js_utils =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/assorted-utilities/sequence.js":
/*!********************************************!*\
  !*** ./src/assorted-utilities/sequence.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n * A Sequence class for better tools for iterables. Everything is done with deferred execution.\n */\nclass Sequence {\n\n    /**\n     * Construct a more functional iterable (generator).\n     * @constructor\n     * @param {Generator} iterable The iterable (generator) to convert.\n     */\n    constructor(iterable = null) {\n        if (iterable != null) {\n            this.iterable = iterable;\n        }\n        else {\n            this.iterable = function * () {return;}\n        }\n    }\n\n    /**\n     * Iterate over the object.\n     */\n    go() {\n\n        if (this.iterable[Symbol.iterator]) {\n            return(this.iterable[Symbol.iterator]());\n        }\n        else {\n            return(this.iterable());\n        }\n\n    }\n\n    /**\n     * Get an external iterator from an iterable (generator).\n     * @param {Iterable | Sequence} iterable The iterable (generator) to extract an iterator from\n     * @returns {Iterator} The iterable from the iterable (generator) object\n     */\n    static get_iterator(iterable) {\n\n        if (iterable[Symbol.iterator]) {\n            return(iterable[Symbol.iterator]());\n        }\n        else if (iterable instanceof Sequence) {\n            return(iterable.iterable())\n        }\n        else {\n            return(iterable());\n        }\n\n    }\n\n    /**\n     * Function to quickly wrap an iterable into a Sequence object\n     * @param {Iterable} iterable The Iterable object to wrap\n     */\n    static wrap(iterable) {\n        return(new Sequence(iterable));\n    }\n\n    /**\n     * Unwrap a sequence and expose the iterator inside.\n     * @returns {Iterator} The iterable from the sequence object.\n     */\n    unwrap() {\n\n        if (this.iterable[Symbol.iterator]) {\n            return(this.iterable[Symbol.iterator]);\n        }\n        else {\n            return(this.iterable);\n        }\n\n    }\n\n    /**\n     * Compose a function with an iterator - do Array.map on arbitrary iterators.\n     * @param {Function} mapping  The mapping to apply to each of the iterator values.\n     * @returns {Sequence} A sequence whose values are the provided mapping applied to the provided iterator.\n     */\n    map(mapping) {\n\n        let gen = this.iterable;\n        \n        let mapped_iterable = function * () {\n        \n            let index = 0;\n            let preimage = Sequence.get_iterator(gen);\n            let iter_output = preimage.next();\n\n            while (!iter_output.done) {\n                yield mapping(iter_output.value, index);\n                iter_output = preimage.next();\n                index++;\n            }\n        \n            return;\n        }\n        \n        return(new Sequence(mapped_iterable));\n    }\n\n    /**\n     * Filter out values from an iterator - do Array.filter on arbitrary iterators.\n     * @param {Function} key The function describing whether to keep a value or not.\n     * @returns {Sequence} A sequence filtering out values according to the key function.\n     */\n    filter(key) {\n        \n        let gen = this.iterable;\n        \n        let filtered_iterable = function * () {\n\n            let index = 0;\n            let preimage = Sequence.get_iterator(gen);\n            let iter_output = preimage.next();\n\n            while (!iter_output.done) {\n                if (key(iter_output.value, index)) {\n                    yield iter_output.value;\n                }\n                iter_output = preimage.next();\n                index++;\n            }\n            \n            return;\n        }\n        \n        return(new Sequence(filtered_iterable));\n    }\n\n    /**\n     * Slice an iterator - just like Array.slice, but both a start and an end must be provided. \n     * If both bounds are finite, the iterable will also be finite, making behavior different from just filtering on element index.\n     * @param {number} [start = 0] The start index for the slice (inclusive).\n     * @param {number} [end = Infinity] The end index for the slice (exclusive).\n     * @returns {Sequence} The sliced iterator. If the bounds are finite, the iterable will also be finite.\n     */\n    slice(start = 0, end = Infinity) {\n        \n        let gen = this.iterable;\n        \n        let sliced_iterable = function * () {\n\n            let index = 0;\n            let preimage = Sequence.get_iterator(gen);\n            let iter_output = preimage.next();\n\n            while (!iter_output.done && index < end) {\n                if (index >= start && index < end) {\n                    yield iter_output.value;\n                }\n                iter_output = preimage.next();\n                index++;\n            }\n            \n            return;\n        }\n        return(new Sequence(sliced_iterable));\n    }\n\n    /**\n     * Concatenate an iterable (generator) to the sequence.\n     * @param {Iterable[] | Sequence[]} iterables The iterables (generators) to concatenate to the sequence.\n     * @returns {Sequence} The concatenated sequence.\n     */\n    concat(...iterables) {\n        \n        let gen = this.iterable;\n\n        let concat_iterable = function * () {\n\n            let prefix = Sequence.get_iterator(gen);\n            let suffixes = iterables;\n\n            yield * prefix;\n            for (let iterable of suffixes) {\n                yield * Sequence.get_iterator(iterable);\n            }\n            return;\n\n        }\n\n        return(new Sequence(concat_iterable));\n    }\n\n\n    /**\n     * Zip together two sequences.\n     * @param {Iterable} iterable The second sequence to use for the zip operation.\n     * @param {*} [packager = (x,y) => [x,y]] The function describing how to package the sequences. \n     * @returns {Sequence} A sequence of elements zipped together as described by the packager function.\n     */\n    zip(iterable, packager = (x, y) => [x, y]) {\n\n        let gen = this.iterable;\n\n        let zip_iterable = function * () {\n\n            let x_iter = Sequence.get_iterator(gen);\n            let y_iter = Sequence.get_iterator(iterable);\n            let x_output = x_iter.next();\n            let y_output = y_iter.next();\n\n            while (!x_output.done && !y_output.done) {\n                yield packager(x_output.value, y.output.value);\n                x_output = x_iter.next();\n                y_output = y_iter.next();\n            }\n\n            return;\n        }\n\n        return(new Sequence(zip_iterable));\n    }\n\n    /**\n     * Integrate a sequence - create a new sequence given a reduction.\n     * @param {Function} reduction The reduction to apply to the sequence.\n     * @param {*} base_case The base case of the reduction.\n     * @returns {Sequence} A reduction of the sequence, term by term. It's kind of like riemann summing, hence \"Integrate\".\n     */\n    integrate(reduction, base_case) {\n\n        let gen = this.iterable;\n\n        let integrated_iterator = function * () {\n\n            let preimage = Sequence.get_iterator(gen);\n            let integrated_value = base_case;\n            let iter_output = preimage.next();\n\n            while (!iter_output.done) {\n\n                yield integrated_value;\n                integrated_value = reduction(iter_output.value, integrated_value);\n                iter_output = preimage.next();\n\n            }\n\n            return;\n        }\n\n        return(new Sequence(integrated_iterator));\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Sequence);\n\n//# sourceURL=webpack://js_utils/./src/assorted-utilities/sequence.js?");

/***/ }),

/***/ "./src/data-containers/disjoint-set.js":
/*!*********************************************!*\
  !*** ./src/data-containers/disjoint-set.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Up_Tree_Node {\n\n    /*\n    is_root = true;\n    parent = null;\n    data = null;\n    */\n\n    constructor(data) {\n        this.data = data;\n        this.is_root = true;\n        this.parent = null;\n    }\n\n    set_parent(parent) {\n        this.is_root = false;\n        this.parent = parent;\n    }\n\n    get_root() {\n        let curr = this;\n        let move_nodes = [];\n\n        while (!curr.is_root) {\n            move_nodes.push(curr);\n            curr = curr.parent;\n        }\n\n        for (var node of move_nodes) {\n            node.set_parent(curr);\n        }\n\n        return(curr);\n    }\n\n}\n\nclass Disjoint_Set {\n\n    constructor() {\n        this.node_map = new Map();\n        this.data_container = [];\n        this.element_count = 0;\n    }\n\n    add_member(data) {\n        let node_label = this.element_count++;\n        this.node_map.set(data, new Up_Tree_Node(node_label));\n        this.data_container[node_label] = data;\n    }\n\n    union(... members) {\n        if (members.length > 1) {\n            for (let i = 1; i < members.length; i++) {\n                let eventual_child = this.node_map.get(members[i]);\n                let eventual_parent = this.node_map.get(members[i - 1]);\n                if (eventual_child.get_root() != eventual_parent.get_root()) {\n                    eventual_child.set_parent(eventual_parent);\n                }\n            }\n        }\n    }\n\n    /*\n     * The following function is dangerous: if someone computes a set \n    * representative, reassigns a different representative, and computes\n    * again, the same set will now have two different representatives.\n    * For now, I think the wise thing to do is just to exclude this function \n    * and ask people to be conscious of the order in which they perform union.\n    make_set_representative(data) {\n        let member = this.node_map.get(data);\n        let representative = member.get_root();\n\n        representative.is_root = false;\n        representative.parent = member;\n        member.is_root = true;\n    }\n    */\n\n    get_set_representative(data) {\n        return(this.data_container[this.node_map.get(data).get_root().data]);\n    }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Disjoint_Set);\n\n//# sourceURL=webpack://js_utils/./src/data-containers/disjoint-set.js?");

/***/ }),

/***/ "./src/data-containers/queue.js":
/*!**************************************!*\
  !*** ./src/data-containers/queue.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n * A queue class built on an array.\n */\nclass Queue {\n\n    /*\n    size = 0;\n    element_count = 0;\n    container;\n    head_idx = 0;\n    tail_idx = 0;\n    get = this.dequeue;\n    */\n\n    /**\n     * Builds a queue.\n     * @constructor\n     * @param {number} [queue_size = 1000] The initial queue capacity.\n     */\n    constructor(queue_size = 1000) {\n        this.size = queue_size;\n        this.container = [];\n        this.container.length = queue_size;\n        this.head_idx = 0;\n        this.tail_idx = 0;\n        this.element_count = 0;\n        this.get = this.dequeue;\n    }\n\n    /**\n     * Find the index of the next element in the queue.\n     * TODO: Make this a private method when support increases.\n     * @param {number} pos The current position in the queue.\n     * @returns {number} The next position in the queue.\n     */\n    inc_queue_ptr(pos) {\n        return((pos + 1) % this.size);\n    }\n\n    /**\n     * Find out if the queue is full.\n     * @returns {boolean} True if the queue is full.\n     */\n    is_full() {\n        return(this.size == this.element_count);\n    }\n\n    /**\n     * Double the capacity of the queue.\n     */\n    resize() {\n        let prefix = []\n        let suffix = []\n        if (this.head_idx <= this.tail_idx) {\n            prefix = this.container.slice(this.tail_idx, this.container.length);\n            suffix = this.container.slice(0, this.head_idx);\n        }\n        else {\n            prefix = this.container.slice(this.tail_idx, this.head_idx + 1);\n        }\n        this.container = prefix.concat(suffix);\n        this.head_idx = this.container.length;\n        this.tail_idx = 0;\n        this.container.length = 2 * this.size;\n        this.size = 2 * this.size;\n    }\n\n    /**\n     * Find out if the queue is empty.\n     * @returns {boolean} True if the queue is empty.\n     */\n    is_empty() {\n        return(this.element_count == 0);\n    }\n\n    /**\n     * Add an element to the queue.\n     * @param {*} element The element to insert into the queue.\n     */\n    enqueue(element) {\n        if (this.is_full()) {\n            this.resize()\n        }\n        this.element_count++;\n        this.container[this.head_idx] = element;\n        this.head_idx = this.inc_queue_ptr(this.head_idx);\n    }\n\n    /**\n     * Remove an element from the queue.\n     * @returns {*} The element removed from the queue.\n     */\n    dequeue() {\n        if (this.is_empty()) {\n            throw new Error(\"Queue is empty\");\n        }\n        this.element_count--;\n        let element = this.container[this.tail_idx];\n        this.tail_idx = this.inc_queue_ptr(this.tail_idx);\n        return(element);\n    }\n\n    /**\n     * Add multiple elements to the queue.\n     * @param {Iterable} elements As an iterable, the collection of elements to add to the queue.\n     */\n    put(elements) {\n\n        let element;\n        for (element of elements) {\n            this.enqueue(element)\n        }\n    }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Queue);\n\n//# sourceURL=webpack://js_utils/./src/data-containers/queue.js?");

/***/ }),

/***/ "./src/data-containers/stack.js":
/*!**************************************!*\
  !*** ./src/data-containers/stack.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n * A Stack class built on an array.\n */\nclass Stack {\n\n    /*\n    size = 0;\n    element_count = 0;\n    container;\n    head_idx = 0;\n    get = this.pop;\n    */\n\n    /**\n     * Builds a Stack.\n     * @constructor\n     * @param {number} [stack_size = 1000] The initial stack capacity.\n     */\n    constructor(stack_size = 1000) {\n        this.size = stack_size;\n        this.container = [];\n        this.container.length = stack_size;\n        this.element_count = 0;\n        this.head_idx = 0;\n        this.get = this.pop;\n    }\n\n    /**\n     * Find out if the stack is full.\n     * @returns {boolean} True if the stack is full.\n     */\n    is_full() {\n        return(this.size == this.element_count);\n    }\n\n    /**\n     * Double the capacity of the stack.\n     */\n    resize() {\n        this.container.length = 2 * this.size;\n        this.size = 2 * this.size;\n    }\n\n    /**\n     * Find out if the stack is empty.\n     * @returns {boolean} True if the stack is empty.\n     */\n    is_empty() {\n        return(this.element_count == 0);\n    }\n\n    /**\n     * Add an element to the stack.\n     * @param {*} element The element to add to the stack.\n     */\n    push(element) {\n        if (this.is_full()) {\n            this.resize()\n        }\n        this.element_count++;\n        this.container[this.head_idx] = element;\n        this.head_idx++;\n    }\n\n    /**\n     * Remove an element from the stack.\n     * @returns {*} The element removed from the stack.\n     */\n    pop() {\n        if (this.is_empty()) {\n            throw new Error(\"Stack is empty\");\n        }\n        this.element_count--;\n        this.head_idx--;\n        let element = this.container[this.head_idx];\n        return(element);\n    }\n\n    /**\n     * Add multiple elements to the stack.\n     * @param {Iterable} elements As an iterable, the collection of elements to add to the stack.\n     */\n    put(elements) {\n\n        let element;\n        for (element of elements) {\n            this.push(element)\n        }\n    }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Stack);\n\n//# sourceURL=webpack://js_utils/./src/data-containers/stack.js?");

/***/ }),

/***/ "./src/graphs/adj-list.js":
/*!********************************!*\
  !*** ./src/graphs/adj-list.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n * An Adjacency List class, for use in graphs. Stores connectivity data.\n */\nclass Adjacency_List {\n\n    /*\n    edge_map;\n    vertex_count = 0;\n    */\n\n    /**\n     * Build an adjacency list.\n     * @constructor\n     * @param {number[][]} [adj_matrix = []] An adjacency matrix to convert into an adjacency list.\n     * @param {Function} [key = (x) => x] A key function - returns true if the edge data represents a connection.\n     */\n    constructor(adj_matrix = null, key = (x) => x) {\n\n        this.edge_map = [];\n\n        if (adj_matrix != null) {\n            this.edge_map = adj_matrix.map(function(neighbor_array) {\n                return(neighbor_array.reduce(function (neighbor_set, neighbor_data, index) {\n                    if (key(neighbor_data)) neighbor_set.push(index)\n                }, []));\n            })\n        }\n    }\n\n    /**\n     * Add a vertex to the graph after initialization.\n     * @param {number[]} neighbors - A collection of the added vertex's neighboring vertices.\n     */\n    add_vertex(neighbors) {\n        this.edge_map[this.vertex_count] = [... neighbors];\n        this.vertex_count += 1;\n    }\n\n    /**\n     * Get the neighbors (successors) of a vertex.\n     * @param {number} vertex The vertex whose neighbors need to be found.\n     * @returns {number[]} The collection (Set) of neighboring (successor) vertices.\n     */\n    get_neighbors(vertex) {\n        return(this.edge_map[vertex]);\n    }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Adjacency_List);\n\n//# sourceURL=webpack://js_utils/./src/graphs/adj-list.js?");

/***/ }),

/***/ "./src/graphs/graph.js":
/*!*****************************!*\
  !*** ./src/graphs/graph.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _adj_list_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./adj-list.js */ \"./src/graphs/adj-list.js\");\n/* harmony import */ var _data_containers_queue_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data-containers/queue.js */ \"./src/data-containers/queue.js\");\n\n\n\n/**\n * An unweighted Graph class. Stores vertex information and wraps the adjacency matrix and adjacency \n * list classes to provide functionality like search, ordering, dynamic programming, etc.\n */\nclass Graph {\n\n    /*\n    V_data;\n    E;\n    */\n\n    /**\n     * Build a Graph.\n     * @constructor\n     * @param {Adjacency_List} [E = null] The adjacency list that holds edge data.\n     * @param {Object} [V_data = {}] Vertex data, arranged as arrays that are slots of an object.\n     */\n    constructor(E = null, V_data = {}) {\n\n        this.V_data = V_data;\n        this.E = E;\n        \n        if (E == null) {\n            this.E = new _adj_list_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n        }\n\n    }\n\n    /**\n     * Add a vertex to the graph.\n     * @param {number[]} neighbors The neighbors of the node being added\n     * @param {Object} vertex_data Additional data to be added to the graph\n     */\n    add_vertex(neighbors, vertex_data = {}) {\n        this.E.add_vertex(neighbors);\n        for (var key in vertex_data) {\n            V_data[key][this.E.vertex_count] = vertex_data[key]\n        }\n    }\n\n    /**\n     * Calculate node outdegrees.\n     * @returns {number[]} List (array) of outdegrees of graph nodes.\n     */\n    calc_outdegrees() {\n        let out_deg = []\n        for (let i = 0; i < this.E.vertex_count; i++) {\n            out_deg[i] = this.E.get_neighbors(i).length;\n        }\n        return(out_deg);\n    }\n\n    /**\n     * Calcuate node outdegrees.\n     * @returns {number[]} List (array) of indegrees of graph nodes.\n     */\n    calc_indegrees() {\n        let vertex_count = this.E.vertex_count\n        let in_deg = new Array(vertex_count);\n        in_deg.fill(0);\n        for (let i = 0; i < vertex_count; i++) {\n            for (var vertex of this.E.get_neighbors(i)) {\n                in_deg[vertex]++;\n            }\n        }\n        return(in_deg);\n    }\n\n    /**\n     * Generator for a graph search ordering.\n     * @generator\n     * @param {*} start The node to start the ordering on\n     * @param {*} [data_structure = Queue] The data structure to use. Affects ordering (e.g., Stack -> DFS, Queue -> BFS, min-Heap -> Djikstra).\n     * @yields {number} The next node in the search ordering.\n     */\n    * search_from(start, data_structure = _data_containers_queue_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) {\n        \n        let ds = new data_structure();\n        ds.put([start]);\n        let visited = new Set();\n\n        while (!ds.is_empty()) {\n            let current_vertex = ds.get();\n            let F = this.E.get_neighbors(current_vertex).filter((v) => (!visited.has(v)));\n            ds.put(F);\n            visited.add(current_vertex);\n            yield current_vertex;\n        }\n    }\n\n    /**\n     * Generator for a topological ordering in a DAG.\n     * @generator\n     * @param {*} [data_structure = Queue] The data structure to use. Permutes ordering (up to topological order).\n     * @yields The next node in the generated topological ordering.\n     */\n    * topological_order(data_structure = _data_containers_queue_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) {\n\n        let ds = new data_structure();\n        let indegrees = this.calc_indegrees();\n        \n        // Make a frontier of source nodes (indegree is 0)\n        let F = indegrees.reduce(function (arr, node_indegree, node) {\n            if (node_indegree === 0) {\n                arr.push(node);\n            }\n            return(arr)\n        }, []);\n        if (F.length === 0) {\n            throw Error(\"Graph does not appear to be acyclic.\")\n        }\n        ds.put(F);\n\n        while(!ds.is_empty()) {\n            let current_vertex = ds.get();\n            for (var node of this.E.get_neighbors(current_vertex)) {\n                indegrees[node]--;\n                if (indegrees[node] === 0) {\n                    ds.put([node]);\n                }\n            }\n            yield current_vertex;\n        }\n\n    }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Graph);\n\n//# sourceURL=webpack://js_utils/./src/graphs/graph.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: Data_Containers, More_Math, Graph, Sequence */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Data_Containers\", function() { return Data_Containers; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"More_Math\", function() { return More_Math; });\n/* harmony import */ var _assorted_utilities_sequence_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assorted-utilities/sequence.js */ \"./src/assorted-utilities/sequence.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Sequence\", function() { return _assorted_utilities_sequence_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _data_containers_stack_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data-containers/stack.js */ \"./src/data-containers/stack.js\");\n/* harmony import */ var _data_containers_queue_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data-containers/queue.js */ \"./src/data-containers/queue.js\");\n/* harmony import */ var _data_containers_disjoint_set_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data-containers/disjoint-set.js */ \"./src/data-containers/disjoint-set.js\");\n/* harmony import */ var _graphs_graph_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./graphs/graph.js */ \"./src/graphs/graph.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Graph\", function() { return _graphs_graph_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]; });\n\n/* harmony import */ var _math_algebra_eq_rel_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./math/algebra/eq-rel.js */ \"./src/math/algebra/eq-rel.js\");\n/* harmony import */ var _math_algebra_group_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./math/algebra/group.js */ \"./src/math/algebra/group.js\");\n/* harmony import */ var _math_algebra_ring_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./math/algebra/ring.js */ \"./src/math/algebra/ring.js\");\n/* harmony import */ var _math_algebra_field_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./math/algebra/field.js */ \"./src/math/algebra/field.js\");\n\n\n\n\n\n\n\n\n\n\nlet Data_Containers = {\n    'Stack': _data_containers_stack_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    'Queue': _data_containers_queue_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n    'Disjoint_Set': _data_containers_disjoint_set_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n};\n\nlet More_Math = {\n    'Equivalence_Relation': _math_algebra_eq_rel_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n    'Group': _math_algebra_group_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n    'Ring': _math_algebra_ring_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n    'Field': _math_algebra_field_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]\n};\n\n\n\n//# sourceURL=webpack://js_utils/./src/index.js?");

/***/ }),

/***/ "./src/math/algebra/eq-rel.js":
/*!************************************!*\
  !*** ./src/math/algebra/eq-rel.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Equivalence_Relation {\n\n    /*\n    equals;\n    */\n\n    constructor(eq = (x, y) => (x == y)) {\n        this.equals = eq;\n    }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Equivalence_Relation);\n\n//# sourceURL=webpack://js_utils/./src/math/algebra/eq-rel.js?");

/***/ }),

/***/ "./src/math/algebra/field.js":
/*!***********************************!*\
  !*** ./src/math/algebra/field.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _eq_rel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eq-rel.js */ \"./src/math/algebra/eq-rel.js\");\n/* harmony import */ var _group_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./group.js */ \"./src/math/algebra/group.js\");\n\n\n\nclass Field extends _eq_rel_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n\n    /*\n    add;\n    additive_id;\n    additive_inv;\n    multiply;\n    multiplicative_id;\n    multiplicative_inv;\n    */\n\n    constructor(add_op, mul_op, add_id, mul_id, add_inv, mul_inv, eq_rel) {\n        super(eq_rel);\n\n        let add_group = new _group_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](add_op, add_id, add_inv, eq_rel);\n        let mul_group = new _group_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](mul_op, mul_id, mul_inv, eq_rel);\n        \n        this.add = function(... elements) {return(add_group.multiply(... elements))};\n        this.additive_id = function() {return(add_group.id())};\n        this.additive_inv = function(element) {return(add_group.inv(element))};\n\n        this.multiply = mul_group.multiply;\n        this.multiplicative_id = mul_group.id;\n        this.multiplicative_inv = mul_group.inv;\n    }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Field);\n\n//# sourceURL=webpack://js_utils/./src/math/algebra/field.js?");

/***/ }),

/***/ "./src/math/algebra/group.js":
/*!***********************************!*\
  !*** ./src/math/algebra/group.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _monoid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./monoid.js */ \"./src/math/algebra/monoid.js\");\n\n\nclass Group extends _monoid_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n\n    /*\n    inv;\n    */\n\n    constructor(op, id, inv, eq_rel) {\n        super(op, id, eq_rel);\n        this.inv = inv;\n    }\n\n    exp(base, power) {\n        if (power < 0) {\n            base = this.inv(base);\n            power = -power;\n        }\n        return(super.exp(base, power));\n    }\n\n    // TODO: Quotients require some form of a disjoint set data structure (basically a map from group elements to cosets)\n\n    static direct_product(... groups) {\n        \n        let eq_rel = function(x, y) {\n            return(groups.reduce(function(acc, group, index) {\n                return(acc && group.equals(x[index], y[index]))\n            }))\n        }\n\n        let prod_inv = function(element) {\n            return(element.map((g, i) => (groups[i].inv(g))));\n        }\n\n        let prod_id = groups.map(m => m.id());\n\n        let prod_op = function (l, r) {\n            return(l.map((group_el, index) => (groups[index].multiply(group_el, r[index]))))\n        }\n\n        return(new Group(prod_op, prod_id, prod_inv, eq_rel));\n\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Group);\n\n//# sourceURL=webpack://js_utils/./src/math/algebra/group.js?");

/***/ }),

/***/ "./src/math/algebra/monoid.js":
/*!************************************!*\
  !*** ./src/math/algebra/monoid.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _eq_rel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eq-rel.js */ \"./src/math/algebra/eq-rel.js\");\n\n\nclass Monoid extends _eq_rel_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n\n    /*\n    id_el;\n    op_fn;\n    */\n\n    constructor(op, id, eq_rel) {\n        super(eq_rel);\n        this.op_fn = op;\n        this.id_el = id;\n    };\n\n    multiply(... elements) {\n        return(elements.reduce(this.op_fn, this.id_el))\n    }\n\n    exp(base, power) {\n\n        // TODO: Make this work for BigInts\n        // power = BigInt(power);\n        let result = this.id_el;\n        let bit_mask = 1 << Math.ceil(Math.log2(1 + power));\n\n        while (bit_mask > 0) {\n            \n            result = this.multiply(result, result);\n            \n            if (bit_mask & power) {\n                result = this.multiply(base, result);\n            }\n\n            bit_mask = bit_mask >> 1;\n        }\n\n        return(result);\n    }\n\n    id() {\n        return(this.id_el);\n    }\n\n    static direct_product(... monoids) {\n\n        let eq_rel = function(x, y) {\n            return(monoids.reduce(function(acc, monoid, index) {\n                return(acc && monoid.equals(x[index], y[index]))\n            }))\n        }\n        let prod_id = monoids.map(m => m.id());\n\n        let prod_op = function (l, r) {\n            return(l.map((el, index) => (monoids[index].multiply(el, r[index]))))\n        }\n\n        return(new Monoid(prod_op, prod_id, eq_rel));\n    }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Monoid);\n\n//# sourceURL=webpack://js_utils/./src/math/algebra/monoid.js?");

/***/ }),

/***/ "./src/math/algebra/ring.js":
/*!**********************************!*\
  !*** ./src/math/algebra/ring.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _eq_rel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eq-rel.js */ \"./src/math/algebra/eq-rel.js\");\n/* harmony import */ var _monoid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./monoid.js */ \"./src/math/algebra/monoid.js\");\n/* harmony import */ var _group_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./group.js */ \"./src/math/algebra/group.js\");\n\n\n\n\nclass Ring extends _eq_rel_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n\n    /*\n    add;\n    additive_id;\n    additive_inv;\n    multiply;\n    multiplicative_id;\n    */\n\n    constructor(add_op, mul_op, add_id, mul_id, add_inv, eq_rel) {\n        super(eq_rel);\n\n        let add_group = new _group_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](add_op, add_id, add_inv, eq_rel);\n        let mul_monoid = new _monoid_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](mul_op, mul_id, eq_rel);\n        \n        this.add = add_group.multiply;\n        this.additive_id = add_group.id;\n        this.additive_inv = add_group.inv;\n\n        this.multiply = mul_monoid.multiply;\n        this.multiplicative_id = mul_monoid.id;\n    }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Ring);\n\n//# sourceURL=webpack://js_utils/./src/math/algebra/ring.js?");

/***/ })

/******/ });