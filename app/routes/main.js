//~import modules
import { Router } from "express";
const router = Router();
import formidable from "formidable";

//~routers
router.post("/", (req, res, next) => {
  console.log("body:", req.body);

  const options = {
    multiples: true
  };
  const form = formidable(options);

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err);
    }

    console.log(fields);

    res.send(true);
  });
});

export { router };
