// module.exports = function (api) {
//     api.cache(true);
//     return {
//         presets: [ 'babel-preset-expo' ],
//         plugins: [ 'react-native-paper/babel' ],
//     };
// };

module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver', {
                    root: ['.'],
                    alias: {
                        src: './src',
                    },
                },
            ],
            'react-native-reanimated/plugin',
        ],
    };
};
