import {atom} from "recoil"
// const freeElementsAtom = atom({
//     key : "allFreeItemsATOM_createdForSelector",
//     default : (()=>{
//         try{
//             const free = localStorage.getItem("Free");
//             if(!free) return {}; // fallback if no cart in storage, then cartElementAtom will have atomatically be empty object {}
//             const freeObj = JSON.parse(free);
//             return freeObj.items ?? {}; //fallback if cartObj does not have items key 
//         }
//         catch(e){
//             console.error("Error parsing Cart from localStorage:", e);
//         }
//     })()
// })

const freeElementsAtom = atom({
  key: "allFreeItemsATOM_createdForSelector",
  default: (() => {
    try {
      const free = localStorage.getItem("Free");
      if (!free) return {};
      const freeObj = JSON.parse(free);
      return freeObj.items ?? {};
    } catch (e) {
      console.error("Error parsing Free from localStorage:", e);
      return {};
    }
  })(),
  effects_UNSTABLE: [
    ({ setSelf, onSet }) => {
      // Sync from localStorage initially
      const json = localStorage.getItem("Free");
      if (json != null) {
        try {
          const parsed = JSON.parse(json);
          setSelf(parsed.items ?? {});
        } catch (e) {
          console.error("Failed to parse localStorage Free:", e);
        }
      }

      // Update localStorage on atom change
      onSet((newValue) => {
        try {
          const existing = JSON.parse(localStorage.getItem("Free") || "{}");
          const updated = {
            ...existing,
            items: newValue,
          };
          localStorage.setItem("Free", JSON.stringify(updated));
        } catch (e) {
          console.error("Error updating localStorage Free:", e);
        }
      });
    },
  ],
});


export default freeElementsAtom;