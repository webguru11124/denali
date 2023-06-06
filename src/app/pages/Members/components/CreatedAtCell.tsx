import { dayjs } from 'app/utils';

interface CreatedAtCellProps {
  createAt: number,
  status: number
}

const ActiveStatus = () => (
  <div className="flex items-center justify-center h-2 w-2 rounded-full bg-success mr-2">
  </div>
)
const InactiveStatus = () => (
  <div className="flex items-center justify-center h-2 w-2 rounded-full border border-gray-dark mr-2">
  </div>
)

const CreatedAtCell = ({
  createAt,
  status
}: CreatedAtCellProps) => {
  return (
    <td>
      <div className="flex justify-start items-center max-w-md">
        {status === 1 && <ActiveStatus />}
        {status === 0 && <InactiveStatus />}

        <div className="text-grayscale-secondary flex flex-col justify-between min-w-0">
          {dayjs(createAt * 1000).format('D MMM YYYY')}
        </div>
      </div>
    </td>
  );
};

export default CreatedAtCell;
