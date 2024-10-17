
import mongoose, { Document, Schema } from 'mongoose';


interface CartItem {
    productId: string
    quantity: number;
}

interface Cart extends Document {
    userId: mongoose.Types.ObjectId;
    items: CartItem[];
}


const cartSchema: Schema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    items: [
        {
            productId: {
                type: String,
                required: true,
                ref: 'Product',
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        },
    ],
});

const CartModel = mongoose.model<Cart>('Cart', cartSchema);

export { CartModel, Cart, CartItem };
