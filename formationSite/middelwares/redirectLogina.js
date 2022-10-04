
const express=require('express')

const redirectLogina=(req,res,next)=>
{
    if(!req.session.isAuthenticated)
    {
        res.redirect('/loginAdmin')
    }
    else
    {
        next();
    }
}

module.exports={
    redirectLogina
}