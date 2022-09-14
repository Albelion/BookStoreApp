import { TiStarFullOutline } from 'react-icons/ti';
import { StyledContainer } from '../Shared/styles';
import styled, { css } from 'styled-components';
import { useEffect, useState } from 'react';
import { useAuth } from '../../Auth';
import SessionManager from '../../SessionManager';
import { postRatingAsync, Book } from '../../Data/BookData';
const StyledLabel = styled.label``;
const StyledInputRadio = styled.input`
  display: none;
`;
const styledStarOutline = css`
  cursor: poiner;
  transition: color 200ms;
`;

const StyledStarFullOutline = styled(TiStarFullOutline)`
  ${styledStarOutline}
`;
const StyledStarContainer = styled(StyledContainer)`
  padding-top: 4px;
`;

export interface StarRatingWithStateProps {
  book: Book;
  notify: () => void;
  openLoginModal: () => void;
}
type StarRatingStates = {
  rating: number;
  hover: number;
  installed: boolean;
};

/*const setInitialRating = (isAuth: boolean, book: Book): StarRatingStates => {
  if (isAuth) {
    const userId = SessionManager.getUser().userId;
    const rating = book.ratings.find((r) => {
      if (r.users.find((u) => u.userId === userId)) {
        return true;
      } else {
        return false;
      }
    });
    if (rating) {
      const initialState: StarRatingStates = {
        rating: rating.value,
        hover: 0,
        installed: true,
      };
      return initialState;
    } else {
      const initialState: StarRatingStates = {
        rating: 0,
        hover: 0,
        installed: false,
      };
      return initialState;
    }
  }
  const initialState: StarRatingStates = {
    rating: 0,
    hover: 0,
    installed: false,
  };
  return initialState;
};*/

const StarRatingWithState = ({
  book,
  notify,
  openLoginModal,
}: StarRatingWithStateProps) => {
  const { isAuthenticated } = useAuth();
  //const initialState = setInitialRating(isAuthenticated, book);

  /*const [starState, setStarState] = useState<StarRatingStates>({
    ...initialState,
  });*/
  const [rating, setRating] = useState<number>(0);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [hover, setHover] = useState<number>(0);
  useEffect(() => {
    console.log('Enter in UseEffect StarRating');
    if (isAuthenticated) {
      const userId = SessionManager.getUser().userId;
      const rating = book.ratings.find((r) => {
        if (r.users.find((u) => u.userId === userId)) {
          return true;
        } else {
          return false;
        }
      });
      if (rating) {
        setRating(() => rating.value);
        setIsInstalled(() => true);
      }
    }
  }, [isAuthenticated, book.ratings]);
  const installRating = (ratingValue: number) => {
    if (!isAuthenticated) {
      openLoginModal();
    } else {
      setRating(ratingValue);
      const postRating = async () => {
        const postResult = await postRatingAsync({
          bookId: book.bookId,
          userId: SessionManager.getUser().userId!,
          value: ratingValue,
        });
        if (postResult) {
          notify();
          setIsInstalled(true);
        }
      };
      postRating();
    }
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
            <StyledStarFullOutline
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
