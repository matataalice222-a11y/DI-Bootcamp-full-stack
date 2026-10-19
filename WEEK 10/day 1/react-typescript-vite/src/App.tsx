import { useState, type FormEvent, type ReactNode } from 'react'
import './App.css'

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
    <ul className="book-list">
      {items.map((item) => (
        <li className="book-card" key={keyExtractor(item)}>
          {renderItem(item)}
        </li>
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
    <main className="app-shell">
      <header className="page-header">
        <p className="eyebrow">A little shelf for big ideas</p>
        <h1>Book nook</h1>
        <p className="intro">
          Keep track of the stories you love and the ones you can’t wait to read.
        </p>
      </header>

      <section className="add-panel" aria-labelledby="add-book-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Your next favorite</p>
            <h2 id="add-book-heading">Add a book</h2>
          </div>
          <span className="decorative-mark" aria-hidden="true">
            +
          </span>
        </div>

        <form className="book-form" onSubmit={addBook}>
          <label>
            Book title
            <input
              autoComplete="off"
              name="title"
              onChange={(event) => {
                setTitle(event.target.value)
                setFormError('')
              }}
              placeholder="e.g. The Midnight Library"
              required
              value={title}
            />
          </label>
          <label>
            Author
            <input
              autoComplete="off"
              name="author"
              onChange={(event) => {
                setAuthor(event.target.value)
                setFormError('')
              }}
              placeholder="e.g. Matt Haig"
              required
              value={author}
            />
          </label>
          <button type="submit">Add to my shelf <span aria-hidden="true">↗</span></button>
          {formError && (
            <p className="form-error" role="alert">
              {formError}
            </p>
          )}
        </form>
      </section>

      <section className="shelf" aria-labelledby="shelf-heading">
        <div className="shelf-heading">
          <div>
            <p className="eyebrow">The collection</p>
            <h2 id="shelf-heading">On your shelf</h2>
          </div>
          <span className="book-count" aria-label={`${books.length} books`}>
            {books.length} {books.length === 1 ? 'book' : 'books'}
          </span>
        </div>

        <List
          items={books}
          keyExtractor={(book) => book.id}
          renderItem={(book) => (
            <article className="book-details">
              <span className="book-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48" fill="none">
                  <path d="M10 8.5A4.5 4.5 0 0 1 14.5 4H39v35H14.5A4.5 4.5 0 0 0 10 43.5v-35Z" />
                  <path d="M10 8.5v35M17 12h15M17 18h12" />
                  <path d="M14.5 39H39" />
                </svg>
              </span>
              <div className="book-copy">
                <h3>{book.title}</h3>
                <p>by {book.author}</p>
              </div>
              <span className="book-arrow" aria-hidden="true">↗</span>
            </article>
          )}
        />
      </section>

      <footer className="page-footer">
        Made for readers, one page at a time.
      </footer>
    </main>
  )
}

export default BookApp
