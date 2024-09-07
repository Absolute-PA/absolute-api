import { CartService } from './cart.service';
import { ItemDTO } from './dtos/item.dto';
export declare class CartController {
    private cartService;
    constructor(cartService: CartService);
    addItemToCart(req: any, itemDTO: ItemDTO): Promise<import("./schemas/cart.schema").Cart>;
    removeItemFromCart(req: any, { productId }: {
        productId: any;
    }): Promise<any>;
    deleteCart(userId: string): Promise<import("./schemas/cart.schema").Cart>;
}
