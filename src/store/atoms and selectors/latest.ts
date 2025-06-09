import {atom, selector} from "recoil"
import axios from "axios"

export const InvObject = atom({
    key : "InventoryObjectFromBackend",
    default : selector({
        key : "selectInventoryItrms",
        get : async function({}){
            const res = await axios.get(import.meta.env.VITE_BACKEND_INVENTORY_URL);
            return res.data.Inventory
        }
    })
})


