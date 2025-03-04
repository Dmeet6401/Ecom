import { Connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

Connect();

export async function GET(request: NextRequest) {
  try {
    // Extract search parameters from the request URL
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    // console.log("id", id);
    //postman url
    // http://localhost:3000/api/product?id=616c5d2b6f3e5f0d

    // Check if 'id' parameter is present
    if (id) {
      // Find product by ID
      const product = await Product.findById(id);
      if (!product) {
        // Return 404 if product not found
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }
      // Return the found product
      return NextResponse.json(product);
    } else {
      // If no 'id', return all products
      const products = await Product.find();
      return NextResponse.json(products);
    }
  } catch (error: any) {
    // Handle any errors
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const product = await Product.create(reqBody);
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const product = await Product.findByIdAndUpdate(reqBody.id, reqBody, { new: true });
    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: "Product removed successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


