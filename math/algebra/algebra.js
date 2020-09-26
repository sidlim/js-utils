class Equivalence_Relation {

    equals;

    constructor(eq = (x, y) => (x == y)) {
        this.equals = eq;
    }

}

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

class Group extends Monoid {

    inv;

    constructor(op, id, inv, eq_rel) {
        super(op, id, eq_rel);
        this.inv = inv;
    }

    exp(base, power) {
        if (power < 0) {
            base = this.inv(base);
            power = -power;
        }
        return(super.exp(base, power));
    }

    // TODO: Quotients require some form of a disjoint set data structure (basically a map from group elements to cosets)

    static direct_product(... groups) {
        
        let eq_rel = function(x, y) {
            return(groups.reduce(function(acc, group, index) {
                return(acc && group.equals(x[index], y[index]))
            }))
        }

        let prod_inv = function(element) {
            return(element.map((g, i) => (groups[i].inv(g))));
        }

        let prod_id = groups.map(m => m.id());

        let prod_op = function (l, r) {
            return(l.map((group_el, index) => (groups[index].multiply(group_el, r[index]))))
        }

        return(new Group(prod_op, prod_id, prod_inv, eq_rel));

    }
}

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