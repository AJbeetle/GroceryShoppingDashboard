import type { cardItems } from "../../types/interfaces/items"
import type { apiItems } from "../../types/interfaces/items"


function ItemCard({item} : {
    item : cardItems
}){
    return (
        <div className="bg-red-300 m-2 p-2">
            {
                item.name
            }
            &nbsp;&nbsp;&nbsp;
            {
                item.available
            }
            &nbsp;&nbsp;&nbsp;
            {
                item.img ? `${item.img}` : null
            }
            &nbsp;&nbsp;&nbsp;
            {
            }
            &nbsp;&nbsp;&nbsp;
        </div>
    )
}

export default ItemCard