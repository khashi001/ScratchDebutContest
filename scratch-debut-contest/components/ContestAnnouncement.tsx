import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ContestAnnouncementProps {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  resultAnnouncementDate: string
}

export function ContestAnnouncement({
  id,
  title,
  description,
  startDate,
  endDate,
  resultAnnouncementDate,
}: ContestAnnouncementProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Start Date: {new Date(startDate).toLocaleDateString()}</p>
        <p>End Date: {new Date(endDate).toLocaleDateString()}</p>
        <p>Result Announcement: {new Date(resultAnnouncementDate).toLocaleDateString()}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/contests/${id}`}>
          <Button>View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

