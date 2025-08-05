interface BreadcrumbTruncateProps {
  title: string;
}

const BreadcrumbTruncate = ({ title }: BreadcrumbTruncateProps) => {
  return <span className="line-clamp-1">{title}</span>;
};

export default BreadcrumbTruncate;
