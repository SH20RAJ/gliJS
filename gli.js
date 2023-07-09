var gli = (function() {
  var gli = function(selector) {
    return new GliInit(selector);
  };

  var GliInit = function(selector) {
    this.e = Array.from(document.querySelectorAll(selector));
  };

  GliInit.prototype = {
    constructor: GliInit,
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
      if (typeof selector === 'function') {
        handler = selector;
        selector = null;
      }
      this.e.forEach(function(element) {
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
      var elements = this.e;
      var propertiesArray = [];
      var start = null;
      var running = true;

      for (var i = 0; i < properties.length; i++) {
        var property = properties[i];
        var target = property[0];
        var startValue = property[1];
        var unit = property[2] || 'px';
        var endValue = property[3];

        propertiesArray.push([target, parseFloat(startValue), unit, endValue]);
      }

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

        for (var i = 0; i < propertiesArray.length; i++) {
          var property = propertiesArray[i];
          var target = property[0];
          var startValue = property[1];
          var unit = property[2];
          var endValue = property[3];
          var currentValue = startValue + percentage * (endValue - startValue);
          elements.forEach(function(element) {
            element.style[target] = currentValue + unit;
          });
        }
      }

      requestAnimationFrame(animate);

      return this;
    }
  };

  gli.fn = GliInit.prototype;

  return gli;
})();
