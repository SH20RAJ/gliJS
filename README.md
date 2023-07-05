# gli.js 🚀

gli.js is a lightweight JavaScript library that provides a simplified alternative to jQuery. It offers a range of useful functions to manipulate the DOM, handle events, perform AJAX requests, and animate elements.

## Getting Started

To use gli.js, include the script file in your HTML document:

```html
<script src="https://cdn.jsdelivr.net/gh/SH20RAJ/gliJS@main/gli.min.js"></script>
```

## Usage

### Selecting Elements

You can select elements using the `$gli` function and pass a CSS selector as a parameter:

```javascript
var elements = $gli('.selector');
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

## Examples

### Example 1: Hiding an Element

```javascript
$gli('#element').hide();
```

### Example 2: Adding a Class to Multiple Elements

```javascript
$gli('.elements').addClass('highlight');
```

### Example 3: Handling Click Events

```javascript
$gli('.button').on('click', function(event) {
  // Handle click event
});
```

### Example 4: Making an AJAX GET Request

```javascript
$gli.get('https://api.example.com/data', function(response) {
  // Handle successful response
}, function(errorStatus) {
  // Handle error
});
```

### Example 5: Animating an Element

```javascript
$gli('.element').animate([
  ['opacity', 0, 1],
  ['width', '100px', '200px'],
], 1000, function(timestamp) {
  // Animation complete
});
```

## Browser Support

gli.js supports all modern browsers, including Chrome, Firefox, Safari, and Edge.

## License

This library is released under the MIT license. For more details, please see the [LICENSE](LICENSE) file.
```

Feel free to customize and expand upon this documentation file as needed.
