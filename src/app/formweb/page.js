'use client'
import React from 'react'
import { useListState } from '@/list/useListState'
export default function page() {
    const {lists,addlist,deletelist} = useListState()

   return (
    <div>
      <button onClick={() => addlist({ id: Date.now(), title: "Test Task" })}>
        Add Task
      </button>

      <ul>
        {lists.map((t) => (
          <li key={t.id}>
            {t.title}
            <button onClick={() => deletelist(t.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

