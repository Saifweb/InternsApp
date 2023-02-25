const path = require("path")
const multer = require("multer")

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        console.log(ext)
        console.log(Date.now())
        cb(null, Date.now() + ext)
    }
})

var upload = multer({
    storage: storage,
}
)

module.exports = { upload }