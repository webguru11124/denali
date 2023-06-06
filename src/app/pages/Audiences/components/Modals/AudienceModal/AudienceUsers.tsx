import { ProfessionLocationUser } from 'app/api/audiences/types';
import { PageLoader, ScrollbarContainer } from 'app/components';
import audiencePlaceholder from 'assets/images/audience-creation-placeholder.png';

interface AudienceUsersProps {
  isLoading: boolean;
  users?: ProfessionLocationUser[];
}

const AudienceUsers = ({ isLoading, users }: AudienceUsersProps) => {
  return (
    <div className="mt-6 h-full">
      {isLoading && <PageLoader />}
      {users && (
        <div className="flex flex-col h-full">
          <span className="font-bold text-grayscale-primary">
            Members ({users.length})
          </span>
          {users.length > 0 && (
            <ScrollbarContainer className="mt-2.5 h-[242px]">
              {users.map((user, idx) => {
                return (
                  <div
                    key={`${idx}${user.id}`}
                    className="flex mt-3.5 w-full items-center"
                  >
                    <img
                      className="rounded"
                      src={user.avatars.small}
                      alt={user.fullName}
                    />
                    <div className="flex flex-col ml-3 text-sm">
                      <span className="text-grayscale-primary">
                        {user.fullName}
                      </span>
                      <span className="text-grayscale-secondary">
                        {user.profession.name} in {user.location.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </ScrollbarContainer>
          )}
          {users.length === 0 && (
            <div className="flex items-center justify-center h-full">
              No users for the selected filters
            </div>
          )}
        </div>
      )}
      {!users && !isLoading && (
        <div className="relative">
          <div className="flex justify-center items-center absolute h-full w-full">
            <span className="w-[226px] text-sm text-grayscale-secondary text-center">
              You will see the full summary after selecting filters.
            </span>
          </div>
          <img src={audiencePlaceholder} alt="placeholder" className="blur" />
        </div>
      )}
    </div>
  );
};

export default AudienceUsers;
