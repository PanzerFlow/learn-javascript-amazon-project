import { cart, addToCart, loadFromStorage} from "../../data/cart.js";

describe('test suite: addToCart', ()=>{
    it('add new item into cart',() => {
        // Mock
        spyOn(localStorage,'setItem');

        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([])
        });
        loadFromStorage();
        
        // Test
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',cart);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);

    });

    it('add existing item into cart',() => {
        // Mock
        spyOn(localStorage,'setItem');

        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
                                    quantity: 2, 
                                    deliveryOptionId: '1'}])
        });
        loadFromStorage();
        
        // Test
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',cart);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(3);

    });
})
