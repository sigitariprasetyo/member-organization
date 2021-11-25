const axios = require('axios')
const Member = require('../models/member')

class MemberController {
  static async getAll(req, res) {
    try {
      let { organization } = req.params
      let foundOrgs = await Member.findAll({ where: { orgs: organization }, order: [['followers', 'DESC']] })
      if (foundOrgs.length > 0) {
        res.status(200).json(foundOrgs)
      } else {
        let { data } = await axios.get(`https://api.github.com/orgs/${organization}/members`)
        let members = []
        if (!data.message == "Not Found") {
          await Promise.all(data.map(async (el) => {
            let following = await axios.get(`https://api.github.com/users/${el.login}/following`)
            let followers = await axios.get(el.followers_url)
            let member = {
              login: el.login,
              orgs: organization,
              avatar_url: el.avatar_url,
              followers: followers.data ? followers.data?.length : 0,
              following: following.data ? following.data?.length : 0
            }
            members.push(member)
          }));

          Member.bulkCreate(members)

          members.sort(function (a, b) { return b.followers - a.followers })
          res.status(200).json(members)
        } else {
          res.status(404).json({ msg: "Not Found" })
        }

      }
    } catch (error) {
      let status
      let message
      if (error.response) {
        status = error.response.status
        message = error.response.data.message
      } else {
        status = 500
        message = error.message
      }

      res.status(status).json({ message })
    }
  }
}

module.exports = MemberController