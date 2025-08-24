"use client"
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Loader2, Trash } from "lucide-react";

import { Form,
  FormField,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage
 } from "@/components/ui/form";
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const formSchema = z.object({
  name:z.string().min(1,{message:"Name is required."})
})

type FormValues = z.input<typeof formSchema>


type props = {
  id?:string;
  onSubmit:(values:FormValues) => void;
  onDelete?:() => void;
  defaultValues?:FormValues;
  disabled?:boolean;
}

export default function AccountForm({id, onSubmit, disabled, onDelete, defaultValues}:props) {

  const form = useForm({
    resolver:zodResolver(formSchema),
    defaultValues:defaultValues
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const handleOnSubmit = async (values:FormValues) => {
    onSubmit(values)
  }

  return (
    <>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-3">
          <FormField 
          name="name"  
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input 
                disabled={disabled}
                placeholder="e.g. Cash, Bank, Credit Card"
                {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
          <div className=" w-full ">
            <Button type="submit" 
            disabled={disabled}
            className="w-full bg-blue-600  
            hover:bg-blue-700 ">
              {!!id ? "Update" : "Save"}
            </Button>
          </div>
          {
            !!id &&(
              <div className="w-full mx-auto text-center ">
            <Button 
            type="submit" 
            onClick={onDelete}
            disabled={disabled}
            className="w-full bg-blue-600 hover:bg-blue-700">
              Delete
            </Button>
          </div>
            )
          }
        </form>
      </Form>
    </>
  )
}