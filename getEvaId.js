/* eslint no-console: 0 */
const config = require('./babel.config');

// eslint-disable-next-line import/no-extraneous-dependencies
require('@babel/register')({
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  ...config,
});
global.PROD = false;

const search = require('./packages/server/Search').default;
const searchTerm = process.argv[2];

search(searchTerm)
  .then((stations) => {
    if (!stations.length) {
      console.error(`${searchTerm} is not a valid station`);
    } else {
      const first = stations[0];

      console.warn(first.title);
      console.log(first.id);
      process.exit(0);
    }
  })
  .catch((e) => {
    console.warn(e);
    process.exit(1);
  });
