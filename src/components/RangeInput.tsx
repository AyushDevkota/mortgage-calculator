import { formatCurrency } from "../utils";

interface Props {
  name: string;
  value: number;
  label: string;
  max: number;
  type: "currency" | "time" | "rate";
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RangeInput = (props: Props) => {
  return (
    <>
      <label className="text-xs" htmlFor={props.name}>
        {props.label}:{" "}
        <span className="text-sm font-semibold">
          {props.type === "currency"
            ? formatCurrency(props.value)
            : props.type === "rate"
            ? `${props.value} %`
            : `${props.value} ${props.value <= 1 ? "year" : "years"}`}
        </span>
      </label>
      <input
        id={props.name}
        name={props.name}
        type="range"
        value={props.value}
        max={props.max}
        step={props.type === "currency" ? 10000 : 1}
        onChange={props.handleInputChange}
      />
    </>
  );
};

export default RangeInput;
