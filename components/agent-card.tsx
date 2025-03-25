import { Agent } from "@prisma/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail } from "lucide-react"

interface AgentCardProps {
  agent: Agent
}

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center mb-6">
          <img
            src={agent.image}
            alt={agent.name}
            className="h-16 w-16 rounded-full mr-4"
          />
          <div>
            <h3 className="font-semibold">{agent.name}</h3>
            <p className="text-sm text-muted-foreground">Real Estate Agent</p>
          </div>
        </div>
        {agent.bio && (
          <p className="text-sm text-muted-foreground mb-6">{agent.bio}</p>
        )}
        <div className="space-y-4">
          <Button className="w-full" variant="outline">
            <Phone className="h-4 w-4 mr-2" />
            {agent.phone}
          </Button>
          <Button className="w-full">
            <Mail className="h-4 w-4 mr-2" />
            Contact Agent
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}