import { Messaging } from "./services/messaging"
import { Order } from "./classes/order"
import { Persistency } from "./services/persistency"
import { Product } from "./classes/product"
import { ShoppingCart } from "./classes/shopping-carts"
import { FiftyPercentDiscount, NoDiscount, TenPercentDiscount } from "./classes/discount"

// const fiftyPercentDiscount = new FiftyPercentDiscount()
const tenPercentDiscount =  new TenPercentDiscount()
// const noDiscount = new NoDiscount()
const shoppingCart = new ShoppingCart(tenPercentDiscount)
const messaging = new Messaging()
const persistency = new Persistency()
const order = new Order (shoppingCart, messaging, persistency)

shoppingCart.addItem(new Product("Camiseta", 49.9))
shoppingCart.addItem(new Product("Caderno", 9.9))
shoppingCart.addItem(new Product("Lapiz", 1.59))
// shoppingCart.clear()

console.log(shoppingCart.items)
console.log(shoppingCart.total())
console.log(shoppingCart.totalWithDiscount())
order.checkout()
console.log(order.orderStatus)