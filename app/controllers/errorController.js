export default function errorAPI(err, req, res, code) {
    //here error handler
    return res.status(code).json(err.message);
}

// function _400(err, req, res) {
//   res.status(400).json(err.message); // BAD REQUEST
// }
// function _401(err, req, res) {
//   res.status(401).json(err.message); // AUTHENTIFICATION ERROR
// }
// function _403(err, req, res) {
//   res.status(403).json(err.message); // FORBIDDEN
// }
// function _404(err, req, res) {
//   res.status(404).json(err.message); // PAGE NOT FOUND
// }
// function _500(err, req, res) {
//   res.status(500).json(err.message); // SERVER ERROR
// }

// export { _500, _401, _403, _404};
