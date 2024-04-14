class Node<T> {
  data: T
  next: Node | null
  constructor(value: T) {
    this.data = value
    this.next = null
  }
}


class Tree {
  root: Node;
}
