var gli = (function() {
  var gli = function(selector) {
    return new gli.init(selector);
  };

  gli.fn = gli.prototype = {
    constructor: gli,
    init: function(selector) {
      this.e = Array.from(document.querySelectorAll(selector));
      return this;
    },
    addClass: function(className) {
      this.e.forEach(function(element) {
        element.classList.add(className);
      });
      return this;
    },
    removeClass: function(className) {
      this.e.forEach(function(element) {
        element.classList.remove(className);
      });
      return this;
    },
    toggleClass: function(className) {
      this.e.forEach(function(element) {
        element.classList.toggle(className);
      });
      return this;
    },
    hide: function() {
      this.e.forEach(function(element) {
        element.style.display = 'none';
      });
      return this;
    },
    show: function() {
      this.e.forEach(function(element) {
        element.style.display = '';
      });
      return this;
    },
    text: function(content) {
      if (content !== undefined) {
        this.e.forEach(function(element) {
          element.textContent = content;
        });
        return this;
      } else {
        return this.e[0].textContent;
      }
    },
    attr: function(attributeName, value) {
      if (value !== undefined) {
        this.e.forEach(function(element) {
          element.setAttribute(attributeName, value);
        });
        return this;
      } else {
        return this.e[0].getAttribute(attributeName);
      }
    },
    removeAttr: function(attributeName) {
      this.e.forEach(function(element) {
        element.removeAttribute(attributeName);
      });
      return this;
    },
    on: function(eventName, selector, handler) {
      this.e.forEach(function(element) {
        element.addEventListener(eventName, function(event) {
          var target = event.target.closest(selector);
          if (target) {
            handler.call(target, event);
          }
        });
      });
      return this;
    },
    parent: function() {
      return gli(this.e.map(function(element) {
        return element.parentNode;
      }));
    },
    children: function() {
      var children = [];
      this.e.forEach(function(element) {
        children.push.apply(children, element.children);
      });
      return gli(children);
    },
    siblings: function() {
      var siblings = [];
      this.e.forEach(function(element) {
        for (var sibling = element.parentNode.firstChild; sibling; sibling = sibling.nextSibling) {
          if (sibling.nodeType === 1 && sibling !== element) {
            siblings.push(sibling);
          }
        }
      });
      return gli(siblings);
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
          if (loop) {
            running = false;
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

      var elements = this.e;
      var properties = [];
      var start = null;
      var running = true;
      var loop = false;

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

  gli.fn.init.prototype = gli.fn;

  return gli;
})();
