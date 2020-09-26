/**
 * A Stack class built on an array.
 */
class Stack {

    /*
    size = 0;
    element_count = 0;
    container;
    head_idx = 0;
    get = this.pop;
    */

    /**
     * Builds a Stack.
     * @constructor
     * @param {number} [stack_size = 1000] The initial stack capacity.
     */
    constructor(stack_size = 1000) {
        this.size = stack_size;
        this.container = [];
        this.container.length = stack_size
    }

    /**
     * Find out if the stack is full.
     * @returns {boolean} True if the stack is full.
     */
    is_full() {
        return(this.size == this.element_count);
    }

    /**
     * Double the capacity of the stack.
     */
    resize() {
        this.container.length = 2 * this.size;
        this.size = 2 * this.size;
    }

    /**
     * Find out if the stack is empty.
     * @returns {boolean} True if the stack is empty.
     */
    is_empty() {
        return(this.element_count == 0);
    }

    /**
     * Add an element to the stack.
     * @param {*} element The element to add to the stack.
     */
    push(element) {
        if (this.is_full()) {
            this.resize()
        }
        this.element_count++;
        this.container[this.head_idx] = element;
        this.head_idx++;
    }

    /**
     * Remove an element from the stack.
     * @returns {*} The element removed from the stack.
     */
    pop() {
        if (this.is_empty()) {
            throw new Error("Stack is empty");
        }
        this.element_count--;
        this.head_idx--;
        let element = this.container[this.head_idx];
        return(element);
    }

    /**
     * Add multiple elements to the stack.
     * @param {Iterable} elements As an iterable, the collection of elements to add to the stack.
     */
    put(elements) {

        let element;
        for (element of elements) {
            this.push(element)
        }
    }

}

export default Stack;