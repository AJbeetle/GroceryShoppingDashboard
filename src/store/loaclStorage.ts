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

//I am assuming whatever Items are offered free, are not part of main inventory a different stock is maintained for them, 
// so whenevr an item is added or removed from Free its quantity will not be reduced/increased from inventory
const Free:CartObjType= {
    "count" : 0,
    "items" : {
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
    Like, Cart, Offers, Inventory, Free
}