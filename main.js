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
            x: 0,
            y: 0,
            currX: 0,
            currY: 0,
        },
        offsetX: 300,
        offsetY: 300,
        set x(val) {
            this.internals.x = val;
        },
        get x() {
            return this.internals.x;
        },
        updateCam: function() {
            var x = this.internals.x;
            var y = this.internals.y;
            var currX = this.internals.currX;
            var currY = this.internals.currY;
            var moveDir = Math.atan2(y - currY, x - currX),
                moveMag = Math.dist(currX, currY, x, y);
            this.internals.x += Math.cos(moveDir) * moveMag;
            this.internals.y += Math.sin(moveDir) * moveMag;

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
        x: (settings.unitSize * x),
        y: (settings.unitSize * y)
    };
}

setGrid(-10, -2, '1');
Object.keys(grid).forEach(function(yPos) {
    Object.keys(grid[yPos]).forEach(function(xPos) {
        println(getGrid(xPos, yPos));
    });
});

draw = function() {
    background(255);
    ellipse(cam.offsetX, cam.offsetY, 10, 10);
};

