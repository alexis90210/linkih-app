const defaultStyle = {
    version: 8,
    name: 'Land',
    sources: {
      map: {
        type: 'raster',
        tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        minzoom: 1,
        maxzoom: 19,
      },
    },
    layers: [
      {
        id: 'background',
        type: 'background',
        paint: {
          'background-color': '#f2efea',
        },
      },
      {
        id: 'map',
        type: 'raster',
        source: 'map',
        paint: {
          'raster-fade-duration': 100,
        },
      },
    ],
  };


export default defaultStyle;