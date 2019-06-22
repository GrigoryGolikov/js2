const cart = require('./cart');
const fs = require('fs');
const moment = require('moment');

const actions = {
    add: cart.add,
    change: cart.change,
    del: cart.del

};


let handler = (req, res, action, file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
            let newCart = actions[action](JSON.parse(data), req);
            fs.writeFile(file, newCart, (err) => {
                if (err) {
                    res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
                } else {
                    res.send(JSON.stringify({ result: 1, text: 'SUCCESS!' }))
                    writeHistory(action, req, res);
                }
            })
        }
    })
};

let writeHistory = (action,req, res) => {

    const fileHistory = 'server/db/history.json';
    fs.readFile(fileHistory, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
            let newHistiry = [];
            if (data) {
                newHistiry = JSON.parse(data);
            }

            let id = 0;
            if (action = "add"){
                id= req.params.id;
            } else{
                id = req.body.id_product
            }
            newHistiry.push({
                moment: moment().format('MMMM Do YYYY, h:mm:ss a'),
                id: id,
                action: req.body.quantity
            });

            // Плохо пишет в одну строку без переноса
            fs.writeFile(fileHistory, JSON.stringify(newHistiry,null,""), (err) => {
                if (err) {
                    res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
                }
            })
        }
    })


 


    /*fs.writeFile(history.json, newCart, (err) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(JSON.stringify({result: 1, text: 'SUCCESS!'}))
            writeHistory();
        }
    })    */

}

module.exports = handler;