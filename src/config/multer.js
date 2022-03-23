const multer = require('multer')
const crypto = require('crypto')

module.exports = {
    dest: 'tmp/',
    storage: multer.diskStorage({
        destination: (req, res, cb) => {
            cb(null,'tmp/')
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) {
                    cb(err)
                } else {
                    const fileName = `${hash.toString('hex')}-${file.originalname}`

                    cb(null, fileName)
                }
            })
        },
    }),
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ]

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error("Invalid file type"))
        }
    }
}