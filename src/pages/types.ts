export type Cat = {
    name: string;
    id: string;
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

export interface Post {
    name: string;
    cat_id: string;
    is_private: boolean;
    id: number;
};

export interface MawlanaShazili extends Post { }
export interface MawlanaZaki extends Post { }
export interface Other extends Post { }

// export type AllData = {
//     Cats: Cat[],
//     Content: PostDetails[],
//     Posts: Post[]
// }

export const Cats: Cat[] = [
    {
        name: "الامام ابي الحسن الشاذلي",
        id: "MawlanaShazili",
        is_private: false
    },
    {
        name: "الامام محمة زكي ابراهيم",
        id: "MawlanaZaki",
        is_private: false
    },
    {
        name: "الاوراد الشاذلية الماثورة",
        id: "Other",
        is_private: false
    }
];

export const MawlanaShaziliPosts: MawlanaShazili[] = [
    {
        name: "حزب البــَر",
        id: 1,
        cat_id: "MawlanaShazili",
        is_private: false
    },
    {
        name: "حزب النصر",
        id: 2,
        cat_id: "MawlanaShazili",
        is_private: false
    },
    {
        name: "حزب الأمان",
        id: 3,
        cat_id: "MawlanaShazili",
        is_private: false
    },
    {
        name: "حزب البحر",
        id: 4,
        cat_id: "MawlanaShazili",
        is_private: false
    }
];

export const MawlanaZakiPosts: MawlanaZaki[] = [
    {
        name: "الأربعين المحمدية",
        id: 1,
        cat_id: "MawlanaZaki",
        is_private: false
    },
    {
        name: "الابتهال الكبير",
        id: 2,
        cat_id: "MawlanaZaki",
        is_private: false
    },
    {
        name: "الاستغاثة الجامعة",
        id: 3,
        cat_id: "MawlanaZaki",
        is_private: false
    },
    {
        name: "الحزب الدسوقي الممزوج",
        id: 4,
        cat_id: "MawlanaZaki",
        is_private: false
    },
    {
        name: "الصلاة المحيطة",
        id: 5,
        cat_id: "MawlanaZaki",
        is_private: false
    },
    {
        name: "ختم الاسترحام",
        id: 6,
        cat_id: "MawlanaZaki",
        is_private: false
    },
    {
        name: "دعاء الصمدية",
        id: 7,
        cat_id: "MawlanaZaki",
        is_private: false
    },
    {
        name: "دعاء عند باب اللَّه",
        id: 8,
        cat_id: "MawlanaZaki",
        is_private: false
    },
    {
        name: "سفينة النجا لمن إلى اللَّه التجأ",
        id: 9,
        cat_id: "MawlanaZaki",
        is_private: false
    },
    {
        name: "مناجاة المضطرين",
        id: 10,
        cat_id: "MawlanaZaki",
        is_private: false
    },
    {
        name: "نهج الوظيفة",
        id: 11,
        cat_id: "MawlanaZaki",
        is_private: false
    },
    {
        name: "ورد الآيات المختارة",
        id: 12,
        cat_id: "MawlanaZaki",
        is_private: false
    },
    {
        name: "ورد التسبيح الأكبر",
        id: 13,
        cat_id: "MawlanaZaki",
        is_private: false
    },
    {
        name: "ورد التشريف بدعوة ( يا لطيف )",
        id: 14,
        cat_id: "MawlanaZaki",
        is_private: false
    },
    {
        name: "ورد الحسبلة",
        id: 15,
        cat_id: "MawlanaZaki",
        is_private: false
    },
    {
        name: "ورد الملإ الأعلى",
        id: 16,
        cat_id: "MawlanaZaki",
        is_private: false
    }
];

export const OtherPosts: Other[] = [
    {
        name: "أسماء  اللَّه  الحسنى  المأثورة",
        id: 1,
        cat_id: "Other",
        is_private: false
    },
    {
        name: "أسماء  اللَّه  الحسنى  المشهورة",
        id: 2,
        cat_id: "Other",
        is_private: false
    },
    {
        name: "الصلاة الممزوجة",
        id: 3,
        cat_id: "Other",
        is_private: false
    },
    {
        name: "المسبعات العشر للإمام الخضر عليه السلام",
        id: 4,
        cat_id: "Other",
        is_private: false
    },
    {
        name: "الياقوتة",
        id: 5,
        cat_id: "Other",
        is_private: false
    },
    {
        name: "توسل الإمام ابن ناصر الدرعي الشاذلي",
        id: 6,
        cat_id: "Other",
        is_private: false
    },
    {
        name: "خواتيم الأسماء الحسنى",
        id: 7,
        cat_id: "Other",
        is_private: false
    },
    {
        name: "خواتيم المسبعات لسيدي إبراهيم الخليل",
        id: 8,
        cat_id: "Other",
        is_private: false
    },
    {
        name: "صلوات سيدي عبد السلام بن بشيش",
        id: 9,
        cat_id: "Other",
        is_private: false
    },
    {
        name: "من الصلوات المباركات على أسعد المخلوقات (ص)",
        id: 10,
        cat_id: "Other",
        is_private: false
    }
];

export const All: Post[] = [...MawlanaShaziliPosts, ...MawlanaZakiPosts, ...OtherPosts];