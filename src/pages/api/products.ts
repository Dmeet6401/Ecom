import { NextApiRequest, NextApiResponse } from "next";

const products = [
  {
    id: 1,
    name: "Basic Tee",
    color: "Black",
    price: "$35",
    imageSrc: "https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black."
  },
  {
    id: 2,
    name: "Basic Tee",
    color: "Black",
    price: "$35",
    imageSrc: "https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg",
    imageAlt: "Front of men's Basic Tee in black."
  },
  {
    id: 3,
    name: "Basic Tee",
    color: "Black",
    price: "$35",
    imageSrc: "https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg",
    imageAlt: "Front of men's Basic Tee in black."
  },
  {
    id: 4,
    name: "Basic Tee",
    color: "Black",
    price: "$35",
    imageSrc: "https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg",
    imageAlt: "Front of men's Basic Tee in black."
  },
  {
    id: 5,
    name: "Basic Tee",
    color: "Black",
    price: "$35",
    imageSrc: "https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black."
  },
  {
    id: 6,
    name: "Basic Tee",
    color: "Black",
    price: "$35",
    imageSrc: "https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg",
    imageAlt: "Front of men's Basic Tee in black."
  },
  {
    id: 7,
    name: "Basic Tee",
    color: "Black",
    price: "$35",
    imageSrc: "https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg",
    imageAlt: "Front of men's Basic Tee in black."
  },
  {
    id: 8,
    name: "Basic Tee",
    color: "Black",
    price: "$35",
    imageSrc: "https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg",
    imageAlt: "Front of men's Basic Tee in black."
  },
  // Add more products as needed
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(products);
}
