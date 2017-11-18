
// import request from 'request';
// import cheerio from 'cheerio';

// /**
//  * @param {String} url - article / website url to be used to
//  * get title, description and image src url
//  */
// export default function fetchURLMetadata(url) {
//   request({
//     uri: url,
//   }, (error, response, body) => {
//     const $ = cheerio.load(body);
//     const metadata = {};

//     $('meta').each(function () {
//       const data = $(this);
//       const property = data.attr('property');
//       const content = data.attr('content');

//       switch (property) {
//         case 'og:title':
//           metadata.title = content;
//           break;
//         case 'og:description':
//           metadata.description = content;
//           break;
//         case 'og:image':
//           metadata.image = content;
//           break;
//         default:
//           break;
//       }
//     });
//     return metadata;
//   });
// }
