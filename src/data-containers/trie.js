class Node {
    constructor(terminal = false) {
        this.terminal = terminal;
        this.children = new Map();
    }
}

class Trie {

    constructor() {
        this.root = new Node(terminal = false);
    }

    add(word) {
        let curr_node = this.root;
        for (let i = 0; i < word.length; i++) {
            let next_node = new Node(terminal = (i == word.length - 1));
            curr_node.children.set(word[i], next_node);
        }
    }

    find(word) {
        let curr_node = this.root;
        for (let i = 0; i < word.length; i++) {
            if (curr_node.has(word[i])) {
                curr_node = curr_node.get(word[i]);
            }
            else {
                return(false);
            }
        }
        return(curr_node.terminal)
    }
}