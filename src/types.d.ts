export interface categoryType {
    type: string;
    name: string;
}

export interface categoryAction {
    amount: number;
    category: string;
    createdAt: string;
}

export interface categoryActionApi extends categoryAction {
    id: string;
}

export interface categoryTypeAdd extends categoryType{
    amount: string;
}

export interface categoryTypeApi extends categoryType{
    id: string;
}