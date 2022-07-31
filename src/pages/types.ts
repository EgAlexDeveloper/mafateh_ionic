export type Cat = {
    name: string;
    id: number;
};

export type Detail = {
    type: 1 | 2 | 3;
    details: string | string[][];
}

export type PostType = {
    name: string;
    details: Detail[]
};

export type SubCat = {
    name: string;
    cat_id: string;
};

export type AllData = {
    Cats: Cat[],
    Content: PostType[],
    Posts: SubCat[]
}