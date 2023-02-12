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

var settings = {
    gridSize: 128,
};


/**
 * Camera
 */
var cam = (function() {
    var cam = {
        internals: {
            x: 0,
            y: 0
        },
        set x(val) {
            this.internals.x = val;
        },
        get x() {
            return this.internals.x;
        }
    };
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
setGrid(-10, 0, '1');
println(getGrid(-10, 0));


void (1 || random());

