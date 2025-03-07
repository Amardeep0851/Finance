
import React, { useEffect } from 'react';
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name:z.string().min(1,{message:"Name is required."})
})

type formValues = z.input<typeof formSchema>

type CategoryFormProps = {
  onSubmit:(values:formValues) => void;
  defaultValues:formValues;
  disabled:boolean;
  id?:string;
  onDelete?:() => void
}

function CategoryForm({onSubmit, defaultValues, disabled, id, onDelete}:CategoryFormProps) {
  const form = useForm({
    resolver:zodResolver(formSchema),
    defaultValues      
  });

  useEffect(() => {
    form.reset(defaultValues)
  },[form, defaultValues]);

  const handleSubmit = (values:formValues) => {
    onSubmit(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <Input
                disabled={disabled}
                placeholder="e.g. Food, Travel, Groceries"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <Button type="submit" variant="blue" disabled={disabled}  className="w-full" >
            {disabled ? <Loader2 className="size-4 animate-spin" /> : (id? "Update Category" : "Create Category")}
          </Button>

          {id && (
            <Button type="button" variant="destructive" disabled={disabled} 
            onClick={onDelete}
            className="bg-red-800 hover:bg-red-900 w-full " >
            Delete Category
          </Button>
          )}
        </div>
      </form>
    </Form>
  );
}

export default CategoryForm