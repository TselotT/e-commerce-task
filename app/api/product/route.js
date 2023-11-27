import { NextResponse } from "next/server";
export async function GET() {

  try {
    const response = await fetch("https://fakestoreapi.com/products");
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
