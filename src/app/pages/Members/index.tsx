import TablePageContainer from 'app/components/TablePageContainer';

import { MembersContextProvider } from './context';
import Members from './Members';

const MembersContextWrapper = () => {
  return (
    <MembersContextProvider>
      <TablePageContainer className="pr-0 pl-0" >
        < Members />
      </TablePageContainer>
    </MembersContextProvider >
  )
}

export default MembersContextWrapper;