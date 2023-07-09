(function() {
  'use strict';

  var gli = function(selector) {
    var elements = document.querySelectorAll(selector);
    return {
      elements: elements,

      // Selecting Elements
      s: function(selector) {
        return new gli(selector);
      },

      // Manipulating Classes
      addClass: function(className) {
        for (var i = 0; i < this.elements.length; i++) {
          this.elements[i].classList.add(className);
        }
      },
      removeClass: function(className) {
        for (var i = 0; i < this.elements.length; i++) {
          this.elements[i].classList.remove(className);
        }
      },
      toggleClass: function(className) {
        for (var i = 0; i < this.elements.length; i++) {
          this.elements[i].classList.toggle(className);
        }
      },

      // Displaying Elements
      hide: function() {
        for (var i = 0; i < this.elements.length; i++) {
          this.elements[i].style.display = 'none';
        }
      },
      show: function() {
        for (var i = 0; i < this.elements.length; i++) {
          this.elements[i].style.display = 'block';
        }
      },

      // Manipulating Content
      text: function(content) {
        for (var i = 0; i < this.elements.length; i++) {
          this.elements[i].textContent = content;
        }
      },

      // Manipulating Attributes
      attr: function(attributeName, value) {
        for (var i = 0; i < this.elements.length; i++) {
          this.elements[i].setAttribute(attributeName, value);
        }
      },
      removeAttr: function(attributeName) {
        for (var i = 0; i < this.elements.length; i++) {
          this.elements[i].removeAttribute(attributeName);
        }
      },
      hasAttr: function(attributeName) {
        for (var i = 0; i < this.elements.length; i++) {
          if (this.elements[i].hasAttribute(attributeName)) {
            return true;
          }
        }
        return false;
      },

      // Handling Events
      on: function(eventName, selector, handler) {
        for (var i = 0; i < this.elements.length; i++) {
          this.elements[i].addEventListener(eventName, handler);
        }
      },

      // Traversing the DOM
      parent: function() {
        return new gli(this.elements[0].parentNode);
      },
      children: function() {
        return new gli(this.elements[0].children);
      },
      siblings: function() {
        return new gli(this.elements[0].siblings);
      },

      // AJAX
      get: function(url, successCallback, errorCallback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function() {
          if (xhr.status === 200) {
            successCallback(xhr.responseText);
          } else {
            errorCallback(xhr.status);
          }
        };
        xhr.send();
      },
      post: function(url, data, successCallback, errorCallback) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
          if (xhr.status === 200) {
            successCallback(xhr.responseText);
          } else {
            errorCallback(xhr.status);
          }
        };
        xhr.send(JSON.stringify(data));
      },

      // Animation
      animate: function(properties, duration, easing, completeCallback) {
        var animation = new Animation(this.elements[0], properties, duration, easing, completeCallback);
        animation.start();
      },
    };
  };

  window.gli = gli
