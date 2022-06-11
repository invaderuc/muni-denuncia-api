const mongoose = require("mongoose");

const denunciaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      text: true,
      required: "Nombre requerido",
    },
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
      type: String,
    },
    altitude: {
      type: Number,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    speed: {
      type: Number,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Denuncia", denunciaSchema);

