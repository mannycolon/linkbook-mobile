import path from 'react-native-path';

/**
 * Determines if the file path is a valid image type.
 * @param {String} filePath
 * @returns {Boolean} true | false
 */
export const isPathAImageExtension = (filePath) => {
  const imageTypes = ['.tiff', '.jpeg', '.gif', '.png', '.jpg'];

  if (imageTypes.includes(path.extname(filePath).toLowerCase()) && filePath.includes('/')) {
    return imageTypes.includes(path.extname(filePath));
  }
  let result;

  imageTypes.forEach((imageType) => {
    result = path.extname(filePath).includes(imageType);
  });

  if (!filePath.includes('/')) {
    result = false;
  }

  return result;
};
