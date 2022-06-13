const isImage = (file: File) => {
  return file && file['type'].split('/')[0] === 'image'
}

export default isImage
