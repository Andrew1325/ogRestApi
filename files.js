module.exports = ({db, express, multer }) => {
  const routes = express.Router()

  const fileFilter = function(req, file, cb) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
      if (!allowedTypes.includes(file.mimetype)) {
          const error = new Error('Wrong file type')
          error.code = 'LIMIT_FILE_TYPES'
          return cb(error, false)
      }
      cb(null, true)
  }

  const MAX_SIZE = 250000

  var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, '../ogapp/static')
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname)
      }
    })

  const upload = multer ({
      storage: storage,
      fileFilter,
      limits: {
          fileSize: MAX_SIZE
      },

  })

  routes.post('/upload', upload.single('file'), (req, res) => {
    res.json({ file: req.file })
  })

  return routes
}