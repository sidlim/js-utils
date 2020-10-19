class Node {
    constructor(terminal = false) {
        this.terminal = terminal;
        this.children = new Map();
    }
}

class Trie {

    constructor() {
        this.root = new Node(false);
    }

    add(word) {
        let curr_node = this.root;
        for (let i = 0; i < word.length; i++) {
            let next_node;
            if (curr_node.children.has(word[i])) {
                next_node = curr_node.children.get(word[i]);
            }
            else {
                next_node = new Node(i == word.length - 1);
                curr_node.children.set(word[i], next_node);
            }
            curr_node = next_node;
        }
    }

    find(word) {
        let curr_node = this.root;
        for (let i = 0; i < word.length; i++) {
            if (curr_node.children.has(word[i])) {
                curr_node = curr_node.children.get(word[i]);
            }
            else {
                return(false);
            }
        }
        return(curr_node.terminal)
    }
}