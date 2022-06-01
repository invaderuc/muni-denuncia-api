const Denuncia = require("../models/denuncia");
const slugify = require("slugify");
const Phone = require("../models/phone");

exports.create = async (req, res) => {
  try {

    req.body.slug = slugify(req.body.name);

    const newDenuncia = await new Denuncia(req.body).save();
    res.json(newDenuncia);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};

exports.listAll = async (req, res) => {
  let Denuncias = await Denuncia.find({ status: "Active" })
    .limit(parseInt(req.params.count))
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(Denuncias);
};

exports.DenunciasCount = async (req, res) => {
  let total = await Denuncia.find({ status: "Active" }).estimatedDocumentCount().exec();
  res.json(total);
};

exports.removeSoft = async (req, res) => {
  try {
    const deleted = await Denuncia.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      { status: "Inactive" },
      { new: true }
    ).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Denuncia no pudo ser eliminado");
  }
};

exports.remove = async (req, res) => {
  try{
    const deleted = await Denuncia.findOneAndDelete({slug:req.params.slug});
    res.json(deleted);
  }catch(err){
    res.status(400).send("El denuncia no pudo ser eliminado");
  }
};

exports.removeSoft = async (req, res) => {
  try {
    const deleted = await Denuncia.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      { status: "Inactive" },
      { new: true }
    ).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Denuncia no pudo ser eliminado");
  }
};

exports.read = async (req, res) => {
  let denuncia = await Denuncia.findOne({
    slug: req.params.slug,
    status: "Active",
  }).exec();
  
  const phones = await Phone.find({ denuncia, status: "Active" })
    .populate("denuncia")
    .exec();

  res.json({
    denuncia,
    phones,
  });
};

exports.update = async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const updated = await Denuncia.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();

    if(updated){
      res.json(updated);
    }else{
      return res.status(406).send("Denuncia que intenta editar no existe.");
    }
  } catch (err) {
    console.log("Denuncia error al actualizar: ", err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.list = async (req, res) => {
  console.table(req.body);
  try {
    // createdAt/updatedAt, desc/asc, 3
    const { sort, order, page } = req.body;

    const perPage = 2;
    let currentPage = page >= 1 ? page : 1;

    const Denuncias = await Denuncia.find({ status: "Active" })
      .skip((currentPage - 1) * perPage)
      .sort([[sort, order]])
      .limit(perPage)
      .exec();
    res.json(Denuncias);
  } catch (err) {
    console.log(err);
  }
};