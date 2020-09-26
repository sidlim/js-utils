import Sequence from './assorted-utilities/sequence.js';
import Stack from './data-containers/stack.js';
import Queue from './data-containers/queue.js';
import Graph from './graphs/graph.js';
import Equivalence_Relation from './math/algebra/eq-rel.js';
import Group from './math/algebra/group.js';
import Ring from './math/algebra/ring.js';
import Field from './math/algebra/field.js';

let Data_Containers = {
    'Stack': Stack,
    'Queue': Queue
};

let More_Math = {
    'Equivalence_Relation': Equivalence_Relation,
    'Group': Group,
    'Ring': Ring,
    'Field': Field
};

export {Data_Containers, More_Math, Graph, Sequence};