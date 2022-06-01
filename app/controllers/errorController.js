function _400(req, res) {
    res.status(400).json('BAD REQUEST');
};
function _401(req, res) {
    res.status(401).json('AUTHENTIFICATION ERROR');
};
function _403(req, res) {
    res.status(403).json('ACCESS DENIED');
};
function _404(req, res) {
    res.status(404).json({ "Error 404": 'Page Not Found'});
};
function _500(err, req, res) { res.status(500).json({"Server Error 500": err.message});
};

export { _400,_401, _403,_404,_500 };