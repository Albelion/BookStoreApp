const paginationIndex = (
  numItems: number,
  currentPage: string | undefined,
  pageSize: number,
): number[] => {
  const startIndex = currentPage ? (Number(currentPage) - 1) * pageSize : 0;
  const endIndex =
    numItems - startIndex >= pageSize
      ? startIndex + pageSize
      : startIndex + (numItems - startIndex);
  const indexArray = [startIndex, endIndex];
  return indexArray;
};
export default paginationIndex;
