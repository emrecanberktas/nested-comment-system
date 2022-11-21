export const getComments = async () => {
  return [
    {
      id: "1",
      body: "First comment",
      username: "Emre",
      userId: "1",
      parentId: null,
      createdAt: "2022-11-21T11:33:19.915Z",
    },
    {
      id: "2",
      body: "Second comment",
      username: "Can",
      userId: "2",
      parentId: null,
      createdAt: "2022-11-21T11:33:44.486Z",
    },
    {
      id: "3",
      body: "First comment first child",
      username: "Can",
      userId: "2",
      parentId: "1",
      createdAt: "2022-11-21T11:33:45.577Z",
    },
    {
      id: "4",
      body: "Second comment second child",
      username: "Can",
      userId: "2",
      parentId: "2",
      createdAt: "2022-11-21T11:33:46.537Z",
    },
  ];
};

export const createComment = async (text, parentId = null) => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    body: text,
    parentId,
    userId: "1",
    username: "Emre",
    createdAt: new Date().toISOString(),
  };
};

export const updateComment = async (text) => {
  return { text };
};

export const deleteComment = async () => {
  return {};
};
