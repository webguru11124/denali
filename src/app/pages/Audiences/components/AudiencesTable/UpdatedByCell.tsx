interface UpdatedByCellProps {
  name?: string;
  email?: string;
}

const UpdatedByCell = ({ name = '', email = '' }: UpdatedByCellProps) => {
  return (
    <td>
      <div className="flex flex-col">
        <span className="text-sm text-grayscale-primary">{name}</span>
        <span className="text-xs text-grayscale-secondary">{email}</span>
      </div>
    </td>
  );
};

export default UpdatedByCell;
