(function() {
  var gli = function(selector) {
    var elements = document.querySelectorAll(selector);

    // Return an array-like object with selected elements
    var collection = Array.prototype.slice.call(elements);

    // Add methods to the collection object
    collection.addClass = function(className) {
      this.forEach(function(element) {
        element.classList.add(className);
      });
      return this;
    };

    collection.removeClass = function(className) {
      this.forEach(function(element) {
        element.classList.remove(className);
      });
      return this;
    };

    collection.toggleClass = function(className) {
      this.forEach(function(element) {
        element.classList.toggle(className);
      });
      return this;
    };

    collection.hasClass = function(className) {
      return this.some(function(element) {
        return element.classList.contains(className);
      });
    };

    collection.html = function(html) {
      if (html === undefined) {
        return this[0].innerHTML;
      } else {
        this.forEach(function(element) {
          element.innerHTML = html;
        });
        return this;
      }
    };

    collection.text = function(text) {
      if (text === undefined) {
        return this[0].textContent;
      } else {
        this.forEach(function(element) {
          element.textContent = text;
        });
        return this;
      }
    };

    collection.attr = function(attribute, value) {
      if (value === undefined) {
        return this[0].getAttribute(attribute);
      } else {
        this.forEach(function(element) {
          element.setAttribute(attribute, value);
        });
        return this;
      }
    };

    collection.removeAttr = function(attribute) {
      this.forEach(function(element) {
        element.removeAttribute(attribute);
      });
      return this;
    };

    collection.prop = function(property, value) {
      if (value === undefined) {
        return this[0][property];
      } else {
        this.forEach(function(element) {
          element[property] = value;
        });
        return this;
      }
    };

    collection.val = function(value) {
      if (value === undefined) {
        return this[0].value;
      } else {
        this.forEach(function(element) {
          element.value = value;
        });
        return this;
      }
    };

    collection.on = function(eventType, callback) {
      this.forEach(function(element) {
        element.addEventListener(eventType, callback);
      });
      return this;
    };

    collection.off = function(eventType, callback) {
      this.forEach(function(element) {
        element.removeEventListener(eventType, callback);
      });
      return this;
    };

    collection.click = function(callback) {
      this.on('click', callback);
      return this;
    };

    collection.show = function() {
      this.forEach(function(element) {
        element.style.display = '';
      });
      return this;
    };

    collection.hide = function() {
      this.forEach(function(element) {
        element.style.display = 'none';
      });
      return this;
    };

    collection.toggle = function() {
      this.forEach(function(element) {
        if (window.getComputedStyle(element).display === 'none') {
          element.style.display = '';
        } else {
          element.style.display = 'none';
        }
      });
      return this;
    };

    collection.fadeIn = function(duration) {
      this.forEach(function(element) {
        element.style.opacity = '0';
        element.style.display = '';
        var start = null;

        function animate(timestamp) {
          if (!start) start = timestamp;
          var progress = timestamp - start;
          element.style.opacity = Math.min(progress / duration, 1);
          if (progress < duration) {
            window.requestAnimationFrame(animate);
          }
        }

        window.requestAnimationFrame(animate);
      });
      return this;
    };

    collection.fadeOut = function(duration) {
      this.forEach(function(element) {
        element.style.opacity = '1';
        var start = null;

        function animate(timestamp) {
          if (!start) start = timestamp;
          var progress = timestamp - start;
          element.style.opacity = Math.max(1 - progress / duration, 0);
          if (progress < duration) {
            window.requestAnimationFrame(animate);
          } else {
            element.style.display = 'none';
          }
        }

        window.requestAnimationFrame(animate);
      });
      return this;
    };

    collection.slideUp = function(duration) {
      this.forEach(function(element) {
        var startHeight = element.offsetHeight;
        var start = null;

        function animate(timestamp) {
          if (!start) start = timestamp;
          var progress = timestamp - start;
          element.style.height = Math.max(startHeight - (progress / duration) * startHeight, 0) + 'px';
          if (progress < duration) {
            window.requestAnimationFrame(animate);
          } else {
            element.style.display = 'none';
          }
        }

        window.requestAnimationFrame(animate);
      });
      return this;
    };

    collection.slideDown = function(duration) {
      this.forEach(function(element) {
        var startHeight = element.offsetHeight;
        element.style.height = '0';
        element.style.display = '';
        var start = null;

        function animate(timestamp) {
          if (!start) start = timestamp;
          var progress = timestamp - start;
          element.style.height = Math.min((progress / duration) * startHeight, startHeight) + 'px';
          if (progress < duration) {
            window.requestAnimationFrame(animate);
          }
        }

        window.requestAnimationFrame(animate);
      });
      return this;
    };

    collection.ajax = function(options) {
      var xhr = new XMLHttpRequest();
      xhr.open(options.method || 'GET', options.url);

      if (options.headers) {
        for (var header in options.headers) {
          if (options.headers.hasOwnProperty(header)) {
            xhr.setRequestHeader(header, options.headers[header]);
          }
        }
      }

      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400) {
          options.success(xhr.responseText);
        } else {
          options.error(xhr);
        }
      };

      xhr.onerror = function() {
        options.error(xhr);
      };

      xhr.send(options.data || null);
    };

    return collection;
  };

  // Alias 'gli' to 's'
  var s = gli;

  // Expose 's' globally
  window.s = s;
})();
