let add = (cart, req) => {
    cart.contents.push(req.body);
    return JSON.stringify(cart, null, 4);
};
let change = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    return JSON.stringify(cart, null, 4);
};

let del = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    let index = cart.contents.indexOf(find);
    if (index>=0) {
        cart.contents.splice(index, 1);
    }
    return JSON.stringify(cart, null, 4);
};



module.exports = {
    add,
    change,
    del
}