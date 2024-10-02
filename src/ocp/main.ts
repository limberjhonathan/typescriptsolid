import { Messaging } from "./services/messaging"
import { Order } from "./classes/order"
import { Persistency } from "./services/persistency"
import { Product } from "./classes/product"
import { ShoppingCart } from "./classes/shopping-carts"
import { FiftyPercentDiscount, NoDiscount, TenPercentDiscount } from "./classes/discount"
import { EnterpriseCustomer, IndividualCustomer } from "./classes/customer"
import { MessagingProtocol } from "./classes/interfaces/messaging-protocol"

// const fiftyPercentDiscount = new FiftyPercentDiscount()
const tenPercentDiscount =  new TenPercentDiscount()
// const noDiscount = new NoDiscount()
const shoppingCart = new ShoppingCart(tenPercentDiscount)
const messaging = new Messaging()
const persistency = new Persistency()
// const individualCustomer = new IndividualCustomer(
//     'Luiz',
//     'Miranda',
//     '111.111.111-11'
// )

const enterpriseCustomer = new EnterpriseCustomer(
    'Empresa Gigante',
    '2222222222222'
)

class MessagingMock implements MessagingProtocol {
    sendMessage(): void {
        console.log('A mesagem foi enviada pelo MOCK')
    }
} 

const messaginMock = new MessagingMock();

const order = new Order(shoppingCart, messaginMock, persistency, enterpriseCustomer)

shoppingCart.addItem(new Product("Camiseta", 49.9))
shoppingCart.addItem(new Product("Caderno", 9.9))
shoppingCart.addItem(new Product("Lapiz", 1.59))
// shoppingCart.clear()

console.log(shoppingCart.items)
console.log(shoppingCart.total())
console.log(shoppingCart.totalWithDiscount())
order.checkout()
console.log(order.orderStatus)