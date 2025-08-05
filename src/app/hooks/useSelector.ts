import { RootState } from 'app/store/types';
import { useSelector as useReduxSelector } from 'react-redux';

const useAppSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
): TSelected => useReduxSelector(selector, equalityFn);

export default useAppSelector;
