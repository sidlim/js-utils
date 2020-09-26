class Equivalence_Relation {

    equals;

    constructor(eq = (x, y) => (x == y)) {
        this.equals = eq;
    }

}

export default Equivalence_Relation;