export default class Core {
    protected static config() {
        return {
            a : 'a',
            b : 'b'
        };
    }

    core = 'core';

    public render() {
        console.log('there');
    }
}
