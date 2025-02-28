import { Connect } from "@/dbConfig/dbConfig";
import Cart from "@/models/addtocartModel";
import Product from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";
import getDataFromToken from "@/helpers/getDataFromToken";

Connect();

export async function GET(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    const cartItems = await Cart.find({ userId });

    const productIds = cartItems.map(item => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    const cartWithProductDetails = cartItems.map(item => {
      
      const product = products.find(p => p._id.equals(item.productId));
      return {
        ...item.toObject(),
        product
      };
    });

    console.log("🚀 ~ GET ~ cartWithProductDetails:", cartWithProductDetails)

    return NextResponse.json(cartWithProductDetails);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function POST(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    const { productId, quantity } = await request.json();

    let cartItem = await Cart.findOne({ productId });

    if (cartItem) {
      cartItem.quantity += quantity;
      cartItem = await cartItem.save();
      return NextResponse.json(cartItem, { status: 200 });
    } else {
      const newCartItem = await Cart.create({ userId, productId, quantity });
      // console.log("🚀 ~ POST ~ newCartItem:", newCartItem)
      return NextResponse.json(newCartItem, { status: 201 });

    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const cart = await Cart.findByIdAndUpdate(reqBody.id, reqBody, { new: true });
    return NextResponse.json(cart);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    const { productId } = await request.json();
    // const mycart= await Cart.find({productId});

    console.log("🚀 ~ DELETE ~ mycart:", userId)

    const cartItem = await Cart.findOneAndDelete({productId });


    console.log("🚀 ~ DELETE ~ cartItem:", cartItem)
    if (!cartItem) {
      return NextResponse.json({ error: "Item not found in cart" }, { status: 404 });
    }

    return NextResponse.json({ message: "Item removed from cart" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

