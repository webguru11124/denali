import updateOptimisticIDsForSorting from './updateOptimisticIDsForSorting';

const getMessages = () => [
  {
    id: '1',
    type: 'text',
    sequenceId: '624',
    version: '1648811681373',
    senderDisplayName: 'My name',
    createdOn: '2022-04-01T11:14:41.000Z',
    content: {
      message: 'adfv1',
    },
    sender: {
      kind: 'communicationUser',
      communicationUserId: '--------',
      userId: 1,
      avatar: '--------',
      fullName: 'My name',
    },
    isMine: true,
    files: [],
    metadata: {
      clientId: '1',
    },
  },
  {
    id: '2',
    type: 'text',
    sequenceId: '623',
    version: '1648811679190',
    senderDisplayName: 'My name',
    createdOn: '2022-04-01T11:14:39.000Z',
    content: {
      message: 'dfg',
    },
    sender: {
      kind: 'communicationUser',
      communicationUserId: '--------',
      userId: 1,
      avatar: '--------',
      fullName: 'My name',
    },
    isMine: true,
    files: [],
    metadata: {
      clientId: '2',
    },
  },
  {
    id: '3',
    type: 'text',
    sequenceId: '622',
    version: '1648811678923',
    senderDisplayName: 'My name',
    createdOn: '2022-04-01T11:14:38.000Z',
    isResponseReceived: false,
    content: {
      message: 'adfga',
    },
    sender: {
      kind: 'communicationUser',
      communicationUserId: '--------',
      userId: 1,
      avatar: '--------',
      fullName: 'My name',
    },
    isMine: true,
    files: [],
    metadata: {
      clientId: '3',
    },
  },
  {
    id: '4',
    type: 'text',
    sequenceId: '621',
    version: '1648811678522',
    senderDisplayName: 'My name',
    createdOn: '2022-04-01T11:14:38.000Z',
    isResponseReceived: false,
    content: {
      message: 'dafg',
    },
    sender: {
      kind: 'communicationUser',
      communicationUserId: '--------',
      userId: 1,
      avatar: '--------',
      fullName: 'My name',
    },
    isMine: true,
    files: [],
    metadata: {
      clientId: '4',
    },
  },
  {
    id: '5',
    type: 'text',
    sequenceId: '620',
    version: '1648811678014',
    senderDisplayName: 'My name',
    createdOn: '2022-04-01T11:14:38.000Z',
    isResponseReceived: false,
    content: {
      message: 'gadfgadfg',
    },
    sender: {
      kind: 'communicationUser',
      communicationUserId: '--------',
      userId: 1,
      avatar: '----',
      fullName: 'My name',
    },
    isMine: true,
    files: [],
    metadata: {
      clientId: '5',
    },
  },
];

describe('updateOptimisticIDsForSorting()', () => {
  it('should update optimistically created IDs after receiving response from event', () => {
    const cacheLikeData = {
      pages: [
        {
          data: {
            messages: getMessages(),
          },
        },
      ],
    };
    const updatedMessages = updateOptimisticIDsForSorting(
      cacheLikeData,
      String(3),
      String(10)
    );

    // There are two messages with higher clientId, ID should increment like: clientId - eventClientId + realEventId
    expect(
      updatedMessages.pages[0].data.messages.find(
        (message) => message.metadata.clientId === '4'
      ).id
    ).toBe('11');
    expect(
      updatedMessages.pages[0].data.messages.find(
        (message) => message.metadata.clientId === '5'
      ).id
    ).toBe('12');
  });
});
