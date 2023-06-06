import Pagination from 'app/components/Pagination';

import AnonymizeMemberModal from './components/AnonymizeMemberModal';
import ArchiveMemberModal from './components/ArchiveMemberModal';
import DeleteMemberModal from './components/DeleteMemberModal';
import MemberTable from './components/MemberTable';
import MemberTabsIndicatorContainer from './components/MemberTabsIndicatorContainer';
import { useMembersContext } from './context';

const Members = () => {
  const {
    members,
    membersMeta,
    setMemberFiler,
    deleteModalState: { open: deleteModalOpen, ids: deleteIds },
    archiveModalState: { open: archiveModalOpen, ids: archiveIds },
    anonymizeModalState: { open: anonymizeModalOpen, ids: anonymizeIds },
  } = useMembersContext();
  const changePage = (page: number) => {
    setMemberFiler((prev) => {
      return { ...prev, page };
    });
  };

  return (
    <>
      <div className="flex w-full justify-end pr-8">
        <button
          type="button"
          className="ml-4 w-56 h-12 bg-focus text-white rounded-xl hover:bg-hover-primary"
        >
          Invite Member
        </button>
      </div>
      <div className="flex justify-between items-end mt-4 ml-3 mr-8 border-b border-hover-blue">
        <MemberTabsIndicatorContainer />
        {members && members.length > 0 && (
          <Pagination
            paginationMeta={membersMeta}
            changePage={changePage}
            zeroBased={false}
          />
        )}
      </div>

      <div className="ml-1 mr-3">
        <MemberTable />
      </div>
      {deleteModalOpen && <DeleteMemberModal ids={deleteIds} />}
      {archiveModalOpen && <ArchiveMemberModal ids={archiveIds} />}
      {anonymizeModalOpen && <AnonymizeMemberModal ids={anonymizeIds} />}
    </>
  );
};

export default Members;
