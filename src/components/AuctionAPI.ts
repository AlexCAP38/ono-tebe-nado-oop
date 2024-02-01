import { Api, ApiListResponse } from './base/api';
import { IOrder, IOrderResult, ILot, LotUpdate, IBid } from "../types";

export interface IAuctionAPI {
    getLotList: () => Promise<ILot[]>;
    getLotItem: (id: string) => Promise<ILot>;
    getLotUpdate: (id: string) => Promise<LotUpdate>;
    placeBid(id: string, bid: IBid): Promise<LotUpdate>;
    orderLots: (order: IOrder) => Promise<IOrderResult>;
}

export class AuctionAPI extends Api implements IAuctionAPI {
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getLotItem(id: string): Promise<ILot> {
        return this.get(`/lot/${id}`).then(
            (item: ILot) => (
                {
                    ...item,
                    image: this.cdn + item.image,
                }
            )
        );
    }

    getLotUpdate(id: string): Promise<LotUpdate> {
        return this.get(`/lot/${id}/_auction`).then(
            (data: LotUpdate) => data
        );
    }


    //гет запрос, возвращает промис Тип которого массиво ILOT

    getLotList(): Promise<ILot[]> {

        //тут надо поставить product
        return this.get('/lot')
        
        //присваивается тип, какая структура вернется
        .then((data: ApiListResponse<ILot>) => {

        // console.log(data)
            //методом перебираем каждый элемент и создаем новый доъбект
            //изменяя в текущем элементе строчку имадже добавляя туда урл 
            return data.items.map((item) => ({...item, image: this.cdn + item.image}))
        }
            );

    }

    placeBid(id: string, bid: IBid): Promise<LotUpdate> {
        return this.post(`/lot/${id}/_bid`, bid).then(
            (data: ILot) => data
        );
    }

    orderLots(order: IOrder): Promise<IOrderResult> {
        return this.post('/order', order).then(
            (data: IOrderResult) => data
        );
    }

}