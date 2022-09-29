function(instance, context) {
    instance.data.toHexString = (bytes) => {
        return bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
    };
}
