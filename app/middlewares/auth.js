//~import modules
import errorAPI from '../controllers/errorController.js';

//~authentification
async function auth(req, res, next) {
  try {
    // console.log('HERE USER AUTH', req.session.user);
    if (!req.session.token) return errorAPI({ message: 'You need to be connected to create a super Kanban !' }, req, res, 401);

    next();
  } catch (err) {
    errorAPI(err, req, res, 500);
  }
}

async function admin(req, res, next) {
  try {
    if (req.session.user.email === 'admin@admin.com') return res.status(200).json('Welcome home Super Admin !');

    if (req.session.user.email !== 'admin@admin.com')
      return errorAPI({ message: `You're not super admin, sorry you cannot access the super Kanban yet!` }, req, res, 403);

    next();
  } catch (err) {
    errorAPI(err, req, res, 500);
  }
}

//~KEEP USER CONNECTED (add it in entrypoint of the app)
async function userMiddleware(req, res, next) {
  try {
    req.session.user ? (res.locals.user = req.session.user) : (res.locals.user = false);
    next();
  } catch (err) {
    errorAPI(err, req, res, 500);
  }
}

export { auth, admin, userMiddleware };
