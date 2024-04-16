'use client'
import Image from "next/image"
import { useRouter } from "next/router"
const GamePage = ({ params }: { params: { id: string } }) => {

  console.log(params.id);

  return (
    <main className="container flex justify-center mx-auto">
      <Image alt="hero-image" width="460" height="215" src="https://cdn.cloudflare.steamstatic.com/steam/apps/1139900/header.jpg?t=1710442474" />
    </main>
  )
}

export default GamePage