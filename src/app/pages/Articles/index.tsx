import TablePageContainer from 'app/components/TablePageContainer';

import Articles from './Articles';
import ToastContainer from './Components/Toast/ToastContainer';
import { ArticlesContextProvider } from './context';

const ArticlesContextWrapper = () => {
  return (
    <ArticlesContextProvider>
      <TablePageContainer className="pr-0 pl-0">
        <Articles />
        <ToastContainer toastId="archive_unarchive" />
      </TablePageContainer>
    </ArticlesContextProvider>
  );
};

export default ArticlesContextWrapper;
