/**
 * A queue class built on an array.
 */
class Queue {

    /*
    size = 0;
    element_count = 0;
    container;
    head_idx = 0;
    tail_idx = 0;
    get = this.dequeue;
    */

    /**
     * Builds a queue.
     * @constructor
     * @param {number} [queue_size = 1000] The initial queue capacity.
     */
    constructor(queue_size = 1000) {
        this.size = queue_size;
        this.container = [];
        this.container.length = queue_size;
        this.head_idx = 0;
        this.tail_idx = 0;
        this.element_count = 0;
        this.get = this.dequeue;
    }

    /**
     * Find the index of the next element in the queue.
     * TODO: Make this a private method when support increases.
     * @param {number} pos The current position in the queue.
     * @returns {number} The next position in the queue.
     */
    inc_queue_ptr(pos) {
        return((pos + 1) % this.size);
    }

    /**
     * Find out if the queue is full.
     * @returns {boolean} True if the queue is full.
     */
    is_full() {
        return(this.size == this.element_count);
    }

    /**
     * Double the capacity of the queue.
     */
    resize() {
        let prefix = []
        let suffix = []
        if (this.head_idx <= this.tail_idx) {
            prefix = this.container.slice(this.tail_idx, this.container.length);
            suffix = this.container.slice(0, this.head_idx);
        }
        else {
            prefix = this.container.slice(this.tail_idx, this.head_idx + 1);
        }
        this.container = prefix.concat(suffix);
        this.head_idx = this.container.length;
        this.tail_idx = 0;
        this.container.length = 2 * this.size;
        this.size = 2 * this.size;
    }

    /**
     * Find out if the queue is empty.
     * @returns {boolean} True if the queue is empty.
     */
    is_empty() {
        return(this.element_count == 0);
    }

    /**
     * Add an element to the queue.
     * @param {*} element The element to insert into the queue.
     */
    enqueue(element) {
        if (this.is_full()) {
            this.resize()
        }
        this.element_count++;
        this.container[this.head_idx] = element;
        this.head_idx = this.inc_queue_ptr(this.head_idx);
    }

    /**
     * Remove an element from the queue.
     * @returns {*} The element removed from the queue.
     */
    dequeue() {
        if (this.is_empty()) {
            throw new Error("Queue is empty");
        }
        this.element_count--;
        let element = this.container[this.tail_idx];
        this.tail_idx = this.inc_queue_ptr(this.tail_idx);
        return(element);
    }

    /**
     * Add multiple elements to the queue.
     * @param {Iterable} elements As an iterable, the collection of elements to add to the queue.
     */
    put(elements) {

        let element;
        for (element of elements) {
            this.enqueue(element)
        }
    }

}

export default Queue;