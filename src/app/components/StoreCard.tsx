"use client";
import { IStore, IStoreOffer } from "@/models/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  offer: IStoreOffer;
};

export default function StoreCard({ offer }: Props) {
  const [store, setStore] = useState<IStore>();

  useEffect(() => {
    fetch(`http://localhost:3000/api/store/${offer.storeID}`)
      .then((res) => res.json())
      .then((store) => setStore(store));
  }, [offer.storeID]);

  const isSale: Boolean = Math.round(Number(offer.savings)) > 0;
  return (
    <>
      {store ? (
        <div className="card rounded-md card-compact w-60 md:w-80 shadow-xl">
          <figure className="bg-white p-12">
            <Image
              src={`/img/stores/${store.id}.png`}
              alt={store.name}
              width={150}
              height={150}
            />
          </figure>
          <div className=" rounded-b-md bg-accent px-0 m-0">
            <h1 className="card-title text-4xl md:text-5xl font-normal justify-center text-center py-4 text-info mx-auto">
              {store.name.toUpperCase()}
            </h1>
            <div className="flex flex-col gap-4">
              {isSale ? (
                <h1 className=" font-normal text-4xl text-info bg-primary p-4 text-center">
                  <span className="text-base-100">
                    <span className="line-through">{offer.retailPrice}</span> -
                    {Math.round(Number(offer.savings))}%
                  </span>
                  <span className="text-info"> = {offer.price}</span>
                </h1>
              ) : (
                <h1 className=" font-normal text-4xl text-info bg-secondary p-4 text-center">
                  {offer.price}
                </h1>
              )}
              <div className="card-actions justify-center mb-4">
                <button
                  className={`btn ${
                    isSale ? "btn-primary" : "btn-secondary"
                  } rounded-none`}
                >
                  <Link
                    href={`https://www.cheapshark.com/redirect?dealID=${offer.dealID}`}
                    target="_blank"
                  >
                    <h1 className="font-normal text-2xl  text-info">BUY NOW</h1>
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
