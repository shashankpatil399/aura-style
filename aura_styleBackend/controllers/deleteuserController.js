const deleteItem = async (req, res) => {
    delid = req.params.id
    const resdel = await User.findByIdAndDelete({ _id: delid })
    console.log(resdel)
    res.json({ status: 200, message: "User Deleted Successfully" })
  }
  module.exports = { deleteItem}