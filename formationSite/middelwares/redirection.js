
const express=require('express')

const redirectLogin=(req,res,next)=>
{
    if(!req.session._id)
    {
        res.redirect('/login')
    }
    else
    {
        next();
    }
}

