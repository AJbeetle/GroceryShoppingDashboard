// export interface apiItems {
//     id : number,            +
//     type : string,          =
//     name : string,          =
//     description : string,   =
//     rating : number,        +
//     img : URL,              =
//     price : string,         =
//     available : number      =
// }

export interface cardItems {
    type:string,
    name:string,
    description:string,
    available:number,
    img : URL,
    price: string
}

export interface apiItems extends cardItems {
    id :number,
    rating : number,
}