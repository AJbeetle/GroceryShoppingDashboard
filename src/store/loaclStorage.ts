// import axios from "axios"

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
/* const Like:LikeObjType = {
    "count" : 2,
    "items" : {
        "Coca-Cola" : true,
        "Bananas" : true
    }
} */
const Like:LikeObjType = {
    "count" : 0,
    "items" : {
    }
}

// const Cart:Record<string,number|Record<string, number>>= {
/* const Cart:CartObjType= {
    "count" : 5,
    "items" : {
        "Coca-Cola" : 1,
        "Bananas" : 1,
        "Croissants" : 2,
        "Bread" : 1
    }
} */
const Cart:CartObjType= {
    "count" : 0,
    "items" : {
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
    "Bananas":36,
    "Crispy Pink Lady Apples":16,
    "Sweetest® Mango":5,
    "Seedless Grapes":5,
    "Juicy Figs":25,
    "Pomegranate":10,
    "Bread":2,
    "Croissants":9,
    "Coffee":10,
    "Coca-Cola":10
}


// let Inventory:InvObjType = {
// }
// const BASE_URL:string = import.meta.env.VITE_BACKEND_BASE_URL;

// axios.get(`${BASE_URL}/?category=all`).then((res)=>{
//     res.data.forEach((e:any)=>{
//         Inventory[e.name] = e.available;
//     })

//     console.log(Inventory);
// }).catch(e=>{
//     console.log("error : "+e.message)
// })

// function getInventory(){
//     let inventory = {}
//     axios.get(import.meta.env.BACKEND_INVENTORY).then((res)=>{
//         inventory = res.data.inventory;
//     }).catch(e => {
//         console.log("error : "+e);
//     })
//     return inventory
// }

// let Inventory:InvObjType = getInventory()
// console.log(Inventory);


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