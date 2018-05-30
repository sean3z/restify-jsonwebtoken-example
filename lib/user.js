"use strict";

exports.authenticate = (username, password) => {
    return Promise.resolve({ uid: 1, name: 'Sean', admin: false });
};

/**
exports.authenticate = (username, password) => {  
  return new Promise((resolve, reject) => {
    db.findOne({username, password}, (err, data) => {
      if (err) return reject(err);
      resolve(data); // {uid: 1, name: Sean, admin: false}
    });
  });
};
**/