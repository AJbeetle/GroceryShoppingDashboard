const Like:Record<string,number|Record<string, boolean>> = {
    "count" : 2,
    "items" : {
        "Coca-Cola" : true,
        "Bananas" : true
    }
}

const Cart = {
    "count" : 0,
    "items" : {

    }
}

const Inventory:Record<string, number> = {

}


const Offers = {
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