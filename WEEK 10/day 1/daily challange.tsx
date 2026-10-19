import { useState, type FormEvent, type ReactNode } from 'react'

type Book = {
  id: string
  title: string
  author: string
}

type ListProps<T> = {
  items: T[]
  keyExtractor: (item: T) => string
  renderItem: (item: T) => ReactNode
}

function List<T>({ items, keyExtractor, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item) => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  )
}

const initialBooks: Book[] = [
  { id: 'book-1', title: 'Pride and Prejudice', author: 'Jane Austen' },
  { id: 'book-2', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: 'book-3', title: '1984', author: 'George Orwell' },
]

function BookApp() {
  const [books, setBooks] = useState<Book[]>(initialBooks)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [formError, setFormError] = useState('')

  function addBook(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedTitle = title.trim()
    const trimmedAuthor = author.trim()
    if (!trimmedTitle || !trimmedAuthor) {
      setFormError('Enter both a book title and an author.')
      return
    }

    const newBook: Book = {
      id: crypto.randomUUID(),
      title: trimmedTitle,
      author: trimmedAuthor,
    }

    setBooks((currentBooks) => [...currentBooks, newBook])
    setTitle('')
    setAuthor('')
    setFormError('')
  }

  return (
    <main>
      <h1>My Book List</h1>

      <form onSubmit={addBook}>
        <label>
          Title
          <input
            onChange={(event) => {
              setTitle(event.target.value)
              setFormError('')
            }}
            required
            value={title}
          />
        </label>
        <label>
          Author
          <input
            onChange={(event) => {
              setAuthor(event.target.value)
              setFormError('')
            }}
            required
            value={author}
          />
        </label>
        <button type="submit">Add book</button>
        {formError && <p role="alert">{formError}</p>}
      </form>

      <List
        items={books}
        keyExtractor={(book) => book.id}
        renderItem={(book) => (
          <>
            <strong>{book.title}</strong> by {book.author}
          </>
        )}
      />
    </main>
  )
}

export default BookApp
