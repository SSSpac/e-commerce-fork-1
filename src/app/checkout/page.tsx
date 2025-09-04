'use client';
import { useCart } from "../../app/components/Providers/CartProvider";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const { cartItems, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zipCode: '',
        cardNumber: '',
        cardExpiry: '',
        cvv: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        setTimeout(() => {
            setIsProcessing(false);
            setOrderComplete(true);

            setTimeout(() => {
                clearCart();
                router.push('/');
            }, 58_000);
        }, 2_000);
    };

    if (cartItems.length === 0 && !orderComplete) {
        return (
            <main className="p-8 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-black">Checkout</h1>
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <p className="text-gray-600 mb-4">Your cart is empty</p>
                    <button
                        onClick={() => router.push('/')}
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Continue Shopping
                    </button>
                </div>
            </main>
        );
    }

    if (orderComplete) {
        return (
            <main className="p-8 max-w-2xl mx-auto">
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">Order Successful! 🎉</h2>
                    <p className="text-gray-600 mb-4">Thank you for your purchase!</p>
                    <p className="text-sm text-gray-500">Redirecting to home page...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="p-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-black">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                <div className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
   
                        <section className="bg-white p-6 rounded-lg border">
                            <h2 className="text-xl font-semibold mb-4 text-black">Contact Information</h2>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full p-3 border rounded mb-4 text-black"
                            />
                        </section>

                        <section className="bg-white p-6 rounded-lg border">
                            <h2 className="text-xl font-semibold mb-4 text-black">Shipping Information</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                    className="p-3 border rounded text-black"
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                    className="p-3 border rounded text-black"
                                />
                            </div>
                            <input
                                type="text"
                                name="address"
                                placeholder="Street Address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                                className="w-full p-3 border rounded mt-4 text-black"
                            />
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    required
                                    className="p-3 border rounded text-black"
                                />
                                <input
                                    type="text"
                                    name="zipCode"
                                    placeholder="ZIP Code"
                                    value={formData.zipCode}
                                    onChange={handleInputChange}
                                    required
                                    className="p-3 border rounded text-black"
                                />
                            </div>
                        </section>

                        <section className="bg-white p-6 rounded-lg border">
                            <h2 className="text-xl font-semibold mb-4 text-black">Payment Information</h2>
                            <input
                                type="text"
                                name="cardNumber"
                                placeholder="Card Number"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                required
                                maxLength={16}
                                className="w-full p-3 border rounded mb-4 text-black"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="cardExpiry"
                                    placeholder="MM/YY"
                                    value={formData.cardExpiry}
                                    onChange={handleInputChange}
                                    required
                                    maxLength={5}
                                    className="p-3 border rounded text-black"
                                />
                                <input
                                    type="text"
                                    name="cvv"
                                    placeholder="CVV"
                                    value={formData.cvv}
                                    onChange={handleInputChange}
                                    required
                                    maxLength={3}
                                    className="p-3 border rounded text-black"
                                />
                            </div>
                        </section>

                        <button
                            type="submit"
                            disabled={isProcessing}
                            className={`w-full py-3 rounded font-semibold transition ${isProcessing
                                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                        >
                            {isProcessing ? 'Processing...' : `Place Order - $${cartTotal.toFixed(2)}`}
                        </button>
                    </form>
                </div>

  
                <div className="lg:sticky lg:top-8 h-fit">
                    <section className="bg-gray-50 p-6 rounded-lg border">
                        <h2 className="text-xl font-semibold mb-4 text-black">Order Summary</h2>

                        <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                            {cartItems.map((item, idx) => (
                                <div key={`${item.name}-${idx}`} className="flex items-center gap-3 pb-3 border-b">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-black">{item.name}</p>
                                        <p className="text-xs text-gray-600">Qty: {item.qty}</p>
                                    </div>
                                    <p className="text-sm font-medium text-black">
                                        ${(item.price * item.qty).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2 pt-4 border-t">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="text-black">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Shipping</span>
                                <span className="text-black">Free</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Tax</span>
                                <span className="text-black">${(cartTotal * 0.08).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                                <span className="text-black">Total</span>
                                <span className="text-black">${(cartTotal * 1.08).toFixed(2)}</span>
                            </div>
                        </div>
                    </section>

                    <div className="mt-4 text-center">
                        <p className="text-xs text-gray-500">🔒 Secure Checkout</p>
                        <p className="text-xs text-gray-400 mt-1">Your information is encrypted</p>
                    </div>
                </div>
            </div>
        </main>
    );
}

