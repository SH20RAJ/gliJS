var s = (function() {
  var s = function(selector) {
    return new s.fn.init(selector);
  };

  s.ready = function(callback) {
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  };

  s.fn = s.prototype = {
    constructor: s,
    init: function(selector) {
      this.elements = Array.from(document.querySelectorAll(selector));
      return this;
    },
    addClass: function(className) {
      this.elements.forEach(function(element) {
        element.classList.add(className);
      });
      return this;
    },
    removeClass: function(className) {
      this.elements.forEach(function(element) {
        element.classList.remove(className);
      });
      return this;
    },
    toggleClass: function(className) {
      this.elements.forEach(function(element) {
        element.classList.toggle(className);
      });
      return this;
    },
    hide: function() {
      this.elements.forEach(function(element) {
        element.style.display = 'none';
      });
      return this;
    },
    show: function() {
      this.elements.forEach(function(element) {
        element.style.display = '';
      });
      return this;
    },
    text: function(content) {
      if (content !== undefined) {
        this.elements.forEach(function(element) {
          element.textContent = content;
        });
        return this;
      } else {
        return this.elements[0].textContent;
      }
    },
    attr: function(attributeName, value) {
      if (value !== undefined) {
        this.elements.forEach(function(element) {
          element.setAttribute(attributeName, value);
        });
        return this;
      } else {
        return this.elements[0].getAttribute(attributeName);
      }
    },
    removeAttr: function(attributeName) {
      this.elements.forEach(function(element) {
        element.removeAttribute(attributeName);
      });
      return this;
    },
    hasAttr: function(attributeName) {
      return this.elements.some(function(element) {
        return element.hasAttribute(attributeName);
      });
    },
    on: function(eventName, selector, handler) {
      if (typeof selector === 'function') {
        handler = selector;
        selector = null;
      }
      this.elements.forEach(function(element) {
        element.addEventListener(eventName, function(event) {
          var target = selector ? event.target.closest(selector) : event.target;
          if (target) {
            handler.call(target, event);
          }
        });
      });
      return this;
    },
    parent: function() {
      var parents = this.elements.map(function(element) {
        return element.parentNode;
      });
      return s(parents);
    },
    children: function() {
      var children = [];
      this.elements.forEach(function(element) {
        children.push.apply(children, element.children);
      });
      return s(children);
    },
    siblings: function() {
      var siblings = [];
      this.elements.forEach(function(element) {
        for (var sibling = element.parentNode.firstChild; sibling; sibling = sibling.nextSibling) {
          if (sibling.nodeType === 1 && sibling !== element) {
            siblings.push(sibling);
          }
        }
      });
      return s(siblings);
    },
    get: function(url, successCallback, errorCallback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400) {
          if (successCallback) {
            successCallback(xhr.responseText);
          }
        } else {
          if (errorCallback) {
            errorCallback(xhr.status);
          }
        }
      };
      xhr.onerror = function() {
        if (errorCallback) {
          errorCallback(xhr.status);
        }
      };
      xhr.send();
    },
    post: function(url, data, successCallback, errorCallback) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400) {
          if (successCallback) {
            successCallback(xhr.responseText);
          }
        } else {
          if (errorCallback) {
            errorCallback(xhr.status);
          }
        }
      };
      xhr.onerror = function() {
        if (errorCallback) {
          errorCallback(xhr.status);
        }
      };
      xhr.send(data);
    },
    animate: function(properties, duration, easing, completeCallback) {
      function animate(timestamp) {
        if (start === null) {
          start = timestamp;
        }
        var progress = timestamp - start;
        var percentage = progress / duration;
        if (typeof easing === 'function') {
          percentage = easing(progress, duration, 0, 1, duration);
        }
        if (percentage <= 1) {
          requestAnimationFrame(animate);
        } else {
          if (completeCallback) {
            try {
              completeCallback(timestamp);
            } catch (error) {
              console.error(error);
            }
          }
        }
        for (var i = 0; i < properties.length; i++) {
          var property = properties[i];
          var target = property[0];
          var startValue = property[1];
          var unit = property[2] || 'px';
          var currentValue = (startValue + percentage * (property[3] - startValue)) + unit;
          target.style[property] = currentValue;
        }
      }

      var elements = this.elements;
      var properties = [];
      var start = null;

      for (var property in properties) {
        if (properties.hasOwnProperty(property)) {
          for (var i = 0; i < elements.length; i++) {
            var computedStyle = getComputedStyle(elements[i]);
            var initialValue = computedStyle[property];
            if (initialValue === '' || initialValue === 'auto') {
              properties[property] = [property, properties[property][0], properties[property][1]];
            } else {
              properties[property] = [property, parseFloat(initialValue), properties[property][1]];
            }
          }
          break;
        }
      }

      for (var i = 0; i < properties.length; i++) {
        var property = properties[i];
        var target = property[0];
        var startValue = property[1];
        var unit = property[2] || 'px';
        var endValue = property[3];
        properties.push(property);
        var currentValue = parseFloat(getComputedStyle(elements[i])[target]);
        if (isNaN(currentValue)) {
          currentValue = 0;
        }
        properties.push(elements[i]);
        elements.push(elements[i]);
      }

      requestAnimationFrame(animate);

      return this;
    }
  };

  s.fn.init.prototype = s.fn;

  return s;
})();
