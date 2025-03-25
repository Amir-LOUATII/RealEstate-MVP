import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"

export default async function ProfilePage() {
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
    }
  })

  return (
    <div className="container py-10">
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={session.user?.image || ""} />
              <AvatarFallback>
                {session.user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{session.user?.name}</h2>
              <p className="text-muted-foreground">{session.user?.email}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Favorite Properties</CardTitle>
          </CardHeader>
          <CardContent>
            {favorites.length === 0 ? (
              <p className="text-muted-foreground">
                You haven't added any properties to your favorites yet.
              </p>
            ) : (
              <div className="grid gap-4">
                {favorites.map((property) => (
                  <div
                    key={property.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <h3 className="font-medium">{property.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {property.city}, {property.state}
                      </p>
                    </div>
                    <Button variant="outline">View Property</Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}