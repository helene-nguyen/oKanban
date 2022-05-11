function _400(req, res) {
    res.status(400).send('BAD REQUEST')
};
function _401(req, res) { res.status(401).send('AUTHENTIFICATION ERROR')
};
function _403(req, res) { res.status(403).send('ACCESS DENIED')
};
function _404(req, res) { res.status(404).send('PAGE 404 NOT FOUND')
};
function _500(err, req, res) { res.status(500).send(err.message);
};

export { _400,_401, _403,_404,_500 };