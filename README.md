# Husleie Challenge

## Table of contents
* [Tech Stack](#tech-stack)
* [Architecture](#architecture)
* [Improvements](#improvements)
* [Project Setup](#project-setup)

<br/>

### Additional Features Checklist

- [x] Ability to select currency quote to calculate new pairings.
### Requirements Checklist

- [x] Create a small app that shows a list of the most popular crypto currencies, with key data.
- [x] Clicking a currency should take the user to a page with more detail about the currency, and some historic data.
- [x] It should be possible to link directly to a specific currency.
- [x] Possible API providers for fetching this data: https://sandbox.coinmarketcap.com/, https://min-api.cryptocompare.com/data, … but any other crypto API is fine as well. 
- [x] Track your development process via git commits.
- [x] Use VueJS 2, Typescript, Vue Router and Vuex … or Use VueJS 3, Typescript and Vue Router.
- [x] Mobile friendly.

<br/>

# Tech Stack
- I have decided to use **Vue.js 3** with the **Composition API** because it allows to create global states and reuse component logic. 
- To have a consistent style guide, I have installed **eslint** and **prettier** to follow Vue style guide rules.
- For the chart component, I have used [vue-chart-3](https://github.com/victorgarciaesgi/vue-chart-3) because it is a charts.js v3 wrapper written in Typescript and using Composition API for Vue 3. This way it is faster to create charts and modify charts. However, I have found that it is not doing tree-shaking so I had to lazy-import the component that was using this library because the bundle size was pretty big.
- For styling, I have used **SASS (SCSS)** preprocessor and **BEM** methodology for naming classes as I believe it allows to have styles that are scalable and maintainable.
- I have chosen [Cryptocompare API][https://min-api.cryptocompare.com/data] because the endopoins I needed were free to use without an API key or subscription.

<br/>

# Architecture
- This app follows a **reactive pattern** by using the **Composition API** to share and manage top currencies list and currency quote selected states. I have also used it to reuse currency details component logic. 
- I have divided styles by globals and mixins. Component-specific styles are declared in the corresponding Vue component. 
- Components are named by prefixing the view where they belong if they are unique to that view, by 'The' if they are unique or by 'Base' if they can be used anywhere. I like this system because it allows to keep a clean and flat structure. If the application were larger, I would have may followed Atomic Design.
- I have used semantic HTML and aria attributes to have a better accessibility.

<br/>

# Improvements
- Add date selector for choosing date range for the historical data. 
- Use web sockets to get real time data.
- Add dark mode.
- Add unit testins with **Jest**.
- Add e2e tests with **Cypress**.
- Make accessibility checks by following **WCAG**. 
- Add **microanimations** to improve user experience overall.

<br/>


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
