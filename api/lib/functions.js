const validationError=(next,validation)=>{
    next({
        message: "There was some data validation error.",
        status: 422,
        validation,
        })
    }
    const errorMsg=(next,error)=> {
        console.log(error)
        if ('errors' in error) {
            let validation = {}
            for (let k in error.errors) {
                validation = {
                    ...validation,
                    [k]: error.errors[k].message,
                }
            }

            //next({
            // message:"There was some data validation error.",
            // status:422,
            validationError(next, validation)
        } else if ('code' in error && error.code == 11000) {
            validationError(next, {
                email: 'the given email is taken',
            })
        }
           else {
            next({
                message:'problem while processing',
            })
        }
    }
    const env=key=>process.env[key]

    const notFoundError=(next,name)=>{
        next({
            message:`${name} not found`,
            status:404,
        })
    }

    module.exports= {validationError,errorMsg,env,notFoundError}