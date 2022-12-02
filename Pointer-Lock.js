(function(ext) {
    ext._shutdown = function() {
        document.exitPointerLock();
    };

    ext._getStatus = function() {
        if (havePointerLock) {
            return {status: 2, msg: 'Your browser supports pointer lock.'};
        }
        return {status: 0, msg: 'Your browser doesn\'t supports pointer lock. Try Chrome or Firefox!'}
    };

    var moveCallback = function(e) {
        clearTimeout(stillTimeout);
        stillTimeout = setTimeout(mouseStill, 300);
        movementX = e.movementX         ||
                    e.mozMovementX      ||
                    e.webkitMovementX   ||
                    0;
        movementY = e.movementY         ||
                    e.mozMovementY      ||
                    e.webkitMovementY   ||
                    0;
    }

    var mouseStill = function() {
        movementX = 0;
        movementY = 0;
    }

    var element = document.body;

    var havePointerLock = 'pointerLockElement' in document ||
    'mozPointerLockElement' in document ||
    'webkitPointerLockElement' in document;

    element.requestPointerLock = element.requestPointerLock ||
    element.mozRequestPointerLock ||
    element.webkitRequestPointerLock;

    document.exitPointerLock = document.exitPointerLock ||
    document.mozExitPointerLock ||
    document.webkitExitPointerLock;

    document.addEventListener("mousemove", moveCallback, false);

    var stillTimeout;

    var movementX = 0;
    var movementY = 0;

    ext.lock = function() {
        element.requestPointerLock();
    }

    ext.unlock = function() {
        document.exitPointerLock();
    }

    ext.movex = function() {
        return movementX;
    }

    ext.movey = function() {
        return movementY;
    }

    ext.canlock = function() {
        return havePointerLock;
    }

    var descriptor = {
        blocks: [
            [' ', 'Lock mouse', 'lock'],
            [' ', 'Unlock mouse', 'unlock'],
            ['r', 'Mouse movement X', 'movex'],
            ['r', 'Mouse movement Y', 'movey'],
            ['b', 'Can lock mouse?', 'canlock']
        ]
    };

    ScratchExtensions.register('Pointer lock', descriptor, ext);
})({});
