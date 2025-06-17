"use client";
import React from "react";
import EBForm from "@/shared/form/EBForm";
import EBInput from "@/shared/form/EBInput";
import { FieldValues } from "react-hook-form";
import { days } from "@/types/global.type";
import EBSelectMultiple from "@/shared/form/EBSelectMultiple";
import { Button } from "../ui/button";
import EBTimePicker from "@/shared/form/EBTimePicker";

const daysOptions = days.map((day) => ({
  label: day,
  value: day,
}));

const CreateBranch = () => {
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div>
      <EBForm onSubmit={onSubmit}>
        <EBInput label="Branch Name" name="name" type="text" />
        <EBInput label="Branch Code" name="code" type="text" />
        <EBInput label="Address" name="address" type="text" />
        <EBInput label="City" name="city" type="text" />
        <EBInput label="State" name="state" type="text" />
        <EBInput label="Country" name="country" type="text" />
        <EBInput label="Zip Code" name="zipCode" type="text" />
        <EBInput label="Contact Number" name="contactNumber[0]" type="text" />
        <EBInput label="Email" name="email" type="email" />
        <EBSelectMultiple
          mode="multiple"
          options={daysOptions}
          label="Managers"
          name="managers"
        />
        <EBTimePicker label="Open Time" name="openingSchedule.openTime" />
        <EBTimePicker label="Close Time" name="openingSchedule.closeTime" />
        <EBInput label="Status" name="openingSchedule.status" type="text" />
        <EBSelectMultiple
          mode="multiple"
          options={daysOptions}
          label="Opening Days"
          name="openingSchedule.days"
        />
        <Button type="submit">Submit</Button>
      </EBForm>
    </div>
  );
};

export default CreateBranch;
