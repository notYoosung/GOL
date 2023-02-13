void (/\/*/);
; (function() {
    var window = this;
    if (!window.__disableLoopProtection__) {
        window.__disableLoopProtection__ = true;
        window.ASTTransforms.rewriteNewExpressions = function() {
            return {};
        };
        window.LoopProtector.prototype.leave = function() { };
        window.PJSCodeInjector.prototype.exec = function(code, context, mutatingCalls) {
            if (!code) {
                return;
            }
            try {
                code = '(function() {' + code + '})();';
                var transformedCode = this.transformCode(code, context, mutatingCalls);
                transformedCode = transformedCode.slice(14, -5);
                var funcBody = 'var ' + this.envName + ' = context;\n' + transformedCode;
                var func = new window.Function("context", funcBody);
                func(context);
            } catch (e) {
                return e;
            }
        };
        var env = window.Processing.instances[0];
        env.Program.restart();
        throw new window.Error("Restarting program");
    }
})();
smooth();
angleMode = "radians";

Object.constructor.prototype.new = (function() {
    var obj = Object.create(this.prototype);
    this.apply(obj, arguments);
    return obj;
});


var keys = (function() {
    var keys = {};
    keyPressed = function() {
        keys['_' + key.toString().toLowerCase()] = true;
        keys[keyCode] = true;
        keys.pressed = true;
        keys.down = true;
        keys.up = false;
        keys.pressedCode = keyCode;
        keys.pressedKey = key.toString().toLowerCase();
    };
    keyReleased = function() {
        keys['_' + key.toString().toLowerCase()] = false;
        keys[keyCode] = false;
        keys.released = true;
        keys.down = false;
        keys.up = true;
        keys.releasedCode = keyCode;
        keys.releasedKey = key.toString().toLowerCase();
    };
    return keys;
})();

var mouse = (function() {
    var mouse = {
        clicked: false, // mouseClicked
        clickActive: false, // If a click has been used
        initialPressed: false, // 
        initialPressedPos: [undefined, undefined],
        down: false,
        up: true,
        pressed: false, // mousePressed
        released: false, // mouseReleased
        dragged: false, // mouseDragged
        out: true, // mouseOut
        availableClick: true, // 
        focused: focused, // Is the mouse focused on the canvas

        doubleClicked: false, // isDoubleClicked
        startDoubleClickTimer: false, // If to start the timer
        doubleClickTimer: 0, // The timer
        resetDoubleClick: function() {
            mouse.startDoubleClickTimer = false;
            mouse.doubleClickTimer = 0;
        }, // To reset the properties
    };
    mouseClicked = function() {
        mouse.clicked = !false;
        (function /*isDoubleClicked*/() {
            if (mouse.doubleClickTimer >= 0 && mouse.startDoubleClickTimer) {
                mouse.doubleClicked = true;
                mouse.resetDoubleClick();
            }
            if (!mouse.startDoubleClickTimer) {
                mouse.startDoubleClickTimer = true;
                mouse.doubleClickTimer = 20;
            }
        })();
    };
    mousePressed = function() {
        mouse.initialPressed = true;
        mouse.initialPressedPos = [mouseX, mouseY];
        mouse.pressed = true;
    };
    mouseReleased = function() {
        mouse.pressed = false;
        mouse.released = true;
    };
    mouseDragged = function() {
        mouse.dragged = true;
    };
    mouseOver = function() {
        mouse.over = true;
    };
    mouseOut = function() {
        mouse.over = false;
    };
    return mouse;
})();

function isThing(something) {
    return something !== undefined && something !== null;
}

Math.TAU = Math.PI * 2;
Math.dist = function(x1, y1, x2, y2, dst) {
    return dst ?
        (((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) <= dst * dst) :
        Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
};
Math.distSq = function(x1, y1, x2, y2) {
    return ((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
};
function hasProp(obj, prop) {
    return obj.hasOwnProperty(prop);
}
Object.constructor.prototype.hasProp = hasProp;

function getKeys(obj) {
    return Object.keys(obj);
}

function getValues(obj) {
    return Object.values(obj);
}

function getEntries(obj) {
    return Object.entries(obj);
}


var settings = {
    unitSize: 10,
};


/**
 * Camera
 */
var cam = (function() {
    var cam = {
        internals: {
            x: 100,
            y: 100,
            currX: 0,
            currY: 0,
        },
        offsetX: 300,
        offsetY: 300,
        speed: 10,
        set x(val) {
            // println(val);
            this.internals.x = val;
        },
        get x() {
            return this.internals.x;
        },
        set y(val) {
            // println(val);
            this.internals.y = val;
        },
        get y() {
            return this.internals.y;
        },
        updateCam: function() {
            if (keys[LEFT]) {
                cam.x -= cam.speed;
            }
            if (keys[RIGHT]) {
                cam.x += cam.speed;
            }
            if (keys[UP]) {
                cam.y -= cam.speed;
            }
            if (keys[DOWN]) {
                cam.y += cam.speed;
            }



            var x = this.internals.x;
            var y = this.internals.y;
            var currX = this.internals.currX;
            var currY = this.internals.currY;
            var moveDir = Math.atan2(y - currY, x - currX),
                moveMag = Math.dist(currX, currY, x, y);
            var lerpMag = (moveMag * 0.10);
            this.internals.currX += Math.cos(moveDir) * lerpMag;
            this.internals.currY += Math.sin(moveDir) * lerpMag;

            this.offsetX = this.internals.currX + 300;
            this.offsetY = this.internals.currY + 300;

        },
    };
    return cam;
})();

/**
 * Grid/map
 */
var grid = [];

function setGrid(x, y, setTo) {
    if (grid[y] === undefined) {
        grid[y] = [];
    }
    grid[y][x] = setTo;
}
function getGrid(x, y) {
    return grid[y][x];
}
function gridToCart(x, y) {
    return {
        x: (settings.unitSize * x) + cam.offsetX,
        y: (settings.unitSize * y) + cam.offsetY
    };
}

textSize(settings.unitSize);
textAlign(CENTER, CENTER);
fill(0);
setGrid(-10, -2, '1');
setGrid(10, 2, '2');
setGrid(0, 0, '0');

draw = function() {
    background(255);

    cam.updateCam();

    fill(0);
    Object.keys(grid).forEach(function(yPos) {
        Object.keys(grid[yPos]).forEach(function(xPos) {
            text(grid[yPos][xPos], xPos * settings.unitSize + cam.offsetX, yPos * settings.unitSize + cam.offsetY);
        });
    });

    (function /*resetVariables*/() {
        mouse.initialPressed = mouse.doubleClicked = mouse.pressed = mouse.released = mouse.clicked = mouse.dragged = false;
        keys.pressed = keys.released = keys.pressedCode = keys.pressedKey = keys.releasedCode = keys.releasedKey = false;
        mouse.focused = focused;

        if (mouse.startDoubleClickTimer) {
            mouse.doubleClickTimer--;

            if (mouse.doubleClickTimer < 0) {
                mouse.resetDoubleClick();
            }
        }
    })();
};

void (1 || random());
