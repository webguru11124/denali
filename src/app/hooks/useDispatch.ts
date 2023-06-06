import { AppDispatch } from 'app/store/types';
import { useDispatch as useReduxDispatch } from 'react-redux';

// Export a hook that can be reused to resolve types
const useDispatch = () => useReduxDispatch<AppDispatch>();

export default useDispatch;
