import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { PropertyCard } from "@/components/property-card"

export default async function FavoritesPage() {
  const session = await auth()
  
  if (!session) {
    redirect("/auth/signin")
  }

  const favorites = await prisma.property.findMany({
    where: {
      favoredBy: {
        some: {
          id: session.user.id
        }
      }
    },
    include: {
      agent: true
    }
  })

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Your Favorite Properties</h1>
      {favorites.length === 0 ? (
        <p className="text-muted-foreground text-center py-10">
          You haven't added any properties to your favorites yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  )
}