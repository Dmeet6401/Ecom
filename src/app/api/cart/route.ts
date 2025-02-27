import { Connect } from "@/dbConfig/dbConfig";
import Cart from "@/models/addtocartModel";
import { NextRequest, NextResponse } from "next/server";


Connect();

export async function GET(request: NextRequest) {
  try {
    const cart = await Cart.find();
    return NextResponse.json(cart);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const cart = await Cart.create(reqBody);
    return NextResponse.json(cart, { status: 201 });
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
    const { id } = await request.json();
    await Cart.findByIdAndDelete(id);
    return NextResponse.json({ message: "Product romoved successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

