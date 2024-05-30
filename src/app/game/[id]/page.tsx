import { IGame } from "@/models/interfaces"
import Image from "next/image"

export default async function GamePage({ params }: { params: { id: string } }) {

  async function getGame() {
    const res = await fetch(`http://localhost:3000/api/game/${params.id}`)
    if (!res.ok) return
    return res.json()
  }

  const game: IGame = await getGame()

  return (
    <main className="container flex justify-center mx-auto">
      <h1>{game.title}</h1>
    </main>
  )
}