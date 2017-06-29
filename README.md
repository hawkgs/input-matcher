# input-matcher

_Input matcher_ is a mechanism for evaluating the similarity between user inputs like mouse clicks, key presses, dragging. It first captures the input, then performs matching. The output - a rate of how similar are the inputs.

### How To?

```bash
# Install npm dependencies
npm install

# Run the React app
npm start

# Run the tests
npm test

# Generate a documentation (in docs/) with typedoc
npm run docs
```

### Code Structure

We will look into **src** folder:

- **ui/** - is a small React app tasked to show the capabilities of the input matcher
- **core/** - represents the capturing/matching logic
  - **matcher/** - contains matcher logic
    - **AbstractInputMatcher.ts** - contains `AbstractInputMatcher` which describes matcher's properties and behavior
    - **InputMatcher.ts** - contains `InputMatcher`; it's a concrete implementation of the above
    - **Matcher.ts** - sort of a factory (`getMatcher`) that provides an instance of `AbstractInputMatcher` accross the app
  - **tests/** - no need of explanation
  - **utils/**
    - **Parser.ts** - has the logic of the parser and stringifier of input (`parseSet` and `stringifySet`); the string format is suitable for transportation FE-BE
  - **index.ts** - Simple facade (a.k.a. barrel) of the core
  - **InputCatcher.ts** - contains `InputCatcher`; the logic behind capturing of the input from the DOM
  - **InputTypes.ts** - contains all standardized types for clicks, movements, the set, etc.

### How It Works

The scheme describes the idea behind the input matcher. Note that the React app is there just for the demo. The core is framework-agnostic.

![scheme](./misc/scheme.png)

The `InputMatcher` and `InputCatcher` doesn't know about the existance of each other. They are completely decoupled. The `InputCatcher` provides DOM events to the UI with which it can listen for the input. The generated `InputSet` is then passed to the `InputMatcher` which performs the evaluation. **In the scheme, we assume that the `InputMatcher` has already accepted a training set(s).**

### The Matcher

Currently, the most important part of the project is still not implemented. Anyway, the idea is to:

- Use pattern matching algorithm for each `MouseMove`
- Determine if the clicks are within a specific radius for each `MouseClick`
- Perform fuzzy string searching for each `KeyPress` sequence

So far, these are some common techniques. Here arises the problem - "How we are going to make all of these work together?". The possible solution:

All of these will return a rate between `0` and `1` separately. We can use some sort of an identifier, that'll match if the rate is higher than a specified constant. _UNDER DEVELOPMENT_

> We have to tackle the issue with determining the sequentiality
