import { IStore } from "@/models/interfaces";
import { lowerCaseNoSpace } from "@/utils/cleanText";
import Image from "next/image";
import Link from "next/link";

type Props = {
  id: string;
};

async function GetStore(id: string) {
  const res = await fetch(`http://localhost:3000/api/store/${id}`);

  if (!res.ok) return;
  return await res.json();
}

export default async function StoreCard({ id }: Props) {
  const store: IStore = await GetStore(id);
  return (
    <div className="card rounded-md card-compact w-80 shadow-xl">
      <figure className="bg-white p-12">
        <Image
          src={`/img/stores/${store.id}.png`}
          alt={store.name}
          width={150}
          height={150}
        />
      </figure>
      <div className=" rounded-b-md bg-accent px-0 m-0">
        <h1 className="card-title text-5xl font-normal justify-center text-center py-4 text-info mx-auto">
          {store.name.toUpperCase()}
        </h1>
        <div className="flex flex-col gap-4">
          <h1 className=" font-normal text-4xl text-info bg-primary p-4 text-center">
            100
          </h1>
          <div className="card-actions justify-center mb-4">
            <button className="btn btn-primary rounded-none">
              <Link href={"google.com"} target="_blank">
                <h1 className="font-normal text-2xl  text-info">Buy Now</h1>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
