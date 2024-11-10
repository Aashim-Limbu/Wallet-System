import {z}from "zod"
import { prisma } from "./prisma";
import { Balance } from "@prisma/client";

async function addBank({name,redirectUrl}:{name:string,redirectUrl:string}){
const bank  = await prisma.bank.create({
    data:{
        name,
        redirectUrl
    }
})
}
async function addBalanceToUser({amount,userId,bankId}:{amount:number,userId:string,bankId:number}){
    const userBalance = await prisma.balance.create({
        data:{
            amount,
            userId,
            bankId,
        }
    })
}
