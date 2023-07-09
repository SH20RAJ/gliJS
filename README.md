# gli.js 🚀

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/SH20RAJ/gliJS/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/SH20RAJ/gliJS.svg)](https://github.com/SH20RAJ/gliJS/stargazers)

**gli.js** is a lightweight JavaScript library that provides a simplified alternative to jQuery. It offers a range of useful functions to manipulate the DOM, handle events, perform AJAX requests, and animate elements.

## Table of Contents

- [Getting Started](#getting-started)
- [Usage](#usage)
  - [Selecting Elements](#selecting-elements)
  - [Manipulating Classes](#manipulating-classes)
  - [Displaying Elements](#displaying-elements)
  - [Manipulating Content](#manipulating-content)
  - [Manipulating Attributes](#manipulating-attributes)
  - [Handling Events](#handling-events)
  - [Traversing the DOM](#traversing-the-dom)
  - [AJAX](#ajax)
  - [Animation](#animation)
- [Examples](#examples)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To use gli.js, include the script file in your HTML document:

```html
<script src="https://cdn.jsdelivr.net/gh/SH20RAJ/gliJS@main/gli.min.js"></script>
```

You can also download the [gli.min.js](https://github.com/SH20RAJ/gliJS/blob/main/gli.min.js) file from the repository and host it locally.

## Usage

### Selecting Elements

You can select elements using the `s` function and pass a CSS selector as a parameter:

```javascript
var elements = s('.selector');
```

### Manipulating Classes

- `addClass(className)`: Adds the specified class to the selected elements.
- `removeClass(className)`: Removes the specified class from the selected elements.
- `toggleClass(className)`: Toggles the specified class on the selected elements.

### Displaying Elements

- `hide()`: Hides the selected elements.
- `show()`: Shows the selected elements.

### Manipulating Content

- `text(content)`: Gets or sets the text content of the selected elements.

### Manipulating Attributes

- `attr(attributeName, value)`: Gets or sets the attribute value of the selected elements.
- `removeAttr(attributeName)`: Removes the specified attribute from the selected elements.
- `hasAttr(attributeName)`: Checks if the selected elements have the specified attribute.

### Handling Events

- `on(eventName, selector, handler)`: Attaches an event handler to the selected elements or their descendants.

### Traversing the DOM

- `parent()`: Returns a new gli object containing the parent elements of the selected elements.
- `children()`: Returns a new gli object containing the children elements of the selected elements.
- `siblings()`: Returns a new gli object containing the sibling elements of the selected elements.

### AJAX

- `get(url, successCallback, errorCallback)`: Performs an HTTP GET request.
- `post(url, data, successCallback, errorCallback)`: Performs an HTTP POST request.

### Animation

- `animate(properties, duration, easing, completeCallback)`: Animates CSS properties of the selected elements.

For more detailed information on each method and its parameters, please refer to the [API Documentation](API.md).

## Examples

### Example 1: Hiding an Element

```javascript
s('#element').hide();
```

### Example 2: Adding a Class to Multiple Elements

```javascript
s('.elements').addClass('highlight');
```

### Example 3: Handling Click Events

```javascript
s('.button').on('click', function(event) {
  // Handle click event
});
```

### Example 4: Making an AJAX GET Request

```javascript
s.get('https://api.example.com/data', function(response) {
  // Handle successful response
}, function(errorStatus) {
  // Handle error
});
```

### Example 5: Animating an Element

```javascript
s('.element').animate([
  ['opacity', 0, 1],
  ['width', '100px', '200px'],
], 1000, function(timestamp) {
  // Animation complete
});
```

You can find more examples and use cases in the [examples directory](https://github.com/SH20RAJ/gliJS/tree/main/examples).

## Browser Support

gli.js supports all modern browsers, including Chrome, Firefox, Safari, and Edge.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request for any improvements or fixes you'd like to contribute.

Please read the [Contributing Guidelines](CONTRIBUTING.md) for more details on how to contribute.

## License

This library is released under the [MIT License](LICENSE). See the [LICENSE](LICENSE) file for more details.
