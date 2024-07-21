export declare enum packageStatus {
    pending = "pending",
    shipped = "shipped",
    delivered = "delivered",
    returned = "returned",
    cancelled = "cancelled"
}
export declare enum roleType {
    customer = "customer",
    curior = "currior",
    owner = "owner"
}
export type JwtPayload = {
    sub: string;
    email: string;
};
