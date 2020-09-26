import Equivalence_Relation from './eq-rel.js';
import Group from './group.js';

class Field extends Equivalence_Relation {

    add;
    additive_id;
    additive_inv;
    multiply;
    multiplicative_id;
    multiplicative_inv;

    constructor(add_op, mul_op, add_id, mul_id, add_inv, mul_inv, eq_rel) {
        super(eq_rel);

        let add_group = new Group(add_op, add_id, add_inv, eq_rel);
        let mul_group = new Group(mul_op, mul_id, mul_inv, eq_rel);
        
        this.add = function(... elements) {return(add_group.multiply(... elements))};
        this.additive_id = function() {return(add_group.id())};
        this.additive_inv = function(element) {return(add_group.inv(element))};

        this.multiply = mul_group.multiply;
        this.multiplicative_id = mul_group.id;
        this.multiplicative_inv = mul_group.inv;
    }

}

export default Field;