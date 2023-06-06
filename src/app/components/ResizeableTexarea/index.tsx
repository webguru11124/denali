import {
  ChangeEvent,
  FC,
  useState,
  TextareaHTMLAttributes,
  useRef,
  useEffect,
} from 'react';

interface ResizeableTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  defaultHeight?: number;
}

const ResizeableTextarea: FC<ResizeableTextareaProps> = ({
  style,
  defaultHeight = 200,
  value,
  ...restProps
}) => {
  const [height, setHeight] = useState(defaultHeight);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      const { scrollHeight } = textAreaRef.current;
      if (scrollHeight >= defaultHeight) {
        setHeight(scrollHeight);
      }
    }
  }, [defaultHeight, value]);

  return (
    <textarea
      value={value}
      ref={textAreaRef}
      style={{ ...style, height }}
      {...restProps}
    />
  );
};

export default ResizeableTextarea;
