import { CartItem } from "./interfaces/cart-item";
import { CustomerOrder } from "./interfaces/customer-protocol";
import { MessagingProtocol } from "./interfaces/messaging-protocol";
import { PersistencyProtocol } from "./interfaces/persistency-protocol";
import { ShoppingCartProtocol } from "./interfaces/shopping-cart-protocol";
import { Order } from "./order";

class ShoppingCartMock implements ShoppingCartProtocol{
    get items(): Readonly<CartItem[]>{
        return []
    }
    addItem(item: CartItem): void {};
    removeItem(index: number): void{};
    total(): number {
        return 1;
    };
    totalWithDiscount(): number {
        return 2
    };
    isEmpty(): boolean {
        return false
    };
    clear(): void {};
}

class MessegingMock implements MessagingProtocol {
    sendMessage(msg: string): void {
    }
}

class PersistencyMock implements PersistencyProtocol {
    saveOrder(): void {
    }
}

class CustomerMock implements CustomerOrder {
    getName(): string {
        return ''
    }

    getIDN() {
        return ''
    }
}

const creatSut = () => {
    const shoppingCartMock = new ShoppingCartMock()
    const messagingMock = new MessegingMock()
    const persistencyMock = new PersistencyMock()
    const customerMock = new CustomerMock()
    const order = new Order(shoppingCartMock, messagingMock, persistencyMock, customerMock)

    const sut = new Order(
        shoppingCartMock,
        messagingMock,
        persistencyMock,
        customerMock
    )

    return {
        sut,
        shoppingCartMock,
        messagingMock,
        persistencyMock
    }
}

describe('Order', () => {
    it('should not checkout if cart is empty', () => {
        const { sut, shoppingCartMock } = creatSut()
        const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'isEmpty').mockReturnValueOnce(true);
        sut.checkout()
        expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1)
        expect(sut.orderStatus).toBe('open') 
    })

    it('should checkout if cart is not empty', () => {
        const { sut, shoppingCartMock } = creatSut()
        const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'isEmpty').mockReturnValueOnce(false);
        sut.checkout()
        expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1)
        expect(sut.orderStatus).toBe('closed') 
    })

    it('should send an email to customer', () => {
        const { sut, messagingMock } = creatSut()
        const messagingMockSpy = jest.spyOn(messagingMock, 'sendMessage')
        sut.checkout()
        expect(messagingMockSpy).toHaveBeenCalledTimes(1)
        expect(sut.orderStatus).toBe('closed') 
    })

    it('should save order', () => {
        const { sut, persistencyMock } = creatSut()
        const persistencygMockSpy = jest.spyOn(persistencyMock, 'saveOrder')
        sut.checkout()
        expect(persistencygMockSpy).toHaveBeenCalledTimes(1)
        expect(sut.orderStatus).toBe('closed') 
    })

    it('should save cart', () => {
        const { sut, shoppingCartMock } = creatSut()
        const shoppingCartgMockSpy = jest.spyOn(shoppingCartMock, 'clear')
        sut.checkout()
        expect(shoppingCartgMockSpy).toHaveBeenCalledTimes(1)
        expect(sut.orderStatus).toBe('closed') 
    })
})