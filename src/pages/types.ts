export type Cat = {
    name: string;
    id: number;
};

export type MixedType = {
    text: string; 
    type: 1 | 2 
}

export type Detail = {
    type: 1 | 2 | 3 | 4 | 33;
    details: string | string[][] | MixedType[];
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