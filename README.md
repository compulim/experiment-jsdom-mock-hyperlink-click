# experiment-jsdom-mock-hyperlink-click

When we click an `<a>` link in JSDOM, it will throw an exception and JSDOM does not offer any capability for us to intercept the `navigateFetch` function.

In this experiment, we are finding ways to mock clicking on a `<a>` link and assert if the link has been clicked or not.

This is a very limited experiment and works with any `<a>`. For a production test, we should explore a better option.
