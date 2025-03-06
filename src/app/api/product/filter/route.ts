import { Connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

Connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { priceFrom, priceTo, lookingFor, categories } = reqBody;

    const filter: any = {};

    const priceFilter: any = {};
    if (priceFrom !== undefined) priceFilter.$gte = priceFrom;
    if (priceTo !== undefined) priceFilter.$lte = priceTo;
    if (Object.keys(priceFilter).length > 0) filter.price = priceFilter;

    const lookingForKeys = Object.keys(lookingFor).filter(key => lookingFor[key]);
    const categoriesKeys = Object.keys(categories).filter(key => categories[key]);

    const andFilter: any[] = [];
    if (lookingForKeys.length > 0) andFilter.push({ gender: { $in: lookingForKeys } });
    if (categoriesKeys.length > 0) andFilter.push({ category: { $in: categoriesKeys } });
    if (Object.keys(priceFilter).length > 0) andFilter.push({ price: priceFilter });

    if (andFilter.length > 0) filter.$and = andFilter;

    const products = await Product.find(filter);
    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export default POST;
