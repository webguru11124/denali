import createUserSelectHandler from '../createUserSelectHandler';

const alexParticipant = {
  fullName: 'Alex',
  id: 7,
  locations: [],
  messengerUsername: 'username',
  professions: [],
};

describe('userSelectHandler', () => {
  it(`adds a participant if it doesn't exist`, () => {
    const onError = jest.fn();
    let result;
    const setValue = jest.fn((action) => {
      result = action([{ id: 0 }, { id: 2 }]);
    });
    const handleUserSelect = createUserSelectHandler({
      maxParticipantCount: 5,
      setValue,
      onError,
    });

    handleUserSelect(alexParticipant);

    expect(setValue).toBeCalledTimes(1);
    expect(result).toHaveLength(3);
    expect(onError).toBeCalledTimes(1);
    expect(onError).toBeCalledWith(undefined);
  });

  it(`removes a participant if it exists`, () => {
    const onError = jest.fn();
    let result;
    const setValue = jest.fn((action) => {
      result = action([{ id: 0 }, { id: 7 }]);
    });
    const handleUserSelect = createUserSelectHandler({
      maxParticipantCount: 5,
      setValue,
      onError,
    });

    handleUserSelect(alexParticipant);

    expect(setValue).toBeCalledTimes(1);
    expect(result).toHaveLength(1);
    expect(onError).toBeCalledTimes(1);
    expect(onError).toBeCalledWith(undefined);
  });

  it('adds a participant when not exceeding a limit', () => {
    let result;
    const setValue = jest.fn((action) => {
      result = action([]);
    });
    const onError = jest.fn();
    const handleUserSelect = createUserSelectHandler({
      maxParticipantCount: 5,
      setValue,
      onError,
    });

    handleUserSelect(alexParticipant);

    expect(setValue).toBeCalledTimes(1);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(alexParticipant);
    expect(onError).toBeCalledTimes(1);
    expect(onError).toBeCalledWith(undefined);
  });

  it(`doesn't add a participant when exceeding a limit`, () => {
    const onError = jest.fn();
    const randomParticipants = Array(4)
      .fill(alexParticipant)
      .map((participant, index) => ({ ...participant, id: index }));
    let result;
    const setValue = jest.fn((action) => {
      result = action(randomParticipants);
    });
    const handleUserSelect = createUserSelectHandler({
      maxParticipantCount: 5,
      setValue,
      onError,
    });

    handleUserSelect(alexParticipant);

    expect(setValue).toBeCalledTimes(1);
    expect(result).toHaveLength(4);
    expect(result).toEqual(randomParticipants);
    expect(onError).toBeCalledTimes(1);
    expect(onError).toBeCalledWith('max-exceeded');
  });
});
