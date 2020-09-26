import Equivalence_Relation from './eq-rel.js';
import Monoid from './monoid.js';
import Group from './group.js';

class Ring extends Equivalence_Relation {

    add;
    additive_id;
    additive_inv;
    multiply;
    multiplicative_id;

    constructor(add_op, mul_op, add_id, mul_id, add_inv, eq_rel) {
        super(eq_rel);

        let add_group = new Group(add_op, add_id, add_inv, eq_rel);
        let mul_monoid = new Monoid(mul_op, mul_id, eq_rel);
        
        this.add = add_group.multiply;
        this.additive_id = add_group.id;
        this.additive_inv = add_group.inv;

        this.multiply = mul_monoid.multiply;
        this.multiplicative_id = mul_monoid.id;
    }

}

export default Ring;