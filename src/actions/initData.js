export const initData = {
  kanbaflexboards: [
    {
      id: "kanbaflexboard-1",
      boardOrder: ["board-1", "board-2", "board-3"],
      boards: [
        {
          id: "board-1",
          kanbaflexboardId: "kanbaflexboard-1",
          title: "Noch offen",
          cardOrder: [
            "card-1",
          ],
          cards: [
            {
              id: "card-1",
              kanbaflexboardId: "kanbaflexboard-1",
              boardId: "board-1",
              title: "Kickoff-Meeting",
              image:
                "https://images.unsplash.com/photo-1586892478025-2b5472316f22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnJhaW5zdG9ybXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            },
          ],
        },
        {
          id: "board-2",
          kanbaflexboardId: "kanbaflexboard-1",
          title: "In Bearbeitung",
          cardOrder: ["card-8"],
          cards: [
            {
              id: "card-8",
              kanbaflexboardId: "kanbaflexboard-1",
              boardId: "board-2",
              title: "Projektplanung",
              image: null,
            },
          ],
        },
        {
          id: "board-3",
          kanbaflexboardId: "kanbaflexboard-1",
          title: "Abgeschlossen",
          cardOrder: [],
          cards: [
          ],
        },
      ],
    },
  ],
};
