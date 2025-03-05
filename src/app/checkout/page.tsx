"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";

interface CartItem {
  productId: string;
  quantity: number;
  product: {
      _id: string;
      name: string;
      imageSrc: string;
      price: number;
  };
}
const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const total = searchParams.keys().next().value || '0';
  // const total = searchParams.get("total") || "0"; // Get the total from query params
  const [paymentMethod, setPaymentMethod] = useState("credit card"); 
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [userId, setUser] = useState<string>("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  const { token } = useAuth();

  useEffect(() => {
    console.log("checkout page token", token);
    if (token) {
      setUser(token);
    }
  }, [token]);

  useEffect(() => {
    console.log("checkout page userId", userId);
  }, [userId]);
  useEffect(() => {
    const fetchCartItems = async () => {
        try {
            const response = await axios.get('/api/cart');
            const data = response.data || [];
            
            setCartItems(data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    fetchCartItems();
}, []);

  const [order, setOrder] = useState({
    order_id: `ORD${Math.floor(10000000 + Math.random() * 90000000)}`, // Generate unique 8-digit order ID
    userId: "",
    order_date: new Date().toISOString(), // Set current date-time
    total_amount: total,
    name: "",
    email: "",
    phone: "",
    country: "",
    address: "",
    city: "",
    pincode: "",
    payment_type: paymentMethod, // Default, can be updated based on the payment method
    payment_status: paymentStatus, // Default, or you can set this dynamically
    delivery_status: "shipped", // Default, or you can set this dynamically
    products: cartItems,
  });

  const checkout = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission

    const updatedOrder = {
      ...order,
      userId: userId,
      payment_status: paymentMethod === "cash" ? "pending" : "completed",
      products: cartItems, // Ensure products are included in the order
    };

    try {
      // Assuming your backend expects this JSON structure at this endpoint
      await axios.post("http://localhost:5000/api/addOrder", updatedOrder);
      console.log("Order added successfully");
      router.push(`/invoice?${order.order_id}`);
    } catch (error: any) {
      console.error("Failed to add order", error.message);
    }
  };

  return (
    <>
      <Navbar />
      <section className="bg-white py-8 antialiased md:py-16">
        <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0" onSubmit={checkout} >
          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
            <div className="min-w-0 flex-1 space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Delivery Details</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900">
                      Your Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={order.name}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black"
                      placeholder="John Doe"
                      required
                      onChange={(e) => setOrder({ ...order, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">
                      Your email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={order.email}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black"
                      placeholder="johndoe@example.com"
                      required
                      onChange={(e) => setOrder({ ...order, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="mb-2 block text-sm font-medium text-gray-900">
                      Country*
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={order.country}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black"
                      placeholder="USA"
                      required
                      onChange={(e) => setOrder({ ...order, country: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="mb-2 block text-sm font-medium text-gray-900">
                      City*
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={order.city}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black"
                      placeholder="Springfield"
                      required
                      onChange={(e) => setOrder({ ...order, city: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-900">
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={order.phone}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black"
                      placeholder="+1234567890"
                      required
                      onChange={(e) => setOrder({ ...order, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="address" className="mb-2 block text-sm font-medium text-gray-900">
                      Address*
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={order.address}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black"
                      placeholder="1234 Elm Street, Springfield"
                      required
                      onChange={(e) => setOrder({ ...order, address: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="pincode" className="mb-2 block text-sm font-medium text-gray-900">
                      Pin Code*
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={order.pincode}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black"
                      placeholder="62701"
                      required
                      onChange={(e) => setOrder({ ...order, pincode: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Payment Details</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="payment_method" className="mb-2 block text-sm font-medium text-gray-900">
                      Payment Method*
                    </label>
                    <select
                      id="payment_method"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black"
                      required
                    >
                      <option value="cash">Cash</option>
                      <option value="upi">UPI</option>
                      <option value="credit card">Credit Card</option>
                      <option value="debit card">Debit Card</option>
                    </select>
                  </div>
                  {paymentMethod === "credit card" || paymentMethod === "debit card" ? (
                    <>
                      <div>
                        <label htmlFor="card_number" className="mb-2 block text-sm font-medium text-gray-900">
                          Card Number*
                        </label>
                        <input
                          type="text"
                          id="card_number"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black"
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="card_name" className="mb-2 block text-sm font-medium text-gray-900">
                          Name on Card*
                        </label>
                        <input
                          type="text"
                          id="card_name"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="expiry_date" className="mb-2 block text-sm font-medium text-gray-900">
                          Expiry Date*
                        </label>
                        <input
                          type="text"
                          id="expiry_date"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="mb-2 block text-sm font-medium text-gray-900">
                          CVV*
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black"
                          placeholder="123"
                          required
                        />
                      </div>
                    </>
                  ) : paymentMethod === "upi" ? (
                    <div>
                      <label htmlFor="upi_id" className="mb-2 block text-sm font-medium text-gray-900">
                        UPI ID*
                      </label>
                      <input
                        type="text"
                        id="upi_id"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black"
                        placeholder="example@upi"
                        required
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="mt-8 lg:mt-0 lg:w-2/5">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium text-gray-900">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-gray-900">
                    <span>Shipping</span>
                    <span>₹5.00</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-gray-900">
                    <span>GST (18%)</span>
                    <span>₹{(parseFloat(total || '0') * 0.18).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-gray-900">
                    <span>Total</span>
                    <span>₹{(parseFloat(total || '0') + 5 + parseFloat(total || '0') * 0.18).toFixed(2)}</span>
                  </div>
                </div>
                <button
                  
                  type="submit"
                  className="w-full rounded-lg bg-gray-700 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-black"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default CheckoutPage;
