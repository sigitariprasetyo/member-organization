const Comment = require('../models/comment')

class CommentController {
  static async getAll(req, res) {
    try {
      let { organization } = req.params
      let comments = await Comment.findAll({ where: { deleted: false, orgs: organization } })

      res.status(200).json(comments)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async create(req, res) {
    try {
      let { comment } = req.body

      if (comment === null || comment === "" || comment === undefined) {
        res.status(400).json({ msg: "Comment can't null or empty string!" })
      } else {
        let orgs = req.params.organization
        await Comment.create({ comment, orgs })

        res.status(201).json({ msg: 'Comment has been created!' })
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async delete(req, res) {
    try {
      let { organization } = req.params
      let foundOrgs = await Comment.findOne({ where: { orgs: organization } })

      if (!foundOrgs) {
        res.status(404).json({ msg: "Comment for this organization not found!" })
      } else {
        await Comment.update({ deleted: true }, { where: { orgs: organization } })

        res.status(200).json({ msg: 'Comment has been deleted!' })
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = CommentController