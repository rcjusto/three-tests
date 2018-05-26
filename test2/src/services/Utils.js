export default class Utils {

    static stringConstructor = "test".constructor;
    static arrayConstructor = [].constructor;
    static objectConstructor = {}.constructor;

    static TYPE_ARRAY = "Array";
    static TYPE_OBJECT = "Object";
    static TYPE_STRING = "String";
    static TYPE_NULL = "null";
    static TYPE_UNDEFINED = "undefined";
    static TYPE_UNKNOWN = "unknown";

    static getType(object) {
        if (object === null) {
            return this.TYPE_NULL;
        }
        else if (object === undefined) {
            return this.TYPE_UNDEFINED;
        }
        else if (object.constructor === Utils.stringConstructor) {
            return this.TYPE_STRING;
        }
        else if (object.constructor === Utils.arrayConstructor) {
            return this.TYPE_ARRAY;
        }
        else if (object.constructor === Utils.objectConstructor) {
            return this.TYPE_OBJECT;
        }
        else {
            return this.TYPE_UNKNOWN;
        }
    }

    static isArray(object) {
        return this.getType(object) === this.TYPE_ARRAY;
    }

    static isObject(object) {
        return this.getType(object) === this.TYPE_OBJECT;
    }


}