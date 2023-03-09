export type Cat = {
    name: string;
    id: number;
    is_private?: boolean
};

export type MixedType = {
    text: string;
    type: 1 | 2
}

export type Detail = {
    type: 1 | 2 | 3 | 4 | 33;
    details: string | string[][] | MixedType[];
}

export type PostDetails = {
    name: string;
    details: Detail[]
};

export type Post = {
    name: string;
    cat_id: string;
    is_private?: boolean
};

export type AllData = {
    Cats: Cat[],
    Content: PostDetails[],
    Posts: Post[]
}