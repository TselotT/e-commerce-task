"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
//
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "@/app/redux/features/cartSlice";

async function fetchData(category) {
  try {
    const response = await fetch(`/api/product/byCategory/${category}`, {
      headers: {
        Accept: "application/json",
        method: "GET",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
export default function ProductList() {
  const [data, setData] = useState([]);
  const pathname = usePathname();
  const category = pathname.substring(pathname.lastIndexOf("/") + 1);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const loadData = async () => {
    try {
      const data = await fetchData(category);
      console.log("IN use effct", data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold text-gray-900">{category}</h2>

        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {data?.map((product) => (
            <div key={product.id} className="flex flex-col justify-between">
              <div className="relative">
                <div className="relative h-72 w-full overflow-hidden rounded-lg">
                  <img
                    src={product.image}
                    alt={product.image}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="relative mt-4">
                  <h3 className="text-sm font-medium text-gray-900 hover:cursor">
                    <Link href="/productFeature">{product.title}</Link>
                  </h3>
                  {product.color !== null ||
                    (undefined && (
                      <p className="mt-1 text-sm text-gray-500">
                        {product.color}
                      </p>
                    ))}
                </div>
                <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                  />
                  <p className="relative text-lg font-semibold text-white">
                    {product.price} $
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => {
                    console.log("!23");
                    dispatch(
                      addItem({
                        id: product.id,
                        name: product.title,
                        price: product.price,
                      })
                    );
                    console.log("34..");
                  }}
                  className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                >
                  Add to bag<span className="sr-only">, {product.name}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
