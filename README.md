# TVmaze React Gallery

## Description

This is a React-based TV show gallery that uses the TVmaze API. Users can search for TV shows, view information about them, and click on a show to see more details.

## Features

- Displays 10 featured TV shows.
- Search for TV shows by name.
- Shows posters, summaries, ratings, genres, and cast information.
- Separate detail page for each show.
- Displays loading and error messages.
- Responsive design for different screen sizes.

## Technologies Used

React (Vite), JavaScript, CSS, React Router, TVmaze API.

## How to Run

1. Open the project folder in VS Code.
2. Run `npm install` in the terminal.
3. Run `npm run dev`.
4. Open the local URL displayed in the terminal.

## React Concepts

| # | Concept | File |
|---|---|---|
| 1 | Functional Components | `App.jsx`, `ShowCard.jsx`, `ShowList.jsx` |
| 2 | JSX | `App.jsx`, `ShowDetail.jsx` |
| 3 | Props | `SearchForm.jsx`, `ShowList.jsx`, `ShowCard.jsx` |
| 4 | useState | `App.jsx`, `ShowCard.jsx`, `ShowDetail.jsx` |
| 5 | useEffect | `App.jsx`, `ShowCard.jsx`, `ShowDetail.jsx` |
| 6 | Lists and Keys | `ShowList.jsx`, `ShowDetail.jsx` |
| 7 | Forms and Events | `SearchForm.jsx` |
| 8 | React Router | `App.jsx`, `ShowCard.jsx`, `ShowDetail.jsx` |

## Reflection

In this project, I learned how to use React to build a TV show gallery using the TVmaze API. Compared to vanilla JavaScript, React made it easier to organize my code because I could divide the website into separate components. I created components for the search form, show cards, show list, and detail page. This made the project easier to manage.

The most difficult part was understanding how useState and useEffect work. In vanilla JavaScript, I was used to updating the HTML directly, but in React, the page updates when the state changes. I also had trouble with React Router because my website showed a blank screen when I first added the links. After fixing the Router setup, the navigation started working correctly.

Most of the main state is in App.jsx because it manages the search, results, loading, and errors. ShowCard.jsx and ShowDetail.jsx have their own state for loading additional show information. Overall, this project helped me understand React components, hooks, and how to build a website using an API.

## API Credit

TV show information is provided by [TVmaze](https://www.tvmaze.com/api).