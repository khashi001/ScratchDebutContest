import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  onRatingChange: (newRating: number) => void
  editable: boolean
}

export function StarRating({ rating, onRatingChange, editable }: StarRatingProps) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${
            star <= rating ? "text-yellow-600 fill-yellow-400" : "text-gray-500"
          } ${editable ? "cursor-pointer" : ""}`}
          onClick={() => editable && onRatingChange(star)}
        />
      ))}
    </div>
  )
}


