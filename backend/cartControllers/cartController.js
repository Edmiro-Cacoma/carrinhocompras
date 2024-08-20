class Cart {
    constructor() {
        this.stack = []
    }

    addItem(item, quantity) {
        this.stack.push({ item, quantity })
    }

    removeLastItem() {
        return this.stack.pop()
    }

    listItem() {
        return this.stack
    }
}

const cart = new Cart();

const addItem = (req, res) => {
    const { item } = req.body;
    cart.addItem(item)
    res.status(201).json({ message: `Item added to cart`, cart: cart.listItem() })
}

const removeLastItem = (req, res) => {
    const removedItem = cart.removeLastItem()
    if (removedItem) {
        res.status(200).json({ message: `Item removed from cart`, removedItem, cart: cart.listItem() })
    } else {
        res.status(400).json({ message: `cart is empty`})
    }
   
}

const listItems = (req, res) => {
    res.status(200).json({ cart: cart.listItem() })
}

module.exports = {
    addItem, removeLastItem,listItems
}