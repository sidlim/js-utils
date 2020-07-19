# js-utils
A set of tools to make the creation of web content easier.
## Modules/Code Organization
- `assorted-utilities/`
  - [sequence.js](#Sequence) - Better tools for iterables.
- `data-structures/`
  - [stack.js](#Stack) - Implementation of a stack.
  - [queue.js](#Queue) - Implementation of a queue.
- `graphs/`
  - [adj-list.js](#Adjacency-List) - Implementation of an adjacency list.
  - [transition-matrix.js](#Transition-Matrix) - `WIP.`
  - [graph.js](#Graph) - Graph class.

## `Sequence`
A Sequence class for better tools for iterables.  
Methods:
- [`constructor`](#Sequenceconstructor) `  :: Iterable -> Sequence ` - Turn an iterable into a Sequence object.
- [`go`](#Sequencego) `  :: void -> Iterable ` - Get a generator from a Sequence object.
- [`map`](#Sequencemap) `  :: Function (a -> b) -> Sequence` - Compose a function with the current Sequence object.
- [`filter`](#Sequencefilter) `  :: Function (a -> Boolean) -> Sequence` - Filter the current Sequence object given a key function.
- [`slice`](#Sequenceslice) `  :: Number -> Number -> Sequence` - Pick a contiguous subsequence of the Sequence object.
- [`concat`](#Sequenceconcat) `  :: (Iterable | Sequence) -> Sequence` - Compose a function with the current Sequence object.
- [`zip`](#Sequencezip) `  :: (Iterable | Sequence) -> Function (a -> b -> c) -> Sequence` - Zip the Sequence object with another.
- [`integrate`](#Sequenceintegrate) `  :: Function (a -> b) -> b -> Sequence` - Make a sequence of reductions based on the current Sequence.


### `Sequence.constructor`
Constructor for the Sequence class.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| iterable | <code>Iterable</code> | <code>[]</code> | The iterable to convert.

Example:
```javascript
    // Set up a generator function for use below:
    function * numbers() {
        let i = 1;
        while (true) {
            yield i++;
        }
        return;
    }

    let Natural_numbers = new Sequence(numbers);
    let Pi_digits = new Sequence([3,1,4,1,5,9,2,6,5,3,5]);
    let Empty = new Sequence();
```

### `Sequence.go`
Iterate over the Sequence using a `for..of` loop. Or just work with the iterator directly.  

Example:
```javascript
    for (var digit of Pi_digits.go()) {
        console.log('The next digit of pi is ${digit}', digit);
    }

    let weird_iterator = function * () {
        yield Pi_digits *
        yield 'That\'s all I got!'
    }
```

### `Sequence.map`
Compose a function with an iterator - like Array.map, but on arbitrary iterators. Uses deferred execution.

| Param | Type | Description |
| --- | --- | --- |
| mapping | <code>function :: a -> i -> b</code> | The mapping to apply to each of the iterator values. Arguments passed are `a` (the iterator value itself) and the index of the element in the iterator, `i`. |

Example:
```javascript
    let Evens = Natural_numbers.map((n) => (n * 2));
    let Squares = Natural_numbers.map((n) => (n * n));

    // Map on index instead:
    for (digit of Pi_digits.map((d, i) => (d * (10 ** -i))).go()) {
        console.log('I\'ve broken pi up into its decimal places! Here\'s one: ${digit}', digit);
    }
```

### `Sequence.filter`
Filter out values from an iterator - like Array.filter, but on arbitrary iterators. Uses deferred execution.

| Param | Type | Description |
| --- | --- | --- |
| key | <code>function :: a -> i -> Bool</code> | The key function describing whether to keep the value. Arguments passed are `a` (the iterator value itself) and the index of the element in the iterator, `i`. |

Example:
```javascript
    let Even_pi_digits = Pi_digits.filter((a) => (a % 2 == 0));

    // Filter on index instead:
    let Odds = Natural_numbers.filter((a, i) => (i % 2 == 1));
```

### `Sequence.slice`
Slice an iterator - like Array.slice, but on arbitrary iterators. Both a start and an end must be provided. Uses deferred execution.
If both bounds are finite, the iterable will also be finite, making behavior different from just filtering on element index.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [start] | <code>number</code> | <code>0</code> | The start index for the slice (inclusive). |
| [end] | <code>number</code> | <code>Infinity</code> | The end index for the slice (exclusive). |

Example:
```javascript
    let First_three_pi_digits = Pi_digits.slice(0, 3);

    // Turn an infinite iterator into a finite one:
    let Double_digit_naturals = Natural_numbers.slice(9, 99);
```

### `Sequence.concat`
Concatenate iterables to the sequence - like Array.concat, but on arbitrary iterators. Uses deferred execution.
Notice that a finite sequence concatenated to (after) an infinite one will never yield through the generator.

| Param | Type | Description |
| --- | --- | --- |
| ...iterables | <code>Array.&lt;Iterable \| Sequence&gt;</code> | The iterables to concatenate to the sequence. |

Example:
```javascript
    let Pi_digits_twice = Pi_digits.concat(Pi_digits);

    // Infinite/finite case:
    let Double_digit_naturals = Natural_numbers.slice(9, 99);
    let Double_digit_naturals_twice = Double_digit_naturals.concat(Double_digit_naturals); // Works as expected
    let attempt_2 = Natural_numbers.filter((a) => (a > 9 && a < 100));
    let attempt_2_twice = attempt_2.concat(attempt_2); // We hit an infinite loop before we can get to the second run of double-digit natural numbers
```

### `Sequence.zip`
Zip together two sequences. Terminates when the shorter sequence ends. Uses deferred execution. You can provide a packaging function to zip the sequences together with a custom container.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| iterable | <code>Iterable</code> |  | The second sequence to use for the zip operation. |
| [packager] | <code>function :: a -> b -> Object </code> | <code>(x,y) &#x3D;&gt; [x,y]</code> | The function describing how to package the sequences. By default, packs into arrays of 2. |

Example:
```javascript
    let Pi_digits_and_Evens = Pi_digits.zip(Evens); // Will spit out 10 pairs [x, y] where x is a digit of pi and y is an even.

    // Custom packaging:
    let Squares_and_roots = Squares.zip(Natural_numbers, (s,r) => {'square': s, 'root': r});
```

### `Sequence.integrate`
Integrate a sequence - create a new sequence given a reduction. Kind of like Array.reduce, but instead you get the partial reductions (like partial sums in a series). Uses deferred execution. Kind of like Riemann Sums; hence "integrate".

| Param | Type | Description |
| --- | --- | --- |
| reduction | <code>function :: a -> b </code> | The reduction to apply to the sequence. |
| base_case | <code>b</code> | The base case of the reduction. |

Example:
```javascript
    let Triangular_numbers = Natural_numbers.integrate((x, y) => (x + y), 0); // According to numberphile lore the last member of this sequence is -1/12.
```

### `Sequence.get`
Get an external iterator from an iterable (generator). Really only meant for internal use, but private methods aren't a thing yet.

| Param | Type | Description |
| --- | --- | --- |
| iterable | <code>Iterable</code> \| <code>Sequence</code> | iterable (generator) to extract an iterator from |


## `Stack`
A Stack class built on an array. Used primarily as part of graph search.
Methods:
 - [`constructor`](#Stackconstructor) `  :: Number -> Stack ` - Make a stack object.
 - [`is_full`](#Stackis_full) `  :: Boolean ` - Check if the stack is full.
 - [`resize`](#Stackresize)   `  :: Number -> void ` - Double the stack capacity.
 - [`is_empty`](#Stackis_empty) `  :: Boolean ` - Check if the stack is empty.
 - [`push`](#Stackpush) `  :: a -> void ` - Add an element onto the top of the stack.
 - [`pop`](#Stackpop) `  :: a ` - Get an element from the top of the stack
 - [`put`](#Stackput) ` :: Iterable -> void ` - Put multiple things onto the top of the stack.


### `Stack.constructor`
Builds a Stack.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [stack_size] | <code>number</code> | <code>1000</code> | The initial stack capacity. |

Example:
```javascript
    // Make a stack with initial capacity 40.
    let my_stack = new Stack(40);
```

### `Stack.is_full`
Find out if the stack is full.

Example:
```javascript
    my_stack.is_full(); // False here

    // Load up the stack:
    for (let i = 0; i < 40; i++) {
        my_stack.push(i);
    }

    my_stack.is_full(); // True, since the capacity is 40 and automatic resizing has not happened.
```

### `Stack.resize`
Double the capacity of the stack.

Example:
```javascript
    my_stack.is_full(); // True here, since it's been loaded up (continuation of prior example)

    my_stack.resize();

    my_stack.is_full(); // False - the capacity is now 80.
```

### `Stack.is_empty`
Find out if the stack is empty.

Example:
```javascript
    my_stack.is_empty(); // False here, since 40 elements are in the stack (continuation of prior example)

    // Unload the stack:
    for (let i = 0; i < 40; i++) {
        my_stack.pop();
    }

    my_stack.is_empty(); // True, since there is nothing left in the stack.
```

### `Stack.push`
Add an element to the stack.

| Param | Type | Description |
| --- | --- | --- |
| element | <code>\*</code> | The element to add to the stack. |

Example:
```javascript
    // Load up the stack:
    for (let i = 0; i < 40; i++) {
        my_stack.push(i);
    }
```

### `Stack.pop`
Remove and return an element from the stack.

Example:
```javascript
    // Continued from prior example, where stack is filled with numbers: 0, 1, ... 39:
    console.log(my_stack.pop()); // Logs 39
    console.log(my_stack.pop()); // Logs 38
```

### `Stack.put`
Add multiple elements to the stack in order.

| Param | Type | Description |
| --- | --- | --- |
| elements | <code>Iterable</code> | As an iterable, the collection of elements to add to the stack. |

Example:
```javascript
    // Continued from prior example - my_stack is filled with numbers from 0 to 37
    my_stack.put([38, 39, 40]);
    console.log(my_stack.pop()); // Logs 40
```

## `Queue`
A Queue class built on an array. Used primarily as part of graph search.
Methods:
 - [`constructor`](#Queueconstructor) `  :: Number -> Queue ` - Make a queue object.
 - [`is_full`](#Queueis_full) `  :: Boolean ` - Check if the queue is full.
 - [`resize`](#Queueresize)   `  :: Number -> void ` - Double the queue capacity.
 - [`is_empty`](#Queueis_empty) `  :: Boolean ` - Check if the queue is empty.
 - [`enqueue`](#Queueenqueue) `  :: a -> void ` - Add an element onto the beginning of the queue.
 - [`dequeue`](#Queuedequeue) `  :: a ` - Get an element from the end of the queue
 - [`put`](#Queueput) ` :: Iterable -> void ` - Put multiple things onto the beginning of the queue.


### `Queue.constructor`
Builds a Queue.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [queue_size] | <code>number</code> | <code>1000</code> | The initial queue capacity. |

Example:
```javascript
    // Make a queue with initial capacity 40.
    let my_queue = new Queue(40);
```

### `Queue.is_full`
Find out if the queue is full.

Example:
```javascript
    my_queue.is_full(); // False here

    // Load up the queue:
    for (let i = 0; i < 40; i++) {
        my_queue.enqueue(i);
    }

    my_queue.is_full(); // True, since the capacity is 40 and automatic resizing has not happened.
```

### queue.resize()
Double the capacity of the queue.

Example:
```javascript
    my_queue.is_full(); // True here, since it's been loaded up (continuation of prior example)

    my_queue.resize();

    my_queue.is_full(); // False - the capacity is now 80.
```

### queue.is\_empty() ⇒ <code>boolean</code>
Find out if the queue is empty.

Example:
```javascript
    my_queue.is_empty(); // False here, since 40 elements are in the queue (continuation of prior example)

    // Unload the queue:
    for (let i = 0; i < 40; i++) {
        my_queue.dequeue();
    }

    my_queue.is_empty(); // True, since there is nothing left in the queue.
```

### `Queue.enqueue`
Add an element to the queue.

| Param | Type | Description |
| --- | --- | --- |
| element | <code>\*</code> | The element to add to the queue. |

Example:
```javascript
    // Load up the queue:
    for (let i = 0; i < 40; i++) {
        my_queue.enqueue(i);
    }
```

### `Queue.dequeue`
Remove and return an element from the queue.

Example:
```javascript
    // Continued from prior example, where queue is filled with numbers: 0, 1, ... 39:
    console.log(my_queue.dequeue()); // Logs 0
    console.log(my_queue.dequeue()); // Logs 1
```

### `Queue.put`
Add multiple elements to the queue in order.

| Param | Type | Description |
| --- | --- | --- |
| elements | <code>Iterable</code> | As an iterable, the collection of elements to add to the queue. |

Example:
```javascript
    // Continued from prior example - my_queue is filled with numbers from 0 to 37
    my_queue.put([38, 39, 40]);
```


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

