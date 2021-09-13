

async function login(req, res){
    res.send('login controller');
}
async function logoff(req, res){
    res.send('logoff');
}

module.exports = {login,logoff};