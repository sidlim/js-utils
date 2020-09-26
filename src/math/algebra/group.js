import Monoid from './monoid.js';

class Group extends Monoid {

    /*
    inv;
    */

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

export default Group;