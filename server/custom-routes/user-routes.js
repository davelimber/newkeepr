let Vaults = require('../models/vault')
let Keeps = require('../models/keep')
let Users = require('../models/user')

export default {
  userVaults: {
    path: '/uservaults',
    reqType: 'get',
    method(req, res, next){
      let action = 'Find User Vaults'
      Vaults.find({userId: req.session.uid})
        .then(vaults => {
          res.send(handleResponse(action, vaults))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  // sharedBoards: {
  //   path: '/sharedboards',
  //   reqType: 'get',
  //   method(req, res, next){
  //     let action = 'Find Shared Boards'
  //     Boards.find({collaborators: { $in: [req.session.uid]}})
  //       .then(boards => {
  //         res.send(handleResponse(action, boards))
  //       }).catch(error => {
  //         return next(handleResponse(action, null, error))
  //       })
  //   }
  // }
}

function handleResponse(action, data, error) {
    var response = {
      action: action,
      data: data
    }
    if (error) {
      response.error = error
    }
    return response
  }