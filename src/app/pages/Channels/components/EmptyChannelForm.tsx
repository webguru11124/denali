import styled from '@emotion/styled';

const Container = styled.div`
  box-shadow: 0px 0px 15px rgba(115, 117, 186, 0.08);
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='32' ry='32' stroke='%23D2CECDFF' stroke-width='2' stroke-dasharray='16%2c 16' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
`;

const EmptyChannelForm = () => {
  return (
    <Container className="overflow-clip bg-white rounded-2xl mb-4 w-full col-span-4" />
  );
};

export default EmptyChannelForm;
