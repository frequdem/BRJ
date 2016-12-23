/**
 * Created by KX on 2016/5/24.
 */

function throwOnGLError(err, funcName, args) {
    throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to: " + funcName;
}
function logGLCall(functionName, args) {
    console.log("gl." + functionName + "(" +
        WebGLDebugUtils.glFunctionArgsToString(functionName, args) + ")");
}
function validateNoneOfTheArgsAreUndefined(functionName, args) {
    for (var ii = 0; ii < args.length; ++ii) {
        if (args[ii] === undefined) {
            console.error("undefined passed to gl." + functionName + "(" +
                WebGLDebugUtils.glFunctionArgsToString(functionName, args) + ")");
        }
    }
}
function logAndValidate(functionName, args) {
    logGLCall(functionName, args);
    validateNoneOfTheArgsAreUndefined (functionName, args);
}