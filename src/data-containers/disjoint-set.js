class Up_Tree_Node {

    /*
    is_root = true;
    parent = null;
    data = null;
    */

    constructor(data) {
        this.data = data;
        this.is_root = true;
        this.parent = null;
    }

    set_parent(parent) {
        this.is_root = false;
        this.parent = parent;
    }

    get_root() {
        let curr = this;
        let move_nodes = [];

        while (!curr.is_root) {
            move_nodes.push(curr);
            curr = curr.parent;
        }

        for (var node of move_nodes) {
            node.set_parent(curr);
        }

        return(curr);
    }

}

class Disjoint_Set {

    constructor() {
        this.node_map = new Map();
        this.data_container = [];
        this.element_count = 0;
    }

    add_member(data) {
        let node_label = this.element_count++;
        this.node_map.set(data, new Up_Tree_Node(node_label));
        this.data_container[node_label] = data;
    }

    union(... members) {
        if (members.length > 1) {
            for (let i = 1; i < members.length; i++) {
                let eventual_child = this.node_map.get(members[i]);
                let eventual_parent = this.node_map.get(members[i - 1]);
                if (eventual_child.get_root() != eventual_parent.get_root()) {
                    eventual_child.set_parent(eventual_parent);
                }
            }
        }
    }

    /*
     * The following function is dangerous: if someone computes a set 
    * representative, reassigns a different representative, and computes
    * again, the same set will now have two different representatives.
    * For now, I think the wise thing to do is just to exclude this function 
    * and ask people to be conscious of the order in which they perform union.
    make_set_representative(data) {
        let member = this.node_map.get(data);
        let representative = member.get_root();

        representative.is_root = false;
        representative.parent = member;
        member.is_root = true;
    }
    */

    get_set_representative(data) {
        return(this.data_container[this.node_map.get(data).get_root().data]);
    }

}

export {Disjoint_Set};