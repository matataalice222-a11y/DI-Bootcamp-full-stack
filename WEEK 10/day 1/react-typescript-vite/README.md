# Book Nook

A small book-list app built with React and TypeScript. It demonstrates a generic
`List<T>` component that can render different kinds of data using a caller
provided `renderItem` function.

## Features

- Starts with a few sample books.
- Add books with a title and author.
- Uses a typed `Book` model and stable unique IDs.
- Shows a live count of books on the shelf.
- Responsive layout with labeled form fields and accessible feedback.

## Run locally

```sh
npm install
npm run dev
```

Run the production build and lint checks with:

```sh
npm run build
npm run lint
```
