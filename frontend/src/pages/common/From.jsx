import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { registerFormControls  } from "@/config";
import React from "react";


const CommonFrom = ({
  fromControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) => {
  function renderInputsByComponentType(getControlItem) {
    let element = null;

    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );
        break;
      case "select":
        <Select onValueChange={(value)=>{setFormData({
            ...formData,
            [getControlItem.name]: value,
        })}} value={value}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={getControlItem.placeholder} />
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((option) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </SelectTrigger>
        </Select>;
        break;
      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            // type={getControlItem.type}
             onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );
        break;
      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        {fromControls.map((controlItem) => {
          return (
            <div className="grid w-full gap-1.5" key={controlItem.name}>
              <label className="text-sm mb-1 font-semibold">
                {controlItem.label}
              </label>
              {renderInputsByComponentType(controlItem)}
            </div>
          );
        })}
      </div>
      <Button type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonFrom;
