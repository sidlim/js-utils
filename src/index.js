import Sequence from './assorted-utilities/sequence.js';
import Stack from './data-containers/stack.js';
import Queue from './data-containers/queue.js';
import Graph from './graphs/graph.js';
import Equivalence_Relation from './math/algebra/eq-rel.js';
import Group from './math/algebra/group.js';
import Ring from './math/algebra/ring.js';
import Field from './math/algebra/field.js';

let js_utils = {
    'Sequence': Sequence,
    'data_containers': {
        'Stack': Stack,
        'Queue': Queue
        },
    'Graph': Graph,
    'math': {
        'Equivalence_Relation': Equivalence_Relation,
        'Group': Group,
        'Ring': Ring,
        'Field': Field
        }
    };

export default js_utils;