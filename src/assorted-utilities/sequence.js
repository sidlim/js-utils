/**
 * A Sequence class for better tools for iterables. Everything is done with deferred execution.
 */
class Sequence {

    /**
     * Construct a more functional iterable (generator).
     * @constructor
     * @param {Generator} iterable The iterable (generator) to convert.
     */
    constructor(iterable = null) {
        if (iterable != null) {
            this.iterable = iterable;
        }
        else {
            this.iterable = function * () {return;}
        }
    }

    /**
     * Iterate over the object.
     */
    go() {

        if (this.iterable[Symbol.iterator]) {
            return(this.iterable[Symbol.iterator]());
        }
        else {
            return(this.iterable());
        }

    }

    /**
     * Get an external iterator from an iterable (generator).
     * @param {Iterable | Sequence} iterable The iterable (generator) to extract an iterator from
     * @returns {Iterator} The iterable from the iterable (generator) object
     */
    static get_iterator(iterable) {

        if (iterable[Symbol.iterator]) {
            return(iterable[Symbol.iterator]());
        }
        else if (iterable instanceof Sequence) {
            return(iterable.iterable())
        }
        else {
            return(iterable());
        }

    }

    /**
     * Function to quickly wrap an iterable into a Sequence object
     * @param {Iterable} iterable The Iterable object to wrap
     */
    static wrap(iterable) {
        return(new Sequence(iterable));
    }

    /**
     * Unwrap a sequence and expose the iterator inside.
     * @returns {Iterator} The iterable from the sequence object.
     */
    unwrap() {

        if (this.iterable[Symbol.iterator]) {
            return(this.iterable[Symbol.iterator]);
        }
        else {
            return(this.iterable);
        }

    }

    /**
     * Compose a function with an iterator - do Array.map on arbitrary iterators.
     * @param {Function} mapping  The mapping to apply to each of the iterator values.
     * @returns {Sequence} A sequence whose values are the provided mapping applied to the provided iterator.
     */
    map(mapping) {

        let gen = this.iterable;
        
        let mapped_iterable = function * () {
        
            let index = 0;
            let preimage = Sequence.get_iterator(gen);
            let iter_output = preimage.next();

            while (!iter_output.done) {
                yield mapping(iter_output.value, index);
                iter_output = preimage.next();
                index++;
            }
        
            return;
        }
        
        return(new Sequence(mapped_iterable));
    }

    /**
     * Filter out values from an iterator - do Array.filter on arbitrary iterators.
     * @param {Function} key The function describing whether to keep a value or not.
     * @returns {Sequence} A sequence filtering out values according to the key function.
     */
    filter(key) {
        
        let gen = this.iterable;
        
        let filtered_iterable = function * () {

            let index = 0;
            let preimage = Sequence.get_iterator(gen);
            let iter_output = preimage.next();

            while (!iter_output.done) {
                if (key(iter_output.value, index)) {
                    yield iter_output.value;
                }
                iter_output = preimage.next();
                index++;
            }
            
            return;
        }
        
        return(new Sequence(filtered_iterable));
    }

    /**
     * Slice an iterator - just like Array.slice, but both a start and an end must be provided. 
     * If both bounds are finite, the iterable will also be finite, making behavior different from just filtering on element index.
     * @param {number} [start = 0] The start index for the slice (inclusive).
     * @param {number} [end = Infinity] The end index for the slice (exclusive).
     * @returns {Sequence} The sliced iterator. If the bounds are finite, the iterable will also be finite.
     */
    slice(start = 0, end = Infinity) {
        
        let gen = this.iterable;
        
        let sliced_iterable = function * () {

            let index = 0;
            let preimage = Sequence.get_iterator(gen);
            let iter_output = preimage.next();

            while (!iter_output.done && index < end) {
                if (index >= start && index < end) {
                    yield iter_output.value;
                }
                iter_output = preimage.next();
                index++;
            }
            
            return;
        }
        return(new Sequence(sliced_iterable));
    }

    /**
     * Concatenate an iterable (generator) to the sequence.
     * @param {Iterable[] | Sequence[]} iterables The iterables (generators) to concatenate to the sequence.
     * @returns {Sequence} The concatenated sequence.
     */
    concat(...iterables) {
        
        let gen = this.iterable;

        let concat_iterable = function * () {

            let prefix = Sequence.get_iterator(gen);
            let suffixes = iterables;

            yield * prefix;
            for (let iterable of suffixes) {
                yield * Sequence.get_iterator(iterable);
            }
            return;

        }

        return(new Sequence(concat_iterable));
    }


    /**
     * Zip together two sequences.
     * @param {Iterable} iterable The second sequence to use for the zip operation.
     * @param {*} [packager = (x,y) => [x,y]] The function describing how to package the sequences. 
     * @returns {Sequence} A sequence of elements zipped together as described by the packager function.
     */
    zip(iterable, packager = (x, y) => [x, y]) {

        let gen = this.iterable;

        let zip_iterable = function * () {

            let x_iter = Sequence.get_iterator(gen);
            let y_iter = Sequence.get_iterator(iterable);
            let x_output = x_iter.next();
            let y_output = y_iter.next();

            while (!x_output.done && !y_output.done) {
                yield packager(x_output.value, y_output.value);
                x_output = x_iter.next();
                y_output = y_iter.next();
            }

            return;
        }

        return(new Sequence(zip_iterable));
    }

    /**
     * Integrate a sequence - create a new sequence given a reduction.
     * @param {Function} reduction The reduction to apply to the sequence.
     * @param {*} base_case The base case of the reduction.
     * @returns {Sequence} A reduction of the sequence, term by term. It's kind of like riemann summing, hence "Integrate".
     */
    integrate(reduction, base_case) {

        let gen = this.iterable;

        let integrated_iterator = function * () {

            let preimage = Sequence.get_iterator(gen);
            let integrated_value = base_case;
            let iter_output = preimage.next();

            while (!iter_output.done) {

                yield integrated_value;
                integrated_value = reduction(iter_output.value, integrated_value);
                iter_output = preimage.next();

            }

            return;
        }

        return(new Sequence(integrated_iterator));
    }

    /**
     * Cartesion product of 2 sequences - create a new sequence given another.
     * @param {Iterable} seq The sequence to cartesian product the current sequence with.
     * @returns {Sequence} The cartesian product of the sequences, with the first element being from the parent sequence and the second from seq.
     */
    prod(iterable, packager = (x, y) => [x, y]) {

        let gen = this.iterable;
    
        let producted_iterator = function * () {
    
            let outer_iter = Sequence.get_iterator(gen);
            let outer_output = outer_iter.next();
    
            while (!outer_output.done) {

                let inner_iter = Sequence.get_iterator(iterable);
                let inner_output = inner_iter.next();

                while (!inner_output.done) {

                    yield packager(outer_output.value, inner_output.value)
                    inner_output = inner_iter.next()

                }

                outer_output = outer_iter.next();

            }

            return;
        }

        return(new Sequence(producted_iterator));
    }
}