interface BottomToastProps {
  text: string;
  backgroundColor?: 'error' | 'warning' | 'success' | 'grayscale-primary';
  textColor?: 'white' | 'black';
}

const BottomToast = ({
  text,
  backgroundColor = 'grayscale-primary',
  textColor = 'white',
}: BottomToastProps) => {
  return (
    <div
      className={`font-lato py-3 px-5 text-center rounded-lg bg-${backgroundColor} text-${textColor}`}
    >
      {text}
    </div>
  );
};

export default BottomToast;
