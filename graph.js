class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex)
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (const vertex of vertexArray) {
      this.addVertex(vertex)
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2)
    v2.adjacent.add(v1)
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2)
    v2.adjacent.delete(v1)
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex);
    for (const node of this.nodes) {
      node.adjacent.delete(vertex)
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const visited = [];
    const stack = [start];
    const visitedSet = new Set();

    while (stack.length) {
      const current = stack.pop();
      if (!visitedSet.has(current)) {
        visited.push(current.value);
        visitedSet.add(current);

        const neighbors = Array.from(current.adjacent).reverse()
        for (const neighbor of neighbors) {
          stack.push(neighbor)
        }
      }
    }
    console.log(visited)
    return visited;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const visited = [];
    const queue = [start];
    const visitedSet = new Set();

    while (queue.length) {
      const current = queue.shift();
      if (!visitedSet.has(current)) {
        visited.push(current.value);
        visitedSet.add(current);

        for (const neighbor of current.adjacent) {
          queue.push(neighbor);
        }
      }
    }

    return visited;
  }
}

module.exports = {Graph, Node}
