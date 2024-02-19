export const items = [
    {
        id: `id=${1}`,
        content: "Don't you always call sweatpants give up on life pants Jake"
    },
    {
        id: `id=${2}`,
        content: "That's it! The answer was so simple, I was too smart to see it!",
    },
    {
        id: `id=${3}`,
        content: "Responsibility demands sacrifice"
    },
    {
        id: `id=${4}`,
        content: "Sucking at something is the first step towards being sorta good at something."
    },
    {
        id: `id=${5}`,
        content: "People make mistakes It's all a part of growing up and you never really stop growing."
    }
]

export const tree = {
    rootId: "root",
    items: {
        root: {
            id: "root",
            text: "Item ROOT",
            children: ["0", "1", "2"]
        },
        "0": {
            id: "0",
            text: "Item A",
            children: ["0.0"]
        },
        "1": {
            id: "1",
            text: "Item B",
            children: []
        },
        "2": {
            id: "2",
            text: "Item C",
            children: []
        },
        "0.0": {
            id: "0.0",
            text: "Item 1.1",
            children: []
        }
    }
};



export const treeData = {
    rootId: "board",
    items: {
        board: {
            id: "board",
            isExpanded: true,
            children: [
                "sample_1",
                "sample_2",
                "group_sample_3_4",
                "sample_5",
                "sample_6",
                "sample_7",
                "sample_8",
                "sample_9"
            ],
            data: {
                title: "Dashboard"
            }
        },
        sample_1: {
            id: "sample_1",
            isExpanded: false,
            children: [],
            data: {
                title: "Sample 1"
            }
        },
        sample_2: {
            id: "sample_2",
            isExpanded: false,
            children: [],
            data: {
                title: "Sample 2"
            }
        },
        group_sample_3_4: {
            id: "group_sample_3_4",
            isExpanded: true,
            children: ["sample_3", "sample_4"],
            data: {
                title: "The Best Bundle"
            }
        },
        sample_3: {
            id: "sample_3",
            isExpanded: false,
            children: [],
            data: {
                title: "Sample 3"
            }
        },
        sample_4: {
            id: "sample_4",
            isExpanded: false,
            children: [],
            data: {
                title: "Sample 4"
            }
        },
        sample_5: {
            id: "sample_5",
            isExpanded: false,
            children: [],
            data: {
                title: "Sample 5"
            }
        },
        sample_6: {
            id: "sample_6",
            isExpanded: false,
            children: [],
            data: {
                title: "Sample 6"
            }
        },
        sample_7: {
            id: "sample_7",
            isExpanded: false,
            children: [],
            data: {
                title: "Sample 7"
            }
        },
        sample_8: {
            id: "sample_8",
            isExpanded: false,
            children: [],
            data: {
                title: "Sample 8"
            }
        },
        sample_9: {
            id: "sample_9",
            isExpanded: false,
            children: [],
            data: {
                title: "Sample 9"
            }
        }
    }
};