const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

class Node  {
  constructor(data = null, left = null, right = null) {
      this.data = data;
      this.left = left;
      this.right = right;
  }
};

class Tree {
  constructor(inputArray) {
    this.inputArray = [...new Set(mergeSort(inputArray))];
    this.root = this.buildBalancedBST(this.inputArray, 0, this.inputArray.length - 1);
    this.preOrderData = [];
    this.inOrderData = [];
    this.postOrderData = [];
  };

  prettyPrint = (root = this.root, prefix = "", isLeft = true) => {
    if (root === null) {
      return;
    }
    if (root.right !== null) {
      this.prettyPrint(root.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${root.data}`);
    if (root.left !== null) {
      this.prettyPrint(root.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

    buildBalancedBST(inputArray, start, end) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const root = new Node(inputArray[mid]);
    root.left = this.buildBalancedBST(inputArray, start, mid - 1);
    root.right = this.buildBalancedBST(inputArray, mid + 1, end);
    return root;
  };

  insert(value, root = this.root) {
    if (root === null) {
      return new Node(value);
    }
    if (root.data < value) {
      root.right = this.insert(value, root.right);
    } else {
      root.left = this.insert(value, root.left);
    }
    this.prettyPrint(this.root);
    return root;
  };

delete(value, root = this.root) {
    if (root == null) {
      return root;
    }
    
    if (root.data > value) {
      root.left = this.delete(value, root.left);
    } else if (root.data < value) {
      root.right = this.delete(value, root.right);
    } else {
      if (root.left == null) {
        return root.right;
      } else if (root.right == null) {
        return root.left;
      }
      
      const minValueNode = this.findMinValueNode(root.right);
      root.data = minValueNode.data;
      root.right = this.delete(minValueNode.data, root.right);
    }
    
    prettyPrint(this.root);
    return root;
}

findMinValueNode(root) {
    let current = root;

    while (current.left !== null) {
        current = current.left;
    }

    return current;
}

find(value, root = this.root) {
  if (root == null) return false;
  if(root.data == value) return root;
  if(root.data > value) {
    return this.find(value, root.left);
  } else {
    return this.find(value, root.right);
}

}

// breadth-first order
levelOrder(root = this.root) {
  const queue = [root];
  const result = [];
 // dequeue the current node from the front of the queue,
 // add it's data to the result [] and enqueue left and right
 // children if they exist
  while (queue.length > 0) {
    const current = queue.shift();
    result.push(current.data);

    if (current.left !== null) queue.push(current.left);
    if (current.right !== null) queue.push(current.right);
  }

  console.log("levelOrder: ", result);
  return result;
};

// depth-first order (left, root, right)
inOrder(root = this.root) {
  if (root == null) return;
 // if the current node has a left child
  if (root.left !== null) {
    this.inOrder(root.left);
  }
 //  add data to inOrderData []
    this.inOrderData.push(root.data);
  
  if (root.right !== null) {
    this.inOrder(root.right);
  }
  
  if (root === this.root) {
    console.log("inOrder: ", "[" + this.inOrderData.join(", ") + "]");
  }
};

preOrder(root = this.root) {  // root, left, right
  if (root == null) return;

    this.preOrderData.push(root.data);

  if (root.left !== null) {
    this.preOrder(root.left);
  }

  if (root.right !== null) {
    this.preOrder(root.right);
  }

  if (root === this.root) {
    console.log("preOrder: ", "[" + this.preOrderData.join(", ") + "]");
  }
};

postOrder(root = this.root) {  // left, right, root
  if (root == null) return;

  if (root.left !== null) {
    this.postOrder(root.left);
  }

  if (root.right !== null) {
    this.postOrder(root.right);
  }

    this.postOrderData.push(root.data);

  if (root === this.root) {
    console.log("postOrder: ", "[" + this.postOrderData.join(", ") + "]");
  }
};


height(root = this.root) {
  if (root == null) {
    return -1;
  } else {
    let left = this.height(root.left);
    let right = this.height(root.right);

    return Math.max(left, right) + 1;
  }
}

depth(NodeValue, root = this.root, depth = 0) {
  if (root === null) return -1;
  if (root.data === NodeValue) return depth;

  if (root.data < NodeValue) {
    return this.depth(NodeValue, root.right, depth + 1);
  } else {
    return this.depth(NodeValue, root.left, depth + 1);
  }
};


 

 isBalanced(root = this.root) {
      if (root == null) return false;

      let leftHalf = root.left;
      let rightHalf = root.right;

      if (Math.abs(this.height(leftHalf) - this.height(rightHalf)) > 1) {
        return false;
      } else {
        return true;
      }
      
    }

rebalance() {
  prettyPrint(this.root);
  
  if(this.isBalanced(this.root)) return this.root;
  

  let rebalancedArray = [];
  rebalancedArray = this.traverse(this.root, rebalancedArray);

  let balancedNewTree = new Tree(rebalancedArray);
  prettyPrint(balancedNewTree.root);
  console.log("Tree is balanced? ", balancedNewTree.isBalanced());
  return balancedNewTree.root;
}

prettyPrintRebalancedTree() {
  prettyPrint(this.root);
}

traverse(root) {
  if (root !== null) {
    let array = [];
    array.push(root.data);
    array = array.concat(this.traverse(root.left));
    array = array.concat(this.traverse(root.right));
    return array;
  } else {
    return [];
  }
}}



function mergeSort(inputArray) {
  if (inputArray.length <= 1) return inputArray;

  const middle = Math.floor(inputArray.length / 2);
  const left = mergeSort(inputArray.slice(0, middle));
  const right = mergeSort(inputArray.slice(middle));

  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return [...result, ...left.slice(leftIndex), ...right.slice(rightIndex)];
};

function removeDuplicates(inputArray) {
return [...new Set(inputArray)];
};


let testInputArray = [1,2,3,4,5,6,7,10,11];
balancedBST = new Tree (testInputArray);
balancedBST.insert(8);
balancedBST.insert(9);
balancedBST.delete(3);
console.log(balancedBST.find(8));
balancedBST.levelOrder();
balancedBST.inOrder();
balancedBST.preOrder();
balancedBST.postOrder();
console.log(balancedBST.height());
console.log(balancedBST.depth(7));
console.log(balancedBST.isBalanced());
balancedBST.rebalance()
