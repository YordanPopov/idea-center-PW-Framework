interface validData {
    title: string;
    url: string;
    description: string;
}

interface invalidIdeaData {
    name: string;
    title?: string;
    imgUrl?: string;
    description?: string;
    expect: {
        globalError?: boolean;
        titleError?: boolean;
        descriptionError: boolean;
    };
}

const title = 'AI-Powered Code Review Assistant';
const url =
    'https://img.freepik.com/free-photo/programming-background-collage_23-2149901780.jpg';
const description = 'Automated code review tool';

export const validIdeaData: validData = {
    title: title,
    url: url,
    description: description,
};

export const invalidIdeas: invalidIdeaData[] = [
    {
        name: 'Empty form',
        title: undefined,
        imgUrl: undefined,
        description: undefined,
        expect: {
            globalError: true,
            titleError: true,
            descriptionError: true,
        },
    },
    {
        name: 'Missing Title',
        title: '',
        imgUrl: url,
        description: description,
        expect: {
            globalError: true,
            titleError: true,
            descriptionError: false,
        },
    },
    {
        name: 'Missing Description',
        title: title,
        imgUrl: url,
        description: '',
        expect: {
            globalError: true,
            titleError: false,
            descriptionError: true,
        },
    },
];
