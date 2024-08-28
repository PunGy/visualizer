class Elem<T> {
  data: T
  next: Elem<T> | null
  constructor(value: T) {
    this.data = value
    this.next = null
  }
}

class List <T>{
  head: Elem<T> | null = null
  tail: Elem<T> | null = null
  size: number = 0

  isEmpty() {
    return this.size === 0
  }

  private setFirstElem(el: Elem<T>) {
    this.head = el
    this.tail = el
    this.size++
  }

  private setTail(el: Elem<T>) {
    if (this.tail === null) throw new Error('setTail cannot be called on empty List!!')

    this.tail.next = el
    this.tail = el
    this.size++
  }
  private setHead(el: Elem<T>) {
    if (this.head === null) throw new Error('setHead cannot be called on empty List!!')

    el.next = this.head
    this.head = el
    this.size++
  }

  pushBack(data: T | Elem<T>) {
    const node = data instanceof Elem ? data : new Elem(data)
    if (this.isEmpty()) {
      this.setFirstElem(node)
    } else {
      this.setTail(node)
    }
  }

  pushFront(data: T | Elem<T>) {
    const node = data instanceof Elem ? data : new Elem(data)
    if (this.isEmpty()) {
      this.setFirstElem(node)
    } else {
      this.setHead(node)
    }
  }

  forEach(fn: (data: T, i: number) => void) {
    let node = this.head
    let i = 0
    while (node !== null) {
      fn(node.data, i++)
      node = node.next
    }
  }
}

