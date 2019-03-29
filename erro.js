//tratamento de erro para as funções
const exec = fn =>{
    (req, res,next) =>{
        promise.resolve(fn(req,res,next))
        .catch(function (error) {
            next(error);
        })
    }
}

module.exports = exec;