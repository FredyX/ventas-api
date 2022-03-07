const router = require('express').Router();
const { Profile_pictures } = require('../../config/db.config');

router.get('/:id', async (req, res) => {
    const profile_picture = await Profile_pictures.findOne({
        where: { id: req.params.id }
    });
    if (profile_picture){
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(profile_picture.pp_data, 'binary');
    }
    else{
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
    }
});

module.exports = router;