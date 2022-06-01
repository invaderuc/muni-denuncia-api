const mongoose = require("mongoose");

const denunciaSchema = new mongoose.Schema(
  {
    description: {
        type: String,
        text: true,
        required: "Nombre requerido",
      },
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Inactive"],
    },
    images: {
      type: Array,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Denuncia", denunciaSchema);
