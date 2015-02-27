### Chart Experiments

Server-side d3 rendering to pngs without a headless browser?

#### Setup OSX
```sh
$ brew install imagemagick --with-librsvg
$ brew install graphicsmagic
$ npm install
```

#### Setup Ubuntu
```sh
$ ¯\_(ツ)_/¯
$ npm install
```

#### Test it
```sh
$ node index.js
```

### TODO
1. Wrap this in a web server
2. All routes become png/jpg/svg/html
3. Forward request object into chart constructor
