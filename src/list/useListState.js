import { create } from "zustand";

export const useListState =create((set)=>({
     lists: [],

    setlist: (newList) => set({ lists:newList}),

    addlist: (list)=> set((state)=>({
    lists: [...state.lists,list]
    })),
    updatelist: (id,updatelist)=> 
        set((state)=>({
        lists: state.lists.map((l)=>{
            l._id === id ? {...l,updatelist} : l
        })
    })),
    deletelist: (id)=>
        set((state)=>({
        lists: state.lists.filter((l)=> l._id !== id)
    })),
   
}))