const router = require('express').Router();
const MemberController = require('../controllers/member')

router.get('/:organization/members', MemberController.getAll)

module.exports = router