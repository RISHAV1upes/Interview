if (!('Notification' in window)) {
        document.getElementById('wn-unsupported').classList.remove('hidden');
        document.getElementById('Notification A').setAttribute('disabled', 'disabled');
        document.getElementById('Notification B').setAttribute('disabled', 'disabled');
      } else {
        var log = document.getElementById('log');
        var notificationEvents = ['onclick', 'onshow', 'onerror', 'onclose'];

        function notifyUser(event) {
          var title;
          var options;

          event.preventDefault();

          if (event.target.id === 'Notification A') {
            title = 'Email received';
            options = {
              tag: 'A',
            };
          } else {
            title = document.getElementById('title').value;
            options = {
              body: document.getElementById('body').value,
              tag: 'B'
            };
          }

          Notification.requestPermission(function() {
            var notification = new Notification(title, options);

            notificationEvents.forEach(function(eventName) {
              notification[eventName] = function(event) {
                log.innerHTML = 'Event "' + event.type + '" triggered for notification "' + notification.tag + '"<br />' + log.innerHTML;
              };
            });
          });
        }

        document.getElementById('Notification A').addEventListener('click', notifyUser);
        document.getElementById('Notification B').addEventListener('click', notifyUser);
        document.getElementById('clear-log').addEventListener('click', function() {
          log.innerHTML = '';
        });
      }
