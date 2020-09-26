import Equivalence_Relation from './eq-rel.js';

class Monoid extends Equivalence_Relation {

    id_el;
    op_fn;

    constructor(op, id, eq_rel) {
        super(eq_rel);
        this.op_fn = op;
        this.id_el = id;
    };

    multiply(... elements) {
        return(elements.reduce(this.op_fn, this.id_el))
    }

    exp(base, power) {

        // TODO: Make this work for BigInts
        // power = BigInt(power);
        let result = this.id_el;
        let bit_mask = 1 << Math.ceil(Math.log2(1 + power));

        while (bit_mask > 0) {
            
            result = this.multiply(result, result);
            
            if (bit_mask & power) {
                result = this.multiply(base, result);
            }

            bit_mask = bit_mask >> 1;
        }

        return(result);
    }

    id() {
        return(this.id_el);
    }

    static direct_product(... monoids) {

        let eq_rel = function(x, y) {
            return(monoids.reduce(function(acc, monoid, index) {
                return(acc && monoid.equals(x[index], y[index]))
            }))
        }
        let prod_id = monoids.map(m => m.id());

        let prod_op = function (l, r) {
            return(l.map((el, index) => (monoids[index].multiply(el, r[index]))))
        }

        return(new Monoid(prod_op, prod_id, eq_rel));
    }

}

export default Monoid;