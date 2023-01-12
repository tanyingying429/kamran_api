module.exports = ({ env }) => {
  return {
    settings: {
      parser: {
        enabled: true,
        multipart: true,
        formidable: {
          maxFileSize: 10737418240
        }
      }
    }
  }
}
