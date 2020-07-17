# js-utils
A set of tools to make the creation of web content easier.
## Classes

<dl>
<dt><a href="#Sequence">Sequence</a></dt>
<dd><p>A Sequence class for better tools for iterables. Everything is done with deferred execution.</p>
</dd>
<dt><a href="#Stack">Stack</a></dt>
<dd><p>A Stack class built on an array.</p>
</dd>
<dt><a href="#Queue">Queue</a></dt>
<dd><p>A queue class built on an array.</p>
</dd>
<dt><a href="#Adjacency_List">Adjacency_List</a></dt>
<dd><p>An Adjacency List class, for use in graphs. Stores connectivity data.</p>
</dd>
<dt><a href="#Graph">Graph</a></dt>
<dd><p>An unweighted Graph class. Stores vertex information and wraps the adjacency matrix and adjacency 
list classes to provide functionality like search, ordering, dynamic programming, etc.</p>
</dd>
</dl>

<a name="Sequence"></a>

## Sequence
A Sequence class for better tools for iterables. Everything is done with deferred execution.

**Kind**: global class  

* [Sequence](#Sequence)
    * [new Sequence(iterable)](#new_Sequence_new)
    * _instance_
        * [.go()](#Sequence+go)
        * [.map(mapping)](#Sequence+map) ⇒ [<code>Sequence</code>](#Sequence)
        * [.filter(key)](#Sequence+filter) ⇒ [<code>Sequence</code>](#Sequence)
        * [.slice([start], [end])](#Sequence+slice) ⇒ [<code>Sequence</code>](#Sequence)
        * [.concat(...iterables)](#Sequence+concat) ⇒ [<code>Sequence</code>](#Sequence)
        * [.zip(iterable, [packager])](#Sequence+zip) ⇒ [<code>Sequence</code>](#Sequence)
        * [.integrate(reduction, base_case)](#Sequence+integrate) ⇒ [<code>Sequence</code>](#Sequence)
    * _static_
        * [.get_iterator(The)](#Sequence.get_iterator) ⇒ <code>Iterator</code>

<a name="new_Sequence_new"></a>

### new Sequence(iterable)
Construct a more functional iterable (generator).


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| iterable | <code>Generator</code> | <code></code> | The iterable (generator) to convert. |

<a name="Sequence+go"></a>

### sequence.go()
Iterate over the object.

**Kind**: instance method of [<code>Sequence</code>](#Sequence)  
<a name="Sequence+map"></a>

### sequence.map(mapping) ⇒ [<code>Sequence</code>](#Sequence)
Compose a function with an iterator - do Array.map on arbitrary iterators.

**Kind**: instance method of [<code>Sequence</code>](#Sequence)  
**Returns**: [<code>Sequence</code>](#Sequence) - A sequence whose values are the provided mapping applied to the provided iterator.  

| Param | Type | Description |
| --- | --- | --- |
| mapping | <code>function</code> | The mapping to apply to each of the iterator values. |

<a name="Sequence+filter"></a>

### sequence.filter(key) ⇒ [<code>Sequence</code>](#Sequence)
Filter out values from an iterator - do Array.filter on arbitrary iterators.

**Kind**: instance method of [<code>Sequence</code>](#Sequence)  
**Returns**: [<code>Sequence</code>](#Sequence) - A sequence filtering out values according to the key function.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>function</code> | The function describing whether to keep a value or not. |

<a name="Sequence+slice"></a>

### sequence.slice([start], [end]) ⇒ [<code>Sequence</code>](#Sequence)
Slice an iterator - just like Array.slice, but both a start and an end must be provided. 
If both bounds are finite, the iterable will also be finite, making behavior different from just filtering on element index.

**Kind**: instance method of [<code>Sequence</code>](#Sequence)  
**Returns**: [<code>Sequence</code>](#Sequence) - The sliced iterator. If the bounds are finite, the iterable will also be finite.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [start] | <code>number</code> | <code>0</code> | The start index for the slice (inclusive). |
| [end] | <code>number</code> | <code>Infinity</code> | The end index for the slice (exclusive). |

<a name="Sequence+concat"></a>

### sequence.concat(...iterables) ⇒ [<code>Sequence</code>](#Sequence)
Concatenate an iterable (generator) to the sequence.

**Kind**: instance method of [<code>Sequence</code>](#Sequence)  
**Returns**: [<code>Sequence</code>](#Sequence) - The concatenated sequence.  

| Param | Type | Description |
| --- | --- | --- |
| ...iterables | <code>Array.&lt;Iterable&gt;</code> \| [<code>Array.&lt;Sequence&gt;</code>](#Sequence) | The iterables (generators) to concatenate to the sequence. |

<a name="Sequence+zip"></a>

### sequence.zip(iterable, [packager]) ⇒ [<code>Sequence</code>](#Sequence)
Zip together two sequences.

**Kind**: instance method of [<code>Sequence</code>](#Sequence)  
**Returns**: [<code>Sequence</code>](#Sequence) - A sequence of elements zipped together as described by the packager function.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| iterable | <code>Iterable</code> |  | The second sequence to use for the zip operation. |
| [packager] | <code>\*</code> | <code>(x,y) &#x3D;&gt; [x,y]</code> | The function describing how to package the sequences. |

<a name="Sequence+integrate"></a>

### sequence.integrate(reduction, base_case) ⇒ [<code>Sequence</code>](#Sequence)
Integrate a sequence - create a new sequence given a reduction.

**Kind**: instance method of [<code>Sequence</code>](#Sequence)  
**Returns**: [<code>Sequence</code>](#Sequence) - A reduction of the sequence, term by term. It's kind of like riemann summing, hence "Integrate".  

| Param | Type | Description |
| --- | --- | --- |
| reduction | <code>function</code> | The reduction to apply to the sequence. |
| base_case | <code>\*</code> | The base case of the reduction. |

<a name="Sequence.get_iterator"></a>

### Sequence.get\_iterator(The) ⇒ <code>Iterator</code>
Get an external iterator from an iterable (generator).

**Kind**: static method of [<code>Sequence</code>](#Sequence)  
**Returns**: <code>Iterator</code> - The iterator from the iterable (generator) object  

| Param | Type | Description |
| --- | --- | --- |
| The | <code>Iterable</code> \| [<code>Sequence</code>](#Sequence) | iterable (generator) to extract an iterator from |

<a name="Stack"></a>

## Stack
A Stack class built on an array.

**Kind**: global class  

* [Stack](#Stack)
    * [new Stack([stack_size])](#new_Stack_new)
    * [.is_full()](#Stack+is_full) ⇒ <code>boolean</code>
    * [.resize()](#Stack+resize)
    * [.is_empty()](#Stack+is_empty) ⇒ <code>boolean</code>
    * [.push(element)](#Stack+push)
    * [.pop()](#Stack+pop) ⇒ <code>\*</code>
    * [.put(elements)](#Stack+put)

<a name="new_Stack_new"></a>

### new Stack([stack_size])
Builds a Stack.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [stack_size] | <code>number</code> | <code>1000</code> | The initial stack capacity. |

<a name="Stack+is_full"></a>

### stack.is\_full() ⇒ <code>boolean</code>
Find out if the stack is full.

**Kind**: instance method of [<code>Stack</code>](#Stack)  
**Returns**: <code>boolean</code> - True if the stack is full.  
<a name="Stack+resize"></a>

### stack.resize()
Double the capacity of the stack.

**Kind**: instance method of [<code>Stack</code>](#Stack)  
<a name="Stack+is_empty"></a>

### stack.is\_empty() ⇒ <code>boolean</code>
Find out if the stack is empty.

**Kind**: instance method of [<code>Stack</code>](#Stack)  
**Returns**: <code>boolean</code> - True if the stack is empty.  
<a name="Stack+push"></a>

### stack.push(element)
Add an element to the stack.

**Kind**: instance method of [<code>Stack</code>](#Stack)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>\*</code> | The element to add to the stack. |

<a name="Stack+pop"></a>

### stack.pop() ⇒ <code>\*</code>
Remove an element from the stack.

**Kind**: instance method of [<code>Stack</code>](#Stack)  
**Returns**: <code>\*</code> - The element removed from the stack.  
<a name="Stack+put"></a>

### stack.put(elements)
Add multiple elements to the stack.

**Kind**: instance method of [<code>Stack</code>](#Stack)  

| Param | Type | Description |
| --- | --- | --- |
| elements | <code>Iterable</code> | As an iterable, the collection of elements to add to the stack. |

<a name="Queue"></a>

## Queue
A queue class built on an array.

**Kind**: global class  

* [Queue](#Queue)
    * [new Queue([queue_size])](#new_Queue_new)
    * [.inc_queue_ptr(pos)](#Queue+inc_queue_ptr) ⇒ <code>number</code>
    * [.is_full()](#Queue+is_full) ⇒ <code>boolean</code>
    * [.resize()](#Queue+resize)
    * [.is_empty()](#Queue+is_empty) ⇒ <code>boolean</code>
    * [.enqueue(element)](#Queue+enqueue)
    * [.dequeue()](#Queue+dequeue) ⇒ <code>\*</code>
    * [.put(elements)](#Queue+put)

<a name="new_Queue_new"></a>

### new Queue([queue_size])
Builds a queue.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [queue_size] | <code>number</code> | <code>1000</code> | The initial queue capacity. |

<a name="Queue+inc_queue_ptr"></a>

### queue.inc\_queue\_ptr(pos) ⇒ <code>number</code>
Find the index of the next element in the queue.
TODO: Make this a private method when support increases.

**Kind**: instance method of [<code>Queue</code>](#Queue)  
**Returns**: <code>number</code> - The next position in the queue.  

| Param | Type | Description |
| --- | --- | --- |
| pos | <code>number</code> | The current position in the queue. |

<a name="Queue+is_full"></a>

### queue.is\_full() ⇒ <code>boolean</code>
Find out if the queue is full.

**Kind**: instance method of [<code>Queue</code>](#Queue)  
**Returns**: <code>boolean</code> - True if the queue is full.  
<a name="Queue+resize"></a>

### queue.resize()
Double the capacity of the queue.

**Kind**: instance method of [<code>Queue</code>](#Queue)  
<a name="Queue+is_empty"></a>

### queue.is\_empty() ⇒ <code>boolean</code>
Find out if the queue is empty.

**Kind**: instance method of [<code>Queue</code>](#Queue)  
**Returns**: <code>boolean</code> - True if the queue is empty.  
<a name="Queue+enqueue"></a>

### queue.enqueue(element)
Add an element to the queue.

**Kind**: instance method of [<code>Queue</code>](#Queue)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>\*</code> | The element to insert into the queue. |

<a name="Queue+dequeue"></a>

### queue.dequeue() ⇒ <code>\*</code>
Remove an element from the queue.

**Kind**: instance method of [<code>Queue</code>](#Queue)  
**Returns**: <code>\*</code> - The element removed from the queue.  
<a name="Queue+put"></a>

### queue.put(elements)
Add multiple elements to the queue.

**Kind**: instance method of [<code>Queue</code>](#Queue)  

| Param | Type | Description |
| --- | --- | --- |
| elements | <code>Iterable</code> | As an iterable, the collection of elements to add to the queue. |

<a name="Adjacency_List"></a>

## Adjacency\_List
An Adjacency List class, for use in graphs. Stores connectivity data.

**Kind**: global class  

* [Adjacency_List](#Adjacency_List)
    * [new Adjacency_List([adj_matrix], [key])](#new_Adjacency_List_new)
    * [.add_vertex(neighbors)](#Adjacency_List+add_vertex)
    * [.get_neighbors(vertex)](#Adjacency_List+get_neighbors) ⇒ <code>Array.&lt;number&gt;</code>

<a name="new_Adjacency_List_new"></a>

### new Adjacency\_List([adj_matrix], [key])
Build an adjacency list.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [adj_matrix] | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | <code>[]</code> | An adjacency matrix to convert into an adjacency list. |
| [key] | <code>function</code> | <code>(x) &#x3D;&gt; x</code> | A key function - returns true if the edge data represents a connection. |

<a name="Adjacency_List+add_vertex"></a>

### adjacency_List.add\_vertex(neighbors)
Add a vertex to the graph after initialization.

**Kind**: instance method of [<code>Adjacency\_List</code>](#Adjacency_List)  

| Param | Type | Description |
| --- | --- | --- |
| neighbors | <code>Array.&lt;number&gt;</code> | A collection of the added vertex's neighboring vertices. |

<a name="Adjacency_List+get_neighbors"></a>

### adjacency_List.get\_neighbors(vertex) ⇒ <code>Array.&lt;number&gt;</code>
Get the neighbors (successors) of a vertex.

**Kind**: instance method of [<code>Adjacency\_List</code>](#Adjacency_List)  
**Returns**: <code>Array.&lt;number&gt;</code> - The collection (Set) of neighboring (successor) vertices.  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>number</code> | The vertex whose neighbors need to be found. |

<a name="Graph"></a>

## Graph
An unweighted Graph class. Stores vertex information and wraps the adjacency matrix and adjacency 
list classes to provide functionality like search, ordering, dynamic programming, etc.

**Kind**: global class  

* [Graph](#Graph)
    * [.add_vertex(neighbors, vertex_data)](#Graph+add_vertex)
    * [.calc_outdegrees()](#Graph+calc_outdegrees) ⇒ <code>Array.&lt;number&gt;</code>
    * [.calc_indegrees()](#Graph+calc_indegrees) ⇒ <code>Array.&lt;number&gt;</code>
    * [.search_from(start, [data_structure])](#Graph+search_from)
    * [.topological_order([data_structure])](#Graph+topological_order)

<a name="Graph+add_vertex"></a>

### graph.add\_vertex(neighbors, vertex_data)
Add a vertex to the graph.

**Kind**: instance method of [<code>Graph</code>](#Graph)  

| Param | Type | Description |
| --- | --- | --- |
| neighbors | <code>Array.&lt;number&gt;</code> | The neighbors of the node being added |
| vertex_data | <code>Object</code> | Additional data to be added to the graph |

<a name="Graph+calc_outdegrees"></a>

### graph.calc\_outdegrees() ⇒ <code>Array.&lt;number&gt;</code>
Calculate node outdegrees.

**Kind**: instance method of [<code>Graph</code>](#Graph)  
**Returns**: <code>Array.&lt;number&gt;</code> - List (array) of outdegrees of graph nodes.  
<a name="Graph+calc_indegrees"></a>

### graph.calc\_indegrees() ⇒ <code>Array.&lt;number&gt;</code>
Calcuate node outdegrees.

**Kind**: instance method of [<code>Graph</code>](#Graph)  
**Returns**: <code>Array.&lt;number&gt;</code> - List (array) of indegrees of graph nodes.  
<a name="Graph+search_from"></a>

### graph.search\_from(start, [data_structure])
Generator for a graph search ordering.

**Kind**: instance method of [<code>Graph</code>](#Graph)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| start | <code>\*</code> |  | The node to start the ordering on |
| [data_structure] | <code>\*</code> | <code>Queue</code> | The data structure to use. Affects ordering (e.g., Stack -> DFS, Queue -> BFS, min-Heap -> Djikstra). |

<a name="Graph+topological_order"></a>

### graph.topological\_order([data_structure])
Generator for a topological ordering in a DAG.

**Kind**: instance method of [<code>Graph</code>](#Graph)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [data_structure] | <code>\*</code> | <code>Queue</code> | The data structure to use. Permutes ordering (up to topological order). |

