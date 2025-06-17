import { Label } from "@/components/ui/label";
import { TimePicker } from "antd";
import { Controller } from "react-hook-form";

type TTimePickerProps = {
  type?: string;
  name: string;
  label?: string;
};

const EBTimePicker = ({ name, label }: TTimePickerProps) => {
  const format = "hh:mm";

  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <div>
            <Label>{label}</Label>
            <TimePicker
              format={format}
              size="large"
              style={{ width: "100%" }}
              {...field}
              placeholder={`Enter your ${label ? label : null}`}
            />
            <small style={{ color: "red" }}>
              {error ? error.message : null}
            </small>
          </div>
        )}
      />
    </div>
  );
};

export default EBTimePicker;
