const db = require('../models');
const Mul = db.multer;

module.exports = (function(){

    const M = {};

    M.Add = async (req,res) => {
        try {
            let img = '/img/' + req.files.img[0].filename;
            let img2 = '/img/' + req.files.img2[0].filename;

            const rows = await Mul.create({img : img, img2 : img2});
            if(!rows) throw res.send(`Query is something Wrong ...`);
            res.send(rows);
        } catch (error) {
            throw res.send(`May be.. is Error by DB\n
        Checking Error : ${error}`);
        }
    }

    M.List = async (req,res) => {
        try {
            const rows = await Mul.findAll({});
            if(!rows) throw res.send(`Query is something Wrong ...`);
            res.send(rows);
        } catch (error) {
            throw res.send(`May be.. is Error by DB\n
        Checking Error : ${error}`)
        }
    }

    return M;
})();