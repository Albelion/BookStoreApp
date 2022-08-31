import { TiStarFullOutline } from 'react-icons/ti';
import { StyledContainer } from '../Shared/styles';
import styled from 'styled-components';
import { useState } from 'react';
import { postRatingAsync } from '../../Data/BookData';

const StyledLabel = styled.label``;
const StyledInputRadio = styled.input`
  display: none;
`;
const StyledStarOutline = styled(TiStarFullOutline)`
  cursor: poiner;
  transition: color 200ms;
`;
const StyledStarContainer = styled(StyledContainer)`
  padding-top: 4px;
`;

type RatingState = number;
export interface StarRatingWithStateProps {
  bookId: number;
  notify: () => void;
}

const StarRatingWithState = ({ bookId, notify }: StarRatingWithStateProps) => {
  const [rating, setRating] = useState<RatingState>(0);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [hover, setHover] = useState<RatingState>(0);
  const installRating = (ratingValue: number) => {
    console.log('start rating in install:');
    console.log(ratingValue);
    setRating(ratingValue);
    console.log('rating in install after setRating:');
    console.log(rating);
    const postRating = async () => {
      const postResult = await postRatingAsync({
        bookId: bookId,
        value: ratingValue,
      });
      if (postResult) {
        notify();
        setIsInstalled(true);
      }
    };
    postRating();
  };
  return (
    <StyledStarContainer>
      {[...Array(5)].map((star, i) => {
        const ratingValue: number = i + 1;
        return (
          <StyledLabel key={i}>
            <StyledInputRadio
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => {
                return isInstalled ? undefined : installRating(ratingValue);
              }}
            />
            <StyledStarOutline
              color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
              size="20px"
              onMouseEnter={() => {
                return isInstalled ? undefined : setHover(ratingValue);
              }}
              onMouseLeave={() => {
                return isInstalled ? undefined : setHover(0);
              }}
            />
          </StyledLabel>
        );
      })}
    </StyledStarContainer>
  );
};
export default StarRatingWithState;
