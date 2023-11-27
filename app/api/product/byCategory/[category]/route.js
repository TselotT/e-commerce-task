import { NextResponse } from "next/server";
export async function GET(req, context) {
  // const { pathname } = new URL(req.url, `http://${req.headers.get("host")}`);
  // const segments = pathname.split("/").filter(Boolean);
  // const category = segments[segments.length - 1];
  try {
    const response = await fetch(`https://fakestoreapi.com/products/category/jewelery`);
    if (!response.ok) {
      throw new Error(`Fetch error: ${response.statusText}`);
    }
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return new NextResponse(null, { status: 500 });
  }
}
