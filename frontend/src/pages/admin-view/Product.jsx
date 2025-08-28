import { Button } from '@/components/ui/button'
import React, { Fragment, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import CommonFrom from '../common/From'
import { addProductFormElements } from '@/config'

const initialFormData = {
  title: "",
  description: "",
  category: "",
  price: "",
  brand: "",
  salesPrice: "",
  totalStocks: "",
}

const AdminProduct = () => {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false)
  const [formData, setFormData] = useState(initialFormData)

  const onsubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setOpenCreateProductDialog(false)
  }

  return (
    <Fragment>
      <div className='mb-5 flex w-full justify-end'>
        <Button onClick={() => setOpenCreateProductDialog(true)}>Add Product</Button>
      </div>

      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'></div>

      <Sheet open={openCreateProductDialog} onOpenChange={setOpenCreateProductDialog}>
        <SheetContent side='right' className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle className='text-2xl font-bold'>Add New Product</SheetTitle>
            <SheetDescription>Add a new product to the catalog</SheetDescription>
          </SheetHeader>

          <div className='py-6'>
            <CommonFrom
            fromControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText="Add Product"
              onSubmit={onsubmit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default AdminProduct
