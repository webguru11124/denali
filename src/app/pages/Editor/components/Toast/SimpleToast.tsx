const SimpleToast = ({ text, Icon }: { text: string; Icon?: JSX.Element }) => {
  return (
    <div className="flex h-full rounded-lg border border-transparent mx-2">
      {Icon && Icon}
      <span className="text-sm text-white font-lato">{text}</span>
    </div>
  );
};

export default SimpleToast;
