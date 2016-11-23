export class NewProduct {
    public id: number;
    public productName: string;
    public pricePerDay: number;
    public ownerId: number;
    public categoryId: number;
    public imageLink?: string;
    public userId: string;
    public lat: number;
    public lng: number;
    public city?: string;
    public state?: string;
    public zip?: number;
}
