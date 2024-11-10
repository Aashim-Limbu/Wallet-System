import {z} from "zod";
const loadWalletSchema = z.object({
    amount:z.number().gte(50,{message:"Amount must be greater than 50"}),
    
})
