import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { PropertyGallery } from "@/components/property-gallery"
import { PropertyInfo } from "@/components/property-info"
import { AgentCard } from "@/components/agent-card"

export default async function PropertyPage({
  params
}: {
  params: { id: string }
}) {
  const property = await prisma.property.findUnique({
    where: { id: params.id },
    include: { agent: true }
  })

  if (!property) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PropertyGallery images={property.images} />
            <PropertyInfo property={property} />
          </div>
          <div>
            <AgentCard agent={property.agent} />
          </div>
        </div>
      </div>
    </div>
  )
}