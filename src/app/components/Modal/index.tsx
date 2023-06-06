import { cx, css } from '@emotion/css';
import styled from '@emotion/styled';
import { useDispatch } from 'app/hooks';
import { actions } from 'app/store/modal';
import { ReactNode, useEffect } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

const ModalContainer = styled.div`
  background-color: rgba(34, 34, 34, 0.3);
`;

const ContentContainer = styled.div`
  max-height: 90vh;
`;

const modalWidth = {
  md: '450px',
  lg: '530px',
};

interface ModalProps {
  onClose: () => void;
  heading?: JSX.Element;
  className?: string;
  overflow?: boolean;
  width?: keyof typeof modalWidth;
  containerPaddingClass?: string;
  children: ReactNode;
}

const Modal = ({
  children,
  onClose,
  heading,
  className,
  width,
  overflow,
  containerPaddingClass = 'py-6 px-6',
}: ModalProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.modalOpened());

    return () => {
      dispatch(actions.modalClosed());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ModalContainer className="fixed z-50 top-0 left-0 w-screen h-screen">
      <div className="flex items-center w-full h-full justify-center">
        <OutsideClickHandler onOutsideClick={onClose}>
          <ContentContainer
            className={cx(
              'rounded-lg modal_content_container bg-light shadow-atobi',
              { 'overflow-y-auto': !overflow },
              width &&
                css(`
              width: ${modalWidth[width]}
            `)
            )}
          >
            {heading && (
              <div className="border-b border-gray-light pt-6 pb-4 px-6">
                {heading}
              </div>
            )}
            <div
              className={cx(
                'overflow-auto modal_content',
                className,
                containerPaddingClass
              )}
            >
              {children}
            </div>
          </ContentContainer>
        </OutsideClickHandler>
      </div>
    </ModalContainer>
  );
};

export default Modal;
