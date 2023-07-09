
# gli.js

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/SH20RAJ/gliJS/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/SH20RAJ/gliJS.svg)](https://github.com/SH20RAJ/gliJS/stargazers)

**gli.js** is a lightweight JavaScript library that provides a simplified alternative to jQuery. It offers a range of useful functions to manipulate the DOM, handle events, perform AJAX requests, and animate elements.

## Features

- Select elements using CSS selectors
- Manipulate classes on elements
- Show and hide elements
- Get and set text content of elements
- Get and set attributes of elements
- Attach event listeners to elements
- Traverse the DOM tree
- Perform AJAX requests (GET and POST)
- Animate CSS properties of elements

## Getting Started

To use **gli.js**, you have two options:

1. Include the gli.js script file in your HTML:

   ```html
   <script src="https://cdn.jsdelivr.net/gh/SH20RAJ/gliJS@main/gli.min.js"></script>
   ```

2. Download the gli.min.js file from the [repository](https://github.com/SH20RAJ/gliJS/blob/main/gli.min.js) and include it in your project.

## Usage

**Selecting Elements**

You can use the `$gli` function (or `gli`) to select elements from the DOM using CSS selectors:

```javascript
var element = $gli('#myElement');      // Select a single element
var elements = $gli('.myClass');       // Select multiple elements
```

**Manipulating Classes**

Manipulate classes on selected elements:

```javascript
element.addClass('highlight');         // Add a class to an element
element.removeClass('highlight');      // Remove a class from an element
element.toggleClass('active');         // Toggle a class on an element
```

**Displaying Elements**

Control the visibility of elements:

```javascript
element.hide();                        // Hide an element
element.show();                        // Show an element
```

**Manipulating Content**

Get or set the text content of elements:

```javascript
var text = element.text();             // Get the text content of an element
element.text('New text content');      // Set the text content of an element
```

**Manipulating Attributes**

Get or set attributes on elements:

```javascript
var value = element.attr('data-value');           // Get the value of an attribute
element.attr('data-value', 'new value');          // Set the value of an attribute
element.removeAttr('data-value');                 // Remove an attribute
```

**Handling Events**

Attach event listeners to elements:

```javascript
element.on('click', function(event) {
  // Handle click event
});
```

**Traversing the DOM**

Traverse the DOM tree with parent, children, and siblings methods:

```javascript
var parentElement = element.parent();             // Get the parent element
var childrenElements = element.children();        // Get the children elements
var siblingElements = element.siblings();         // Get the sibling elements
```

**AJAX**

Perform AJAX requests:

```javascript
$gli.get(url, successCallback, errorCallback);    // Make a GET request
$gli.post(url, data, successCallback, errorCallback);  // Make a POST request
```

**Animation**

Animate CSS properties of elements:

```javascript
element.animate([
  ['opacity', 0, 1],                  // Animate opacity from 0 to 1
  ['width', '100px', '200px']         // Animate width from 100px to 200px
], 1000, function(timestamp) {
  // Animation complete
});
```

For detailed information on all available methods and their usage, please refer to the [API Documentation](API.md).

## Browser Support

**gli.js** supports all modern browsers, including Chrome, Firefox, Safari, and Edge.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request for any improvements or fixes you'd like to contribute.

Please read the [Contributing Guidelines](CONTRIBUTING.md) for more details on how to contribute.

## License

This library is released under the [MIT License](LICENSE). See the [LICENSE](LICENSE) file for more details.
