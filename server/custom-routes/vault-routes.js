let Vaults = require('../models/vault')
let Keeps = require('../models/keep')
let Users = require('../models/user')

export default {
  keepsForVault: {
    path: '/vaults/:id/keeps',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find Keeps by Vault'
      Lists.find({ vaultId: req.params.id })
        .then(keeps => {
          res.send(handleResponse(action, keeps))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
//   keeps: {
//     path: '/keeps/:id/data',
//     reqType: 'get',
//     method(req, res, next) {
//       let action = 'Find  Board'
//       let data = {}
//       Tasks.find({ boardId: req.params.id })
//         .then(tasks => {
//           data.tasks = tasks
//           Lists.find({ boardId: req.params.id })
//             .then(lists => {
//               data.lists = lists
//               res.send(handleResponse(action, data))
//             }).catch(error => {
//               return next(handleResponse(action, null, error))
//             })
//         })
//     }
//   },
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