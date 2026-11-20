import { useState } from 'react'
import type { Course } from '../../server/types.ts'
import { Button } from '../common/Button.tsx'
import { Input } from '../common/Input.tsx'

/** As in 2021: a course matches when its title or its id contains the text, in any case. */
export function matchesSearch(course: Course, search: string) {
  const text = search.trim().toUpperCase()
  return (
    !text || course.title.toUpperCase().includes(text) || course.id.toUpperCase().includes(text)
  )
}

type SearchBarProps = { onSearch: (search: string) => void; className?: string }

/** Searches on the Search button (or Enter); clearing the field shows every course again. */
export function SearchBar({ onSearch, className = '' }: SearchBarProps) {
  const [value, setValue] = useState('')

  return (
    <search className={className}>
      <form
        className="flex gap-2"
        onSubmit={(event) => {
          event.preventDefault()
          onSearch(value)
        }}
      >
        <Input
          label="Search"
          type="search"
          placeholder="Enter course name or id..."
          value={value}
          onChange={(event) => {
            setValue(event.target.value)
            if (!event.target.value) onSearch('')
          }}
          className="flex-1"
        />
        <Button type="submit">Search</Button>
      </form>
    </search>
  )
}
