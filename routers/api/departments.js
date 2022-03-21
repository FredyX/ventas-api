const {Router} = require('express');
const {getAllDepartments,getDepartmentsId} = require('../../controllers/departments');
const router = Router();

router.get('/', getAllDepartments);
router.get('/:id', getDepartmentsId);

module.exports = router;


