import React, { useEffect } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form"
import DatePicker from "@/components/date-picker"
import { Input } from "@/components/ui/input"
import Select from "@/components/select";
import AmountInput from "@/components/amount-input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  date:z.coerce.date(),
  amount:z.string(),
  payee:z.string(),
  notes:z.string().nullable().optional(),
  accountId:z.string(),
  categoryId:z.string().nullable().optional(),
  
});
type formValues = z.input<typeof formSchema>

type AccountFormProps = {
  defaultValues?:formValues;
  onSubmit:(result:formValues) => void;
  disabled:boolean;
  accountOptions:{label:string, value:string}[];
  categoryOptions:{label:string, value:string}[];
  onCreateAccount:(name:string) => void
  onCreateCategory:(name:string) => void
  id?:string
}


function TransactionForm({defaultValues, onSubmit, disabled, accountOptions, categoryOptions, onCreateCategory, onCreateAccount, id}:AccountFormProps) {

  const form = useForm({
    resolver:zodResolver(formSchema),
    defaultValues
  });

   useEffect(() => {
      form.reset(defaultValues)
    },[form, defaultValues]);
    
  const handleOnSubmit = (values:formValues) => {
    onSubmit(values)
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-3">
          <FormField 
          name="date"
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormControl>
                <DatePicker 
                value={field.value}
                onChange={(date) => field.onChange(date)}
                disabled={disabled}
                />
              </FormControl>
            </FormItem>
          )}
          />
          <FormField 
          name="payee"
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>
                Payee
              </FormLabel>
              <FormControl>
                <Input 
                  type="text"
                  placeholder="Add a payee"
                  disabled={disabled}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
          <FormField 
            name="accountId"
            control={form.control}
            render={({field}) => {
              return (
                <FormItem>
                  <FormLabel>
                    Select Account
                  </FormLabel>
                  <FormControl>
                    <Select 
                    placeHolder="Select account or create new"
                    options={accountOptions}
                    onCreate={onCreateAccount}
                    onChangeValue={field.onChange}
                    value={field.value}
                    disabled={disabled}

                    />
                  </FormControl>
                </FormItem>
              )
            }}
          />
          
          <FormField 
            name="categoryId"
            control={form.control}
            render={({field}) => (
              <FormItem>
                <FormLabel>
                  Select Category
                </FormLabel>
                <FormControl>
                  <Select 
                  placeHolder="Select category or create new"
                  options={categoryOptions}
                  onCreate={onCreateCategory}
                  onChangeValue={field.onChange}
                  value={field.value}
                   disabled={disabled}

                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField 
          name="amount"
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <AmountInput 
                placeHolder="Enter amount"
                onChange={field.onChange}
                value={field.value}
                disabled={disabled}
                />

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
          <FormField 
          name="notes"
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea 
                placeholder="Optional notes"
                {...field}
                value={field.value ?? ''}
                disabled={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
          <div>
            {id 
            ? 
            (<Button type="submit" className="w-full " > {disabled ? <Loader2 className="size-4 animate-spin" /> : "Update"} </Button>) 
            : 
            (<Button type="submit" className="w-full " > {disabled ? <Loader2 className="size-4 animate-spin" /> : "Create"} </Button>)}
          </div>
        </form>
      </Form>
    </div>
  )
}

export default TransactionForm