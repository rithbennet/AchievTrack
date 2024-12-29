import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { PlusCircle, Trophy } from 'lucide-react'

export default function QuickLinks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Links</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" /> Add 
        </Button>
        <Button variant="outline" className="w-full">
          <Trophy className="mr-2 h-4 w-4" /> View
        </Button>
      </CardContent>
    </Card>
  )
}

