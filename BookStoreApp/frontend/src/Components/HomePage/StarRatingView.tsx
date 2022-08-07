import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from 'react-icons/ti';
import { StyledContainer } from '../Shared/styles';

interface Props {
  rating: number;
}

const StarRatingView = ({ rating }: Props) => {
  let numStars = Math.floor(rating);
  const rem = rating - numStars;
  numStars = rem > 0.75 ? numStars + 1 : numStars;
  let isHalfStar = rem > 0.25 && rem < 0.75 ? true : false;
  return (
    <StyledContainer>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        if (numStars >= ratingValue) {
          return <TiStarFullOutline key={i} size="30px" color="#E7D926" />;
        } else if (isHalfStar) {
          isHalfStar = false;
          return <TiStarHalfOutline key={i} size="30px" color="#E7D926" />;
        } else {
          return <TiStarOutline key={i} size="30px" color="#e4e5e9" />;
        }
      })}
    </StyledContainer>
  );
};
export default StarRatingView;
