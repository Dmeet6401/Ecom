"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { useSearchParams } from "next/navigation";

type Product = {
  _id: string;
  userId: string;
  productId: string;
  quantity: number;
  addedAt: string;
  __v: number;
  product: {
    _id: string;
    name: string;
    color: string;
    price: number;  // Keep price as a number
    imageSrc: string;
    gender: string;
    category: string;
    describe: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
};

type OrderDatas = {
  id: number;
  userId: string;
  order_id: string;
  order_date: string;
  total_amount: number;  // Change to number
  name: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  city: string;
  pincode: string;
  payment_type: string;
  payment_status: string;
  delivery_status: string;
  products: Product[];
  createdAt: string;
  updatedAt: string;
};

const InvoicePage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.keys().next().value;

  const [orderData, setOrderData] = useState<OrderDatas | null>(null);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrderData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/getOrder/${orderId}`);
        setOrderData(response.data);

      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchOrderData();
  }, [orderId]);

  if (!orderData) {
    return <div>Loading...</div>;
  }

  const calculateTotalAmount = () => {
    // Calculate the total amount of products in the order
    return orderData.products.reduce((total, product) => {
      return total + product.product.price * product.quantity;
    }, 0);
  };

  const subtotal = calculateTotalAmount();
  const gst = subtotal * 0.18;
  const shipping = 5.00; // Shipping cost is fixed, can be dynamic if needed
  const totalAmount = subtotal + gst + shipping;

  return (
    <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
      <div className="mb-5 pb-5 flex justify-between items-center border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Invoice</h2>
        </div>
        <div className="inline-flex gap-x-2">
            <button
               
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50">
              <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              Invoice PDF
            </button>
            <button
             onClick={() => window.print()}
             className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-800 text-white hover:bg-black focus:outline-hidden focus:bg-gray-800 disabled:opacity-50 disabled:pointer-events-none">
            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
            Print
            </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <div className="grid space-y-3">
            <dl className="flex flex-col sm:flex-row gap-x-3 text-sm">
              <dt className="min-w-36 max-w-50 text-gray-500">Billed to:</dt>
              <dd className="text-gray-800">
                <a className="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium" href="#">
                  {orderData.email}
                </a>
              </dd>
            </dl>

            <dl className="flex flex-col sm:flex-row gap-x-3 text-sm">
              <dt className="min-w-36 max-w-50 text-gray-500">Billing details:</dt>
              <dd className="font-medium text-gray-800">
                <span className="block font-semibold">{orderData.name}</span>
                <address className="not-italic font-normal">
                  {orderData.address},<br />
                  {orderData.city}, {orderData.country},<br />
                  {orderData.pincode}<br />
                </address>
              </dd>
            </dl>

            <dl className="flex flex-col sm:flex-row gap-x-3 text-sm">
              <dt className="min-w-36 max-w-50 text-gray-500">Shipping details:</dt>
              <dd className="font-medium text-gray-800">
                <span className="block font-semibold">{orderData.name}</span>
                <address className="not-italic font-normal">
                  {orderData.address},<br />
                  {orderData.city}, {orderData.country},<br />
                  {orderData.pincode}<br />
                </address>
              </dd>
            </dl>
          </div>
        </div>

        <div>
          <div className="grid space-y-3">
            <dl className="flex flex-col sm:flex-row gap-x-3 text-sm">
              <dt className="min-w-36 max-w-50 text-gray-500">Invoice number:</dt>
              <dd className="font-medium text-gray-800">{orderData.order_id}</dd>
            </dl>

            <dl className="flex flex-col sm:flex-row gap-x-3 text-sm">
              <dt className="min-w-36 max-w-50 text-gray-500">Due date:</dt>
              <dd className="font-medium text-gray-800">{new Date(orderData.order_date).toLocaleDateString()}</dd>
            </dl>

            <dl className="flex flex-col sm:flex-row gap-x-3 text-sm">
              <dt className="min-w-36 max-w-50 text-gray-500">Billing method:</dt>
              <dd className="font-medium text-gray-800">{orderData.payment_type}</dd>
            </dl>
          </div>
        </div>
      </div>

      <div className="mt-6 border border-gray-200 p-4 rounded-lg space-y-4">
        <div className="hidden sm:grid sm:grid-cols-5">
          <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">Item</div>
          <div className="text-start text-xs font-medium text-gray-500 uppercase">Qty</div>
          <div className="text-start text-xs font-medium text-gray-500 uppercase">Rate</div>
          <div className="text-end text-xs font-medium text-gray-500 uppercase">Amount</div>
        </div>

        <div className="hidden sm:block border-b border-gray-200"></div>

        {orderData.products.map((product, index) => (
          <div key={index} className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            <div className="col-span-full sm:col-span-2">
              <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Item</h5>
              <p className="font-medium text-gray-800">{product.product.name}</p>
            </div>
            <div>
              <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Qty</h5>
              <p className="text-gray-800">{product.quantity}</p>
            </div>
            <div>
              <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Rate</h5>
              <p className="text-gray-800">₹{product.product.price}</p>
            </div>
            <div>
              <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Amount</h5>
              <p className="sm:text-end text-gray-800">₹{(product.product.price * product.quantity)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex sm:justify-end">
        <div className="w-full max-w-2xl sm:text-end space-y-2">
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
            <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
              <dt className="col-span-3 text-gray-500">Subtotal:</dt>
              <dd className="col-span-2 font-medium text-gray-800">₹{subtotal}</dd>
            </dl>

            <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
              <dt className="col-span-3 text-gray-500">GST (18%):</dt>
                <dd className="col-span-2 font-medium text-gray-800">₹{gst.toFixed(2)}</dd>
            </dl>

            <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
              <dt className="col-span-3 text-gray-500">Shipping:</dt>
              <dd className="col-span-2 font-medium text-gray-800">₹{shipping.toFixed(2)}</dd>
            </dl>

            <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
              <dt className="col-span-3 text-gray-500">Total:</dt>
              <dd className="col-span-2 font-medium text-gray-800">₹{totalAmount.toFixed(2)}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
