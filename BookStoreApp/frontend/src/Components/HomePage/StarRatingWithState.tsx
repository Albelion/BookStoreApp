import { TiStarOutline } from 'react-icons/ti';
import { StyledContainer } from '../Shared/styles';
import styled from 'styled-components';
import { useState } from 'react';

const StyledLabel = styled.label``;
const StyledInputRadio = styled.input`
  display: none;
`;
const StyledStarOutline = styled(TiStarOutline)`
  cursor: poiner;
  transition: color 200ms;
`;

type RatingState = number;

const StarRatingWithState = () => {
  const [rating, setRating] = useState<RatingState>(0);
  const [hover, setHover] = useState<RatingState>(0);
  return (
    <StyledContainer>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <StyledLabel>
            <StyledInputRadio
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <StyledStarOutline
              color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
              size="20px"
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            />
          </StyledLabel>
        );
      })}
    </StyledContainer>
  );
};
export default StarRatingWithState;
