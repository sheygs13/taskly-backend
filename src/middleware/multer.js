const multer = require('multer');
/**
 * @param  {} fileSize
 */
module.exports = (fileSize) => {
        if (typeof fileSize !== 'string') {
                throw new Error('Input string required');
        }
        fileSize = parseInt(fileSize) * 1000000;
        const upload = multer({
                //dest: "images",
                limits: {
                        fileSize,
                },
                fileFilter: (req, file, cb) => {
                        if (!/\.(jpg|png|jpeg)$/.test(file.originalname)) {
                                cb(new Error('File type must have a jpg or png extension.'));
                                return;
                        }
                        req.file = file;
                        cb(null, true);
                },
        });

        return upload;
};
