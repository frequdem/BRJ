var checkSession = function(req) {
	if (req.session.userId) {
		return true;
	}else{
		return false;
	}
}
module.exports = checkSession;