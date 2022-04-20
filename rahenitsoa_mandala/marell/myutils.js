// FOLLOW_HEAD_ROTATION
AFRAME.registerComponent('follow-head-rotation', {
    schema: {
        trace: { type: 'boolean', default: true },
        cam: { type: 'string'},
        log: { type: 'string'}
    },
    init: function () {
        this.data.cam = document.querySelector('a-entity[camera]');

        if (this.data.trace) {
            createLog();
        }

        function createLog() {
            var text = document.createElement('a-text');
            document.querySelector('a-entity[camera]').appendChild(text);
            text.setAttribute('position', '0 0 -0.5');
            text.setAttribute('value', 'position');
            text.setAttribute('width', 1);
            text.setAttribute('id', 'txtlog');
            text.setAttribute('align', 'center');
            text.setAttribute('color', '#FFF');
        };
    },
    tick: function () {
            var rot = this.data.cam.object3D.rotation;
            var ry = (rot.y * (180 / Math.PI)).toFixed(2);
            var newrot = " -90 " + ry + " 180";
            //console.log(newrot);
            this.el.setAttribute('rotation', newrot);

        if (this.data.trace) {
            var sceneEl = document.querySelector('a-scene');
            var log = sceneEl.querySelector('#txtlog');
            log.setAttribute('value', ry);

        }

    }
});

// FOLLOW_HAND_POSITION
AFRAME.registerComponent('follow-hand-position', {
    schema: {
        trace: {
            type: 'boolean',
            default: true
        },
        hand: {
            type: 'string'
        },
        log: {
            type: 'string'
        }
    },
    init: function () {
        var side = (this.el.id.substring(4));
        var sceneEl = document.querySelector('a-scene');
        this.data.hand = sceneEl.querySelector('#main' + side);
    },
    tick: function () {
        var pos = this.data.hand.object3D.position;
        var newpos = pos.x + " 0 "+ pos.z;
        this.el.setAttribute('position', newpos);

    }
});



