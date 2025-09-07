const Configuration = require("../models/Configuration");

// GET
exports.getConfiguration = async (req, res) => {
  try {
    const {id} = req.params;

    const config = await Configuration.findOne({configurationId: id});

    if (!config) {
      return res
        .status(404)
        .json({message: `Configuration with id "${id}" not found`});
    }

    return res.json(config.grid);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve configuration",
      error: error.message
    });
  }
};

//PUT
exports.updateRemark = async (req, res) => {
  try {
    const {id} = req.params;
    const {remark} = req.body;

    const config = await Configuration.findOne({configurationId: id});

    if (!config) {
      return res
        .status(404)
        .json({message: `Configuration with id "${id}" not found`});
    }

    config.remark = remark;
    await config.save();
    return res.json({message: "Remark updated successfully"});
  } catch (error) {
    return res
      .status(500)
      .json({message: "Failed to update remark", error: error.message});
  }
};
