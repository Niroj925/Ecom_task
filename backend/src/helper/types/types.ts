
export enum packageStatus{
    pending="pending",
    shipped="shipped",
    delivered="delivered",
    returned="returned",
    cancelled="cancelled",
}

export enum roleType{
 customer="customer",
 curior="currior",
 owner="owner"
}

export type JwtPayload = {
    sub: string;
    // role: string;
    email:string
};


