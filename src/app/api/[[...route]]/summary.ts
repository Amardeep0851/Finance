import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { differenceInDays, parse, subDays } from "date-fns";
import { zValidator } from "@hono/zod-validator";
import { boolean, z } from "zod";
import { db } from "@/config/db";
import { getAllDays, percentageChange } from "@/lib/utils";

const app = new Hono()
.get("/",
  clerkMiddleware(),
  zValidator("query", z.object({
    to:z.string().optional(),
    from:z.string().optional(),
    accountId:z.string().optional(),
  })),
  async (c) => {
    const auth = getAuth(c);
    if(!auth?.userId){
      return c.json({error:"Unauthorized access."}, 401)
    }

    const {from, to, accountId} = c.req.valid("query");
    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 30);

    const startDate = from ? parse(from, "yyyy-MM-dd", new Date()) : defaultFrom;
    const endDate = to? parse(to, "yyyy-MM-dd", new Date()) : defaultTo;

    const periodLength = differenceInDays(endDate, startDate);
    const lastPeriodStart = subDays(startDate, periodLength)
    const lastPeriodEnd = subDays(endDate, periodLength);

    // income, expenses, remaining and percentage
    const fetchFinancialData = async (startDate:Date, endDate:Date) => {
      const incomeAndExpenses = await db.transaction.findMany({
        where:{
          date:{
            gte:startDate,
            lte:endDate
          },
          account:{
          userId:auth.userId
          },
          accountId: accountId? accountId : undefined
        }
      });
      
      const {income, expenses} = incomeAndExpenses.reduce((acc, item) => {
        if(item.amount > 0){
          acc.income += item.amount
        } 
        else{
          acc.expenses += item.amount
        }
        return acc
      }, {income:0, expenses:0})

      const remaining = income+expenses; 

      return {expenses, income, remaining}
    }
     // end income, expenses, remaining and percentage

    // function to fetch financial data for a particular period

    const currentPeriod = await fetchFinancialData(startDate, endDate);
    const lastPeriod = await fetchFinancialData(lastPeriodStart, lastPeriodEnd);

    const incomePercentageChange = percentageChange(currentPeriod.income , lastPeriod.income);
    const expensesPercentageChange = percentageChange(currentPeriod.expenses, lastPeriod.expenses);
    const remainingPercentageChange = percentageChange(currentPeriod.remaining, lastPeriod.remaining);
    //  end function to fetch financial data for a particular period


    // fetching and adjusting for days
    const activeDaysIncome = await db.transaction.groupBy({
      by:["date"],
      _sum:{
        amount:true
      },
      where:{
        account:{
          userId:auth.userId
        },
        amount:{
          gt:0
        },
        date:{
          lte:endDate,
          gte:startDate
        },
        accountId: accountId? accountId : undefined
      },
      orderBy:{
        date:"asc"
      }
    });
    
    const activeDaysExpenses = await db.transaction.groupBy({
      by:["date"],
      _sum:{
        amount:true
      },
      where:{
        account:{
          userId:auth.userId
        },
        amount:{
          lte:0
        },
        date:{
          gte:startDate,
          lte:endDate
        },
        accountId: accountId? accountId : undefined
      },
      orderBy:{
        date:"asc"
      }
    });


    const transactionByDays = getAllDays(activeDaysIncome, activeDaysExpenses, startDate, endDate);
    // end fetching and adjusting for days

    // Fetching data by grouped categories
    const dataByCategories = await db.transaction.groupBy({
      by:["categoryId"],
      _sum:{
        amount:true
      },
      where:{
        account:{
          userId:auth.userId
        },
        date:{
          gte:startDate,
          lte:endDate
        },
        amount:{
          lte:0
        },
        accountId: accountId? accountId : undefined
      },
      orderBy:{
        _sum:{
          amount:"asc"
        }
      }
    });

    const categories = await db.category.findMany({
      where:{
        userId:auth?.userId
      }
    });
    
    let finalCategories:{value:number, label:string}[] =dataByCategories.map((item) => {
      const category = categories.find((cat) => cat.id === item.categoryId);

      if(category){
        return {
          label:category.name,
          value:Math.abs(item._sum.amount ?? 0)
        }
      }
      return null
    }).filter((item): item is { value: number; label: string } => item !== null)


    const topCategories = finalCategories.slice(0, 3);
    const otherCategories = finalCategories.slice(3);

    if(otherCategories.length >0 ){
      const otherCategoriesSum = otherCategories.reduce((sum, curr) => {
        return sum=sum+curr.value
      }, 0);

      topCategories.push({
        label:"other Categories",
        value:otherCategoriesSum
      })
    }
    // End fetching data by grouped categories

    return c.json({
      data:{
        income:currentPeriod.income,
        incomePercentageChange,  
        expenses:currentPeriod.expenses, 
        expensesPercentageChange, 
        remaining:currentPeriod.remaining, 
        remainingPercentageChange,
        transactionByDays,
        finalCategories:topCategories        
      }
    })
  }
)

export default app;