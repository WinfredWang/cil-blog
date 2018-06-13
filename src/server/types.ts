
export enum ResCode {
    Success,
    Error
}

export class ResponseBody {
    constructor(public code: ResCode, public msg?: string, public value?: any) {
        this.code = code;
        this.msg = msg;
        this.value = value;
    }
}

export interface Article {
    _id?: string;
    title: string;
    digest?: string;
    content: string;
    author: string;
    readTime?: number;
    postTime?: number;
    lastModifyTime: number;
    status: number;
    comments: Comment[]
}

export interface Comment {
    _id?: string;
    articleId?: string;
    nickName: string;
    email: string;
    content: string;
    postTime?: number;
}

export interface IPageQuery {
    limit?: number;
    tag?: string
    index?: number;
    value?: any[],
    count?: number;
}