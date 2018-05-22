module.exports = {
  use: [
    ['@neutrinojs/react',
      {
        host: 'edelbucks.biz',
        html: {
          baseHref: '/',
          headHtmlSnippet: `<style type="text/css">body, html, #root {margin: 0; padding: 0; height: 100%; overflow-x: hidden; overflow-y: auto;}</style>`,
          title: 'EdelBucks',
          links: [
            'https://fonts.googleapis.com/icon?family=Material+Icons'
            , "https://fonts.googleapis.com/css?family=Roboto",
            , '/static/webfonts/AvenirNext/AvenirNext.css'
       //     , '/static/css/react-md.teal-amber.min.css'
          ]
        },
        devServer: {
          disableHostCheck: true
        }
      }
    ],
    ['@neutrinojs/jest', {verbose: false}]
  ]
};
