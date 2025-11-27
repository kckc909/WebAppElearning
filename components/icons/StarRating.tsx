import { Star } from "lucide-react";

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex items-center space-x-1">
            {/* Full stars */}
            {[...Array(fullStars)].map((_, i) => (
                <Star key={`full-${i}`} className="h-5 w-5 text-yellow-400" fill="currentColor" />
            ))}

            {/* Half star */}
            {hasHalfStar && (
                <div className="relative w-5 h-5">
                    {/* Half filled */}
                    <Star className="absolute top-0 left-0 h-5 w-5 text-yellow-400" fill="currentColor" style={{ clipPath: "inset(0 50% 0 0)" }} />
                    {/* Outline */}
                    <Star className="absolute top-0 left-0 h-5 w-5 text-yellow-400" />
                </div>
            )}

            {/* Empty stars */}
            {[...Array(emptyStars)].map((_, i) => (
                <Star key={`empty-${i}`} className="h-5 w-5 text-yellow-400" />
            ))}
        </div>
    );
};

export default StarRating;
