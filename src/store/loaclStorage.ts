export type LikeObjType = {
    count : number,
    items : Record<string, boolean>
}

export type CartObjType = {
    count : number,
    items : Record<string, number>
}

export type InvObjType = Record<string, number>

export type OffersType = Record<string, Record<string, number | Record<string, number|string> >>

// const Like:Record<string,number|Record<string, boolean>> = {
const Like:LikeObjType = {
    "count" : 2,
    "items" : {
        "Coca-Cola" : true,
        "Bananas" : true
    }
}

// const Cart:Record<string,number|Record<string, number>>= {
const Cart:CartObjType= {
    "count" : 4,
    "items" : {
        "Coca-Cola" : 1,
        "Bananas" : 1,
        "Croissants" : 2,
    }
}

// const Inventory:Record<string, number> = {
const Inventory:InvObjType = {

}


const Offers:OffersType = {
    "Coca-Cola" : {
        itemCount : 6,
        itemOffered : {
            name : "Coca-Cola",
            quantity : 1
        }
    },
    "Croissants" : {
        itemCount : 3,
        itemOffered : {
            name : "Coffee",
            quantity : 1
        } 
    }
}


export {
    Like, Cart, Offers, Inventory
}