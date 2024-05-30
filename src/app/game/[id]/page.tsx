import Image from "next/image"
const GamePage = ({ params }: { params: { id: string } }) => {

  fetch(`http://localhost:3000/api/game/${params.id}`).then(res => res.json()).then(data => console.log(data))

  return (
    <main className="container flex justify-center mx-auto">
      <Image priority alt="hero-image" width="460" height="215" src="https://cdn.cloudflare.steamstatic.com/steam/apps/1139900/header.jpg?t=1710442474" />
    </main>
  )
}

export default GamePage