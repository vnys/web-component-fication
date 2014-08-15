/*

http://developer.telerik.com/featured/web-components-ready-production/

*/

// (function() {
//   "use strict";

  var proto = Object.create( HTMLElement.prototype, {
    createdCallback : {
      value: function () {
        var that = this;

        this.hours = [];
        this.minutes = [];
        this.seconds = [];

        var block = document.createElement('div');

        var i = 12;

        while( i > 0) {
          this.hours.push(block.cloneNode(true));
          i--;
        };

        i = 60;

        while( i > 0) {
          this.minutes.push(block.cloneNode(true));
          this.seconds.push(block.cloneNode(true));
          i--;
        }

        var clockFaceContainer = document.createDocumentFragment();
        var clockFaceHours = block.cloneNode(true);
        var clockFaceMinute = block.cloneNode(true);
        var clockFaceSecond = block.cloneNode(true);

        clockFaceHours.classList.add('clock-face-hours');
        clockFaceMinute.classList.add('clock-face-minutes');
        clockFaceSecond.classList.add('clock-face-seconds');


        this.hours.forEach(function (hour) {
          clockFaceHours.appendChild(hour);
        });

        this.minutes.forEach(function(minute) {
          clockFaceMinute.appendChild(minute);
        });

        this.seconds.forEach(function (second) {
          clockFaceSecond.appendChild(second);
        });

        clockFaceContainer.appendChild(clockFaceHours);
        clockFaceContainer.appendChild(clockFaceMinute);
        clockFaceContainer.appendChild(clockFaceSecond);


        this.appendChild(clockFaceContainer);


        setInterval(function () {
          that.updateClock();
        }, 1000);

        window.clock = this;
      }
    },
    updateClock: {
      value: function () {
        var now = new Date(),
            hour = (now.getHours() % 12) - 1,
            minute = now.getMinutes() - 1 ,
            second = now.getSeconds() - 1;

        [].forEach.call(this.querySelectorAll('.active'), function (block) {
          block.classList.remove('active')
        })

        this.hours[hour === -1 ? 11 : hour].classList.add('active');
        this.minutes[minute === -1 ? 59 : minute].classList.add('active');
        this.seconds[second === -1 ? 59 : second].classList.add('active');

      }
    }
  });

  document.registerElement('clock-face', {
    prototype: proto
  })

// }());
