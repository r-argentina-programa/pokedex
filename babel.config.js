module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};

//jest corre, primero pasa los archivos de .js por babel, que generan archivos de js con js adecuado para node,
// y luego corre los tests sobre el js optimizado para node
